<template>
  <button
    ref="native"
    :type="type"
    :class="buttonClass"
    :disabled="disabled"
    :tabindex="disabled || isLoading ? '-1' : '0'"
  >
    <div v-if="hasLeftIcon" :class="[$style.icon, $style.element]">
      <slot name="left-icon" />
    </div>

    <span
      v-if="($slots.default || title) && !iconButton"
      :class="[$style.content, $style.element]"
    >
      <slot>{{ title }}</slot>
    </span>

    <div v-if="hasRightIcon" :class="[$style.icon, $style.element]">
      <slot name="right-icon" />
    </div>

    <spinner v-if="isLoading" :class="$style.spinner" />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, useCssModule } from "vue";
import Spinner from "@smartmed/webpatient-vue-components/Spinner";
import { hasSlotContent } from "@smartmed/webpatient-vue-components/domain";

export default defineComponent({
  name: "BaseButton",
  components: {
    Spinner,
  },
  props: {
    title: {
      type: String,
      default: "Button",
    },
    color: {
      type: String,
      default: "primary",
      validator: (value: string) => {
        return [
          "primary",
          "secondary",
          "grey",
          "white",
          "delete",
          "deleteFilled",
        ].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => {
        return ["lg", "md", "sm"].includes(value);
      },
    },
    type: {
      type: String,
      default: "button",
    },
    isLoading: Boolean,
    wide: Boolean,
    rounded: Boolean,
    iconButton: Boolean,
  },
  setup(props, { slots }) {
    const { color, size, iconButton, wide, rounded, isLoading } = toRefs(props);
    const native = ref<HTMLElement | null>(null);
    const styles = useCssModule();

    const blur = () => {
      if (native.value) {
        native.value.blur();
      }
    };

    const buttonClass = computed(() => {
      return [
        styles.native,
        styles[`native_${color.value}`],
        styles[size.value],
        styles[iconButton.value ? "iconButton" : "button"],
        wide.value && styles.wide,
        rounded.value && styles.rounded,
        isLoading.value && styles.native_loading,
      ];
    });

    const hasLeftIcon = computed(() => hasSlotContent(slots["left-icon"]));

    const hasRightIcon = computed(() => hasSlotContent(slots["right-icon"]));

    return {
      native,
      blur,
      buttonClass,
      hasLeftIcon,
      hasRightIcon,
    };
  },
});
</script>

<style lang="scss" module>
.native {
  @include clearbutton();
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    background-color: var(--smed-base-06);
    pointer-events: none;
    cursor: default;
  }

  &_primary {
    @include buttonTheme(
      $stdColor: var(--smed-base-09),
      $stdBg: var(--smed-primary),
      $activeBg: var(--smed-primary-active),
      $hoverBg: var(--smed-primary-hover)
    );
  }

  &_secondary {
    @include buttonTheme(
      $stdColor: var(--smed-base-09),
      $stdBg: var(--smed-secondary),
      $activeBg: var(--smed-secondary-active),
      $hoverBg: var(--smed-secondary-hover)
    );
  }

  &_grey {
    @include buttonTheme(
      $stdColor: var(--smed-base-02),
      $stdBg: var(--smed-base-08),
      $activeBg: var(--smed-base-06),
      $hoverBg: var(--smed-base-07)
    );
  }

  &_white {
    @include buttonTheme(
      $stdColor: var(--smed-primary),
      $stdBg: var(--smed-base-09),
      $activeBg: var(--smed-base-07),
      $hoverBg: var(--smed-base-08)
    );
  }

  &_delete {
    @include buttonTheme(
      $stdColor: var(--smed-error),
      $stdBg: var(--smed-base-09),
      $activeBg: var(--smed-base-07),
      $hoverBg: var(--smed-base-08)
    );
  }

  &_deleteFilled {
    @include buttonTheme(
      $stdColor: var(--smed-base-09),
      $stdBg: var(--smed-error),
      $activeBg: var(--smed-error-active),
      $hoverBg: var(--smed-error-hover)
    );
  }

  &_loading {
    pointer-events: none;
  }
}

.sm {
  @include smed-text_body-sm;
  @include smed-text_medium;

  height: 32px;
  border-radius: 4px;
}

.md {
  @include smed-text_body-xl;
  @include smed-text_medium;

  height: 44px;
  border-radius: 6px;
}

.lg {
  @include smed-text_body-xl;
  @include smed-text_medium;

  height: 56px;
  border-radius: 8px;
}

.button {
  min-width: 120px;

  &.sm {
    padding: 6px 24px;
  }

  &.md {
    padding: 10px 24px;
  }

  &.lg {
    padding: 16px 24px;
  }

  &.wide {
    width: 100%;
  }
}

.rounded {
  &.sm {
    border-radius: 16px;
  }

  &.md {
    border-radius: 22px;
  }

  &.lg {
    border-radius: 28px;
  }
}

.iconButton {
  &.sm {
    width: 32px;
    padding: 6px;
  }

  &.md {
    width: 44px;
    padding: 10px;
  }

  &.lg {
    width: 56px;
    padding: 16px;
  }

  &.rounded {
    border-radius: 100%;
  }
}

.content {
  .native_loading & {
    opacity: 0;
  }
}

.icon {
  display: flex;
  align-items: center;
}

.element {
  color: inherit;

  & + & {
    margin-left: 10px;
  }

  .native_loading.iconButton & {
    opacity: 0;
  }
}

.spinner {
  @include size(100%, 100%);
  @include flex(center, center);
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  background-color: #e0e0e09c;
}
</style>
