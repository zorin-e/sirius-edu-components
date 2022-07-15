<template>
  <label :class="$style.textarea" :for="id">
    <span v-if="!!label" :class="[$style.label, 'smed-text_body-sm']">{{
      label
    }}</span>
    <textarea
      ref="native"
      :class="[
        $style.wrapper,
        'smed-text_body-xl',
        isError && $style.wrapper_error,
        disabled && $style.wrapper_disabled,
        focused && $style.focus,
      ]"
      :style="style"
      :disabled="disabled"
      :id="id"
      :value="modelValue"
      @input="emitValue($event.target.value)"
    >
    </textarea>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from "vue";
import {
  useInteractive,
  useModelModifiers,
} from "@smartmed/webpatient-vue-components/application";

export default defineComponent({
  name: "BaseTextarea",
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number, null] as PropType<string | number | null>,
      required: true,
    },
    modelModifiers: {
      type: Object as PropType<Record<string, boolean>>,
      default: () => ({}),
    },
    indentRight: {
      type: Number,
    },
    isError: Boolean,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const { modelModifiers, disabled, indentRight } = toRefs(props);
    const modifiers = useModelModifiers(modelModifiers.value);
    const interactive = useInteractive();
    const emitValue = (value: any) => {
      if (disabled.value) {
        return;
      }
      emit("update:modelValue", modifiers.modify(value));
    };
    const style = ref({
      paddingRight: indentRight ? `${indentRight.value}px` : undefined,
    });
    return {
      focused: interactive.focused,
      native: interactive.native,
      id: interactive.id,
      focus: interactive.focus,
      blur: interactive.blur,
      emitValue,
      style,
    };
  },
});
</script>

<style lang="scss" module>
.wrapper {
  @include hide-scroll;

  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  resize: none;
  width: 100%;
  height: 88px;

  background: var(--smed-base-09);
  border: 1px solid var(--smed-base-05);
  border-radius: 6px;

  color: var(--smed-base-01);
  padding: 10px 12px;

  &:hover {
    border-color: var(--smed-base-04);
  }

  &:focus,
  &.focus {
    border-color: var(--smed-primary);
  }

  &_error {
    border-color: var(--smed-error);

    &:hover,
    &:focus,
    &.focus {
      border-color: var(--smed-error);
    }
  }

  &_disabled {
    @include disabled(0.6);
  }
}

.label {
  display: inline-block;
  margin-bottom: 4px;

  color: var(--smed-base-03);
}
</style>
