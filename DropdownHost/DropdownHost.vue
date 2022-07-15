<template>
  <active-zone
    ref="host"
    :class="$style.container"
    @keyup.esc.stop="hide"
    @active-zone-changed="activeZoneChanged"
  >
    <div :class="$style.content" @click.stop.prevent="toggleOpen">
      <slot />
    </div>

    <transition v-if="canOpen" name="fade">
      <div
        v-if="modelValue"
        :class="[$style.dropdown, $style['dropdown_' + align]]"
        :style="dropdownStyle"
        ref="dropdown"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </active-zone>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  toRefs,
  watch,
} from "vue";
import ActiveZone from "@smartmed/webpatient-vue-components/ActiveZone";

const DEFAULT_MARGIN = 8;
const DEFAULT_MAX_HEIGHT = 400;
const DEFAULT_MIN_HEIGHT = 80;

export default defineComponent({
  components: {
    ActiveZone,
  },
  name: "DropdownHost",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    canOpen: {
      type: Boolean,
      default: true,
    },
    minHeight: {
      type: Number,
    },
    maxHeight: {
      type: Number,
      default: DEFAULT_MAX_HEIGHT,
    },
    maxWidth: {
      type: Number,
    },
    minWidth: {
      type: Number,
    },
    align: {
      type: String,
      default: "right",
      validatior: (value: string) => ["left", "right"].includes(value),
    },
    direction: {
      type: String,
      default: "bottom",
      validator: (value: string) => ["top", "bottom"].includes(value),
    },
  },
  setup(props, { emit }) {
    const {
      modelValue,
      canOpen,
      maxHeight,
      maxWidth,
      minHeight,
      direction,
      minWidth,
    } = toRefs(props);
    const styledMaxHeight = ref<number | null>(null);
    const styledTop = ref<string | null>(null);
    const styledBottom = ref<string | null>(null);

    const host = ref<{ activeZone: HTMLElement } | null>(null);
    const dropdown = ref<HTMLElement | null>(null);

    watch(canOpen, (value, oldValue) => {
      if (oldValue && !value) {
        emit("update:modelValue", false);
      }
    });

    const dropdownStyle = computed(() => {
      const _maxWidth = maxWidth.value;
      const _minWidth = minWidth.value;
      const _maxHeight = styledMaxHeight.value;

      return {
        "max-width": _maxWidth ? `${_maxWidth}px` : null,
        "min-width": _minWidth ? `${_minWidth}px` : null,
        "max-height": _maxHeight ? `${_maxHeight}px` : null,
        top: styledTop.value,
        bottom: styledBottom.value,
      };
    });

    const toggleOpen = () => {
      if (canOpen.value) {
        emit("update:modelValue", !modelValue.value);
      }
    };

    const hide = () => {
      if (modelValue.value) {
        emit("update:modelValue", false);
      }
    };

    const activeZoneChanged = (value: boolean) => {
      if (!value) {
        hide();
      }
    };

    const prevDirectionIsTop = ref<boolean>(false);

    const getFinalDirection = (hostRect: DOMRect): "top" | "bottom" => {
      const windowHeight = window.innerHeight;

      const topAvailableHeight = hostRect.top - DEFAULT_MARGIN;

      const bottomAvailableHeight =
        windowHeight - hostRect.bottom - DEFAULT_MARGIN;

      const boxHeightLimit = Math.min(
        maxHeight.value,
        windowHeight - DEFAULT_MARGIN
      );

      const visualHeight = Math.min(
        Math.max(
          dropdown.value!.getBoundingClientRect().height,
          minHeight.value || DEFAULT_MIN_HEIGHT
        ),
        boxHeightLimit
      );

      let finalDirection: "top" | "bottom" | null = null;

      switch (direction.value) {
        case "top":
          if (topAvailableHeight >= (minHeight.value || visualHeight)) {
            finalDirection = "top";
          }

          break;
        case "bottom":
          if (bottomAvailableHeight >= (minHeight.value || visualHeight)) {
            finalDirection = "bottom";
          }

          break;
      }

      if (finalDirection === null) {
        if (prevDirectionIsTop.value && topAvailableHeight >= visualHeight) {
          finalDirection = "top";
        } else if (bottomAvailableHeight >= visualHeight) {
          finalDirection = "bottom";
        } else {
          finalDirection =
            bottomAvailableHeight >= topAvailableHeight ? "bottom" : "top";
        }
      }

      return finalDirection;
    };

    const calculatePosition = () => {
      if (!host.value || !dropdown.value) {
        return;
      }

      const windowHeight = window.innerHeight;
      const hostRect = host.value.activeZone.getBoundingClientRect();

      const boxHeightLimit = Math.min(
        maxHeight.value,
        windowHeight - DEFAULT_MARGIN
      );

      const topAvailableHeight = hostRect.top - DEFAULT_MARGIN;
      const bottomAvailableHeight =
        windowHeight - hostRect.bottom - DEFAULT_MARGIN;

      const finalDirection = getFinalDirection(hostRect);

      prevDirectionIsTop.value = finalDirection === "top";

      if (finalDirection === "top") {
        styledMaxHeight.value = Math.min(boxHeightLimit, topAvailableHeight);
        styledTop.value = "auto";
        styledBottom.value = `100%`;
      } else {
        styledMaxHeight.value = Math.min(boxHeightLimit, bottomAvailableHeight);
        styledTop.value = `100%`;
        styledBottom.value = "auto";
      }
    };

    onMounted(() => {
      if (modelValue.value && canOpen.value) {
        calculatePosition();
      }
    });

    onUpdated(() => {
      if (modelValue.value && canOpen.value) {
        calculatePosition();
      }
    });

    watch(modelValue, (value) => {
      if (!canOpen.value) {
        return;
      }

      if (!value) {
        window.removeEventListener("scroll", calculatePosition);
        window.removeEventListener("resize", calculatePosition);
      } else {
        window.addEventListener("scroll", calculatePosition);
        window.addEventListener("resize", calculatePosition);
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", calculatePosition);
      window.removeEventListener("resize", calculatePosition);
    });

    return {
      hide,
      toggleOpen,
      activeZoneChanged,
      dropdownStyle,
      host,
      dropdown,
    };
  },
});
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: inline-flex;
}

.content {
  border-radius: inherit;
  height: inherit;
  flex: 1 1 auto;
  width: 100%;
}

.dropdown {
  position: absolute;
  overflow: hidden;
  top: 100%;
  width: 100%;
  padding: 2px 0;
  background-color: var(--smed-base-09);
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 5px 16px -4px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--smed-base-08);
  z-index: 1;

  &_right {
    right: 0;
  }

  &_left {
    left: 0;
  }

  &_top {
    top: 0;
    transform: translateY(-100%);
  }

  &_bottom {
    top: 100%;
  }
}
</style>
