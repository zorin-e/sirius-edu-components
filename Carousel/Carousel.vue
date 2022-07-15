<template>
  <div
    ref="host"
    ondragstart="return false;"
    :class="[$style.container, draggable && $style.container_draggable]"
  >
    <div v-carousel-scroll="{ onEvent: onScroll }" :class="$style.scroller">
      <div :class="$style.wrapper">
        <div
          v-drag-drop="{ onEvent: onDragDrop }"
          :class="[$style.items, transitioned && $style.items_transitioned]"
          :style="transform"
        >
          <div
            v-for="(item, index) in items"
            :key="item"
            :style="computedStyle"
            :class="$style.item"
            v-intersection="{
              options: {
                threshold: [0.01, 0.01],
                rootMargin: '100px 100000px 100px -51%',
                root: () => $refs.host,
              },
              disconnectAfterIntersect: false,
              isObserve: true,
              onIntersect: onIntersect.bind(null, index),
            }"
          >
            <slot :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import { clamp, isMobile } from "@smartmed/webpatient-vue-components/domain";
import {
  DragDropDirective,
  IntersectionDirective,
} from "@smartmed/webpatient-vue-components/directives";
import { EVENT_TUNNEL_TOKEN } from "@smartmed/webpatient-vue-components/tokens";
import { CarouselScrollDirective } from "./carousel-scroll.directive";

export default defineComponent({
  name: "Carousel",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    itemsCount: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    draggable: {
      type: Boolean,
    },
    autoScrollLooping: {
      type: Boolean,
    },
  },
  directives: {
    "drag-drop": DragDropDirective,
    intersection: IntersectionDirective,
    "carousel-scroll": CarouselScrollDirective,
  },
  setup(props, { emit }) {
    const autoScrollEvents = inject<Ref<number> | null>(
      EVENT_TUNNEL_TOKEN,
      null
    );

    const { itemsCount, modelValue, items, draggable, autoScrollLooping } =
      toRefs(props);
    const transitioned = ref(true);
    const translate = ref(0);
    const host = ref<HTMLElement | null>(null);
    const intersectionRoot = ref<HTMLElement | null>(null);

    const computedStyle = computed(() => {
      const percent = `${100 / itemsCount.value}%`;

      return {
        minWidth: percent,
        maxWidth: percent,
        flexBasis: percent,
      };
    });

    const computedTranslate = computed(
      () => -modelValue.value / itemsCount.value
    );

    const transform = computed(() => {
      const x = transitioned.value ? computedTranslate.value : translate.value;

      return {
        transform: `translateX(${100 * x}%)`,
      };
    });

    const computedDraggable = computed(() => isMobile() || draggable.value);

    onMounted(() => {
      const element = host.value;

      if (element) {
        element.addEventListener("touchstart", startTouch);
        element.addEventListener("touchend", endTouch);

        element.addEventListener("mousedown", startTouch);
        document.addEventListener("mouseup", endTouch);
      }
    });

    onUnmounted(() => {
      const element = host.value;

      if (element) {
        element.removeEventListener("touchstart", startTouch);
        element.removeEventListener("touchend", endTouch);

        element.removeEventListener("mousedown", startTouch);
        document.removeEventListener("mouseup", endTouch);
      }
    });

    if (autoScrollEvents) {
      watch(autoScrollEvents, () => {
        onAutoScroll();
      });
    }

    const updateIndex = (index: number) => {
      const offsetCount =
        items.value.length >= itemsCount.value
          ? itemsCount.value
          : items.value.length;
      emit(
        "update:modelValue",
        clamp(index, 0, items.value.length - offsetCount)
      );
    };

    watch(itemsCount, () => {
      updateIndex(0);
    });

    const next = () => {
      updateIndex(modelValue.value + 1);
    };

    const prev = () => {
      updateIndex(modelValue.value - 1);
    };

    const onDragDrop = (element: HTMLElement, [offsetX]: [number]) => {
      if (!computedDraggable.value) {
        return;
      }

      const { clientWidth } = element;
      const min = 1 - items.value.length / itemsCount.value;

      translate.value = clamp(offsetX / clientWidth + translate.value, min, 0);
    };

    const onAutoScroll = () => {
      const loopingIndex =
        modelValue.value === items.value.length - 1 ? 0 : modelValue.value + 1;
      const index = autoScrollLooping.value
        ? loopingIndex
        : clamp(modelValue.value + 1, 0, items.value.length - 1);

      updateIndex(index);

      if (!autoScrollLooping.value && index === items.value.length - 1) {
        emit("autoscroll-end");
      }
    };

    const startTouch = () => {
      transitioned.value = false;

      translate.value = computedTranslate.value;
    };

    const endTouch = () => {
      transitioned.value = true;
    };

    const onIntersect = (
      index: number,
      { intersectionRatio }: IntersectionObserverEntry
    ) => {
      if (intersectionRatio && intersectionRatio !== 1 && !transitioned.value) {
        updateIndex(index - Math.floor(itemsCount.value / 2));
      }
    };

    const onScroll = (delta: 1 | -1) => {
      updateIndex(modelValue.value + delta);
    };

    return {
      computedStyle,
      transform,
      transitioned,
      onDragDrop,
      host,
      onIntersect,
      intersectionRoot,
      onScroll,
      next,
      prev,
    };
  },
});
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: block;
  overflow: hidden;

  &_draggable {
    user-select: none;

    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }
  }
}

.scroller {
  display: flex;
  overflow: auto;
  overscroll-behavior-x: none;
  padding-bottom: 2rem;
  margin-bottom: -2rem;

  &:before,
  &:after {
    content: "";
    display: block;
    min-width: 1rem;
  }
}

.items {
  display: flex;
  align-items: center;

  &_transitioned {
    transition: transform 0.4s ease;
  }
}

.wrapper {
  position: sticky;
  left: 0;
  right: 0;
  min-width: 100%;
  overflow: hidden;
}

.item {
  padding: 0 8px;
}
</style>
