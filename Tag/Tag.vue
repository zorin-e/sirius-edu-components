<template>
  <button
    ref="native"
    type="button"
    :class="[
      $style.tag,
      $style['tag_' + size],
      $style['tag_' + color],
      clickable && $style.tag_clickable,
      disabled && $style.tag_disabled,
    ]"
    :disabled="disabled || !clickable"
    @mouseleave="blur"
    @keydown.backspace="remove"
    @keydown.esc="remove"
  >
    <span :class="[$style.content, removable && $style.content_removable]">
      <slot />
    </span>

    <div
      v-if="removable"
      :class="$style.iconContainer"
      @click.stop.prevent="remove"
    >
      <svg-icon name="close-filled" :class="$style.icon" />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

export default defineComponent({
  components: { SvgIcon },
  name: "Tag",
  props: {
    size: {
      type: String,
      default: "md",
      validator: (value: string) =>
        ["xxs", "xs", "sm", "md", "lg"].includes(value),
    },
    color: {
      type: String,
      default: "primary",
      validator: (value: string) =>
        [
          "primary",
          "secondary",
          "grey",
          "darkGrey",
          "white",
          "delete",
          "deleteFilled",
          "pink",
        ].includes(value),
    },
    removable: Boolean,
    disabled: Boolean,
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { removable } = toRefs(props);
    const native = ref<HTMLElement | null>(null);

    const blur = () => {
      if (native.value) {
        native.value.blur();
      }
    };

    const remove = () => {
      if (removable.value) {
        emit("remove");
      }
    };

    return {
      blur,
      native,
      remove,
    };
  },
});
</script>

<style lang="scss" module>
.tag {
  @include clearbutton();
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &_clickable {
    cursor: pointer;
    pointer-events: initial;
  }

  &_disabled {
    opacity: 0.6;
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

  &_pink {
    @include buttonTheme(
      $stdColor: var(--smed-base-09),
      $stdBg: var(--smed-support-secondary-02),
      $activeBg: var(--smed-support-secondary-01),
      $hoverBg: var(--smed-support-secondary-03)
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

  &_darkGrey {
    @include buttonTheme(
      $stdColor: var(--smed-base-09),
      $stdBg: var(--smed-base-03),
      $activeBg: var(--smed-base-05),
      $hoverBg: var(--smed-base-04)
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

  &_xxs {
    @include smed-text_body-xs;

    border-radius: 12px;
  }

  &_xs {
    @include smed-text_body-md;

    border-radius: 12px;
  }

  &_sm {
    @include smed-text_body-md;

    border-radius: 20px;
  }

  &_md {
    @include smed-text_body-xl;

    border-radius: 22px;
  }

  &_lg {
    @include smed-text_body-xl;

    border-radius: 24px;
  }
}

.content {
  .tag_xxs & {
    height: 16px;
    min-width: 16px;
    padding: 0 4px;
  }

  .tag_xs & {
    padding: 0 9px;
  }

  .tag_sm & {
    padding: 6px 12px;
  }

  .tag_md & {
    padding: 8px 16px;
  }

  .tag_lg & {
    padding: 14px 26px;
  }

  &_removable {
    padding-right: 0 !important;
  }
}

.iconContainer {
  @include transition(color);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--smed-base-09);

  .tag_xxs & {
    padding: 2px;
  }

  .tag_xs & {
    padding: 4px;
  }

  .tag_sm & {
    padding: 6px 6px;
  }

  .tag_md & {
    padding: 8px 8px;
  }

  .tag_lg & {
    padding: 14px 8px;
  }

  .tag_grey &,
  .tag_white &,
  .tag_delete & {
    color: var(--smed-base-03);
  }
}

.icon {
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  color: inherit;

  .tag_md &,
  .tag_lg & {
    width: 24px;
    height: 24px;
    max-width: 24px;
    max-height: 24px;
  }
}
</style>
