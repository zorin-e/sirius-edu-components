<template>
  <div
    ref="root"
    :class="[
      !pageMode && $style.rootScrollable,
      !pageMode && $style['rootScrollable_' + direction],
      $style.root,
      $style['root_' + direction],
    ]"
    @scroll="!pageMode && onScroll($event)"
  >
    <item @item-resize="onSlotResized('slotHeaderSize', $event)">
      <slot name="before" />
    </item>

    <div
      role="group"
      :class="[$style.group, $style['group_' + direction]]"
      :style="groupStyle"
    >
      <item
        v-for="element in computedItems"
        :key="element[dataKey]"
        @item-resize="onItemResized(element.id, $event)"
      >
        <slot :item="element" />
      </item>
    </div>

    <item @item-resize="onSlotResized('slotFooterSize', $event)">
      <slot name="after" />
    </item>

    <div
      ref="shepherd"
      :style="{
        width: isHorizontal ? '0px' : '100%',
        height: isHorizontal ? '100%' : '0px',
      }"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";
import { Virtual, Range, Id } from "./AbstractVirtual";
import Item from "./Item.vue";

enum Direction {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export default defineComponent({
  components: {
    Item,
  },
  name: "VirtualList",
  props: {
    items: {
      type: Array as PropType<ReadonlyArray<any>>,
      required: true,
    },

    dataKey: {
      type: String as PropType<string>,
      required: true,
      default: "id",
    },

    keeps: {
      type: Number,
      default: 50,
    },
    estimateSize: {
      type: Number,
      default: 50,
    },

    pageMode: {
      type: Boolean,
    },
    direction: {
      type: String as PropType<Direction>,
      validator: (value: Direction) => Object.values(Direction).includes(value),
      default: Direction.VERTICAL,
    },
    start: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
    },
    topThreshold: {
      type: Number,
      default: 0,
    },
    bottomThreshold: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const {
      dataKey,
      items,
      direction,
      start,
      offset,
      topThreshold,
      bottomThreshold,
      keeps,
      pageMode,
    } = toRefs(props);
    const range = ref<Range>({});
    const root = ref<HTMLElement | null>(null);
    const shepherd = ref<HTMLElement | null>(null);

    const onRangeChanged = (value: Range) => {
      range.value = value;
    };

    const getUniqueIdFromItems = computed(() => {
      return items.value.map((item) => item[dataKey.value]);
    });

    const isHorizontal = computed(
      () => direction.value === Direction.HORIZONTAL
    );

    const directionKey = computed(() =>
      isHorizontal.value ? "scrollLeft" : "scrollTop"
    );

    const virtual = Virtual(
      {
        slotHeaderSize: 0,
        slotFooterSize: 0,
        keeps: props.keeps,
        estimateSize: props.estimateSize,
        buffer: Math.round(props.keeps / 3), // recommend for a third of keeps
        uniqueIds: getUniqueIdFromItems.value,
      },
      onRangeChanged
    );

    onBeforeMount(() => {
      // set back offset when awake from keep-alive
      scrollToOffset(virtual.offset);
    });

    onMounted(() => {
      // set position
      if (start.value) {
        scrollToIndex(start.value);
      } else if (offset.value) {
        scrollToOffset(offset.value);
      }

      if (pageMode.value) {
        updatePageModeFront();

        document.addEventListener("scroll", onScroll, {
          passive: false,
        });
      }
    });

    const scrollToIndex = (index: number) => {
      // scroll to bottom
      if (index >= items.value.length - 1) {
        scrollToBottom();
      } else {
        const offset = virtual.getOffset(index);

        scrollToOffset(offset);
      }
    };

    const scrollToBottom = () => {
      if (shepherd.value) {
        const offset =
          shepherd.value[isHorizontal.value ? "offsetLeft" : "offsetTop"];
        scrollToOffset(offset);

        // check if it's really scrolled to the bottom
        // maybe list doesn't render and calculate to last range
        // so we need retry in next event loop until it really at bottom
        setTimeout(() => {
          if (getOffset() + getClientSize() < getScrollSize()) {
            scrollToBottom();
          }
        });
      }
    };

    const getOffset = () => {
      if (pageMode.value) {
        return (
          document.documentElement[directionKey.value] ||
          document.body[directionKey.value]
        );
      }

      return root.value ? Math.ceil(root.value[directionKey.value]) : 0;
    };

    const getClientSize = () => {
      const key = isHorizontal.value ? "clientWidth" : "clientHeight";

      if (pageMode.value) {
        return document.documentElement[key] || document.body[key];
      }

      return root.value ? Math.ceil(root.value[key]) : 0;
    };

    const getScrollSize = () => {
      const key = isHorizontal.value ? "scrollWidth" : "scrollHeight";

      if (pageMode.value) {
        return document.documentElement[key] || document.body[key];
      }

      return root.value ? Math.ceil(root.value[key]) : 0;
    };

    const scrollToOffset = (offset: number) => {
      if (pageMode.value) {
        document.body[directionKey.value] = offset;
        document.documentElement[directionKey.value] = offset;

        return;
      }

      if (root.value) {
        root.value[directionKey.value] = offset;
      }
    };

    const updatePageModeFront = () => {
      if (!root.value) {
        return;
      }

      const rect = root.value.getBoundingClientRect();
      const { defaultView } = root.value.ownerDocument;

      if (defaultView) {
        const offsetFront = isHorizontal.value
          ? rect.left + defaultView.pageXOffset
          : rect.top + defaultView.pageYOffset;

        virtual.updateParam("slotHeaderSize", offsetFront);
      }
    };

    const emitEvent = (
      offset: number,
      clientSize: number,
      scrollSize: number
    ) => {
      if (
        virtual.isFront() &&
        !!items.value.length &&
        offset - topThreshold.value <= 0
      ) {
        ctx.emit("totop");
      } else if (
        virtual.isBehind() &&
        offset + clientSize + bottomThreshold.value >= scrollSize
      ) {
        ctx.emit("tobottom");
      }
    };

    const onScroll = () => {
      const offset = getOffset();
      const clientSize = getClientSize();
      const scrollSize = getScrollSize();

      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      virtual.handleScroll(offset);

      emitEvent(offset, clientSize, scrollSize);
    };

    onBeforeUnmount(() => {
      virtual.destroy();

      if (pageMode.value) {
        document.removeEventListener("scroll", onScroll);
      }
    });

    const groupStyle = computed(() => {
      const { padBehind, padFront } = range.value;
      const padding = isHorizontal.value
        ? `0px ${padBehind}px 0px ${padFront}px`
        : `${padFront}px 0px ${padBehind}px`;

      return {
        padding,
      };
    });

    const computedItems = computed(() => {
      const { start, end } = range.value;

      if (start === undefined || end === undefined) {
        return items.value;
      }

      return items.value.slice(start, end + 1);
    });

    const onItemResized = (id: Id, size: number) => {
      virtual.saveSize(id, size);
    };

    const onSlotResized = (
      key: "slotFooterSize" | "slotHeaderSize",
      size: number
    ) => {
      virtual.updateParam(key, size);
    };

    watch(keeps, (value) => {
      virtual.updateParam("keeps", value);
      virtual.handleSlotSizeChange();
    });

    watch(start, (value) => {
      scrollToIndex(value);
    });

    watch(offset, (value) => {
      scrollToOffset(value);
    });

    watch(items, () => {
      virtual.updateParam("uniqueIds", getUniqueIdFromItems.value);
      virtual.handleItemsChange();
    });

    return {
      root,
      shepherd,
      onScroll,
      groupStyle,
      isHorizontal,
      range,
      computedItems,
      onItemResized,
      onSlotResized,
      scrollToBottom,
    };
  },
});
</script>

<style lang="scss" module>
.rootScrollable {
  &_horizontal {
    overflow-x: auto;
  }

  &_vertical {
    overflow-y: auto;
  }
}

.root,
.group {
  display: flex;

  &_horizontal {
    flex-direction: row;
  }

  &_vertical {
    flex-direction: column;
  }
}
</style>
