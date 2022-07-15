<template>
  <label :class="$style.checkbox" :disabled="disabled" :for="id">
    <div :class="$style.wrapper">
      <input
        ref="native"
        type="checkbox"
        :class="$style.input"
        :id="id"
        :checked="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <div
        :class="[
          $style.icon,
          $style[size],
          disabled && $style.disabled,
          isError && $style.error,
        ]"
      >
        <svg-icon :size="size" :name="icon" :class="$style.iconComponent" />
      </div>
      <span
        v-if="$slots.default"
        :class="[$style.text, $style['text_' + size]]"
      >
        <slot>
          {{ label }}
        </slot>
      </span>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { useInteractive } from "@smartmed/webpatient-vue-components/application";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

export default defineComponent({
  name: "BaseCheckbox",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    modelValue: {
      type: Boolean,
    },
    disabled: Boolean,
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => {
        return ["sm", "md", "lg"].includes(value);
      },
    },
    icon: {
      type: String,
      default: "check",
      validator: (value: string) => {
        return ["check", "minus"].includes(value);
      },
    },
    isError: [Boolean, String],
  },
  components: {
    SvgIcon,
  },
  setup(props) {
    const { icon } = toRefs(props);
    const interactive = useInteractive();

    return {
      id: interactive.id,
      native: interactive.native,
      focus: interactive.focus,
      blur: interactive.blur,
    };
  },
});
</script>

<style lang="scss" module>
.checkbox {
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

.wrapper {
  @include flex(center, center);
}

.icon {
  @include flex(center, center);

  display: flex;

  align-self: flex-start;
  flex-shrink: 0;

  border: 2px solid var(--smed-base-05);
  color: var(--smed-base-09);
}

.iconComponent {
  display: inline-flex;
  opacity: 0;
}

.input {
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;

  &:focus {
    ~ .icon {
      border-color: var(--smed-base-03);
    }
  }

  &:enabled {
    ~ .icon {
      &:hover {
        border-color: var(--smed-base-04);
      }

      &:active {
        border-color: var(--smed-base-03);
      }
    }
  }

  &:checked {
    ~ .icon {
      background-color: var(--smed-primary);
      border: 0;

      &:hover {
        background-color: var(--smed-primary-hover);
      }

      &:active {
        background-color: var(--smed-primary-active);
      }

      .iconComponent {
        opacity: 1;
      }
    }

    &:disabled {
      ~ .icon {
        background-color: var(--smed-base-05);
      }
    }

    &:focus {
      ~ .icon {
        background-color: var(--smed-primary-active);
      }
    }
  }
}

.sm {
  @include size(16px);

  border-radius: 3px;
}

.md {
  @include size(20px);

  border-radius: 4px;
}

.lg {
  @include size(24px);

  border-radius: 5px;
}

.disabled {
  background-color: var(--smed-base-08);
  border-color: var(--smed-base-06);
  cursor: default;
}

.error {
  border-color: var(--smed-error);
}

.text {
  color: var(--smed-base-03);

  &_sm {
    @include smed-text_body-xs;

    margin-left: 8px;
  }

  &_md {
    @include smed-text_body-sm;

    margin-left: 12px;
  }

  &_lg {
    @include smed-text_body-md;

    margin-left: 16px;
  }
}
</style>
