<template>
  <div
    :class="[
      $style.host,
      $style[`host_${size}`],
      modelValue && $style.host_checked,
      disabled && $style.host_disabled,
      focused && $style.host_focused,
    ]"
  >
    <div :class="$style.toggle">
      <div :class="$style.circle">
        <lock-icon v-if="disabled" width="100%" height="100%" />
      </div>
    </div>

    <input
      type="checkbox"
      role="switch"
      ref="native"
      :id="id"
      :class="$style.checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="updateValue($event.target)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useInteractive } from "@smartmed/webpatient-vue-components/application";
import LockIcon from "@smartmed/webpatient-vue-components/assets/svg/lock.svg";

export default defineComponent({
  components: {
    LockIcon,
  },
  name: "Toggle",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => ["sm", "md", "lg"].includes(value),
    },
    disabled: Boolean,
    id: String,
  },
  setup(_, { emit }) {
    const interactive = useInteractive();

    const updateValue = ({ checked }: HTMLInputElement) => {
      emit("update:modelValue", checked);
    };

    return {
      updateValue,
      native: interactive.native,
      focused: interactive.focused,
      focus: interactive.focus,
      blur: interactive.blur,
    };
  },
});
</script>

<style lang="scss" module>
.host {
  @include transition(background-color);

  position: relative;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  background-color: var(--smed-base-06);

  &_checked {
    background-color: var(--smed-primary);

    &:hover:not(.host_disabled),
    &.host_focused:not(.host_disabled) {
      background-color: var(--smed-primary-hover);
    }

    &.host_disabled {
      background-color: var(--smed-base-05);
      color: var(--smed-base-05);
    }
  }

  &_sm {
    width: 28px;
    height: 16px;
    border-radius: 10px;
  }

  &_md {
    width: 42px;
    height: 24px;
    border-radius: 12px;
  }

  &_lg {
    width: 56px;
    height: 32px;
    border-radius: 16px;
  }

  &:hover:not(.host_checked):not(.host_disabled),
  &_focused:not(.host_checked):not(.host_disabled) {
    background-color: var(--smed-base-05);
  }

  &_disabled:not(.host_checked) {
    background-color: var(--smed-base-06);
    color: var(--smed-base-06);
  }
}

.checkbox {
  @include clearinput();
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;

  .host_disabled & {
    pointer-events: none;
    cursor: default;
  }
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: 0.4s transform ease;

  .host_sm & {
    transform: translateX(-5px);
  }

  .host_checked.host_sm & {
    transform: translateX(5px);
  }

  .host_md & {
    transform: translateX(-8px);
  }

  .host_checked.host_md & {
    transform: translateX(8px);
  }

  .host_lg & {
    transform: translateX(-10px);
  }

  .host_checked.host_lg & {
    transform: translateX(10px);
  }
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--smed-base-09);
  border-radius: 100%;
  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.32);
  border: 0.5px solid var(--smed-base-07);

  .host_sm & {
    width: 12px;
    height: 12px;
    padding: 2px;
  }

  .host_md & {
    width: 18px;
    height: 18px;
    padding: 3px;
  }

  .host_lg & {
    width: 24px;
    height: 24px;
    padding: 4px;
  }
}
</style>
