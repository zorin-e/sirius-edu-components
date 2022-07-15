<template>
  <label :class="[$style.input, readonly && $style.input_readonly]" :for="id">
    <span
      v-if="!!label"
      data-automation-id="smed-base-input-label"
      :class="[$style.label, 'smed-text_body-sm']"
      @click.stop
      >{{ label }}</span
    >

    <div
      :class="[
        $style.wrapper,
        $style['wrapper_' + size],
        hasBorder && $style.wrapper_hasBorder,
        isError && $style.wrapper_error,
        disabled && $style.wrapper_disabled,
        focused && $style.focus,
      ]"
    >
      <div
        v-if="hasLeftSlot"
        data-automation-id="smed-base-input-left-icon"
        :class="[$style.icon, $style.iconsLeft, $style.icon_left]"
      >
        <slot name="left" :size="iconSize" />
      </div>

      <div :class="$style.nativeWrapper">
        <masked-input
          data-automation-id="smed-base-input-native"
          ref="native"
          :class="[
            $style.native,
            !editable && $style.native_notEditable,
            showValueTemplate && $style.native_hidden,
            disabled && $style.native_disabled,
          ]"
          :modelValue="modelValue"
          :type="type"
          :autocomplete="autocomplete"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          :id="id"
          :maskOptions="maskOptions"
          :inputmode="inputmode"
          :min="min"
          :max="max"
          :readOnly="readonly || !editable"
          :stringify="stringify"
          @update:modelValue="emitValue"
        />

        <div
          v-if="showValueTemplate"
          data-automation-id="smed-base-input-value-content"
          :class="[
            $style.native,
            !editable && $style.native_notEditable,
            $style.native_template,
          ]"
        >
          <slot name="valueContent" />
        </div>
      </div>

      <div v-if="hasRightIcons" :class="$style.iconsRight">
        <svg-icon
          v-if="isError"
          data-automation-id="smed-base-input-error-icon"
          name="close-filled"
          :class="[$style.icon, $style.icon_right, $style.icon_error]"
          :size="iconSize"
        />

        <svg-icon
          v-if="isSuccess"
          data-automation-id="smed-base-input-success-icon"
          name="check-filled"
          :class="[$style.icon, $style.icon_success, $style.icon_right]"
          :size="iconSize"
        />

        <svg-icon
          v-if="hasCleaner && isValue"
          data-automation-id="smed-base-input-cleaner-icon"
          name="close"
          :class="[$style.closeIcon, $style.icon, $style.icon_right]"
          :size="iconSize"
          @click.stop.prevent="clearSearch"
        />

        <div
          v-if="hasRightSlot"
          data-automation-id="smed-base-input-right-icon"
          :class="$style.icon_right"
        >
          <slot name="right" />
        </div>
      </div>
    </div>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from "vue";
import MaskedInput from "@smartmed/webpatient-vue-components/MaskedInput";
import {
  useInteractive,
  useModelModifiers,
} from "@smartmed/webpatient-vue-components/application";
import {
  Stringify,
  MaskOptions,
  hasSlotContent,
} from "@smartmed/webpatient-vue-components/domain";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

export default defineComponent({
  name: "BaseInput",
  components: {
    MaskedInput,
    SvgIcon,
  },
  props: {
    modelValue: {
      type: [String, Number, Object, null] as PropType<
        string | number | {} | null
      >,
      required: true,
    },
    modelModifiers: {
      type: Object as PropType<Record<string, boolean>>,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "text",
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => ["lg", "md", "sm"].includes(value),
    },
    disabled: Boolean,
    label: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: true,
    },
    maskOptions: {
      type: Object as PropType<MaskOptions>,
      default: null,
    },
    isError: [Boolean, String],
    isSuccess: [Boolean, String],
    placeholder: String,
    autocomplete: String,
    name: String,
    hasCleaner: Boolean,
    inputmode: String,
    min: [String, Number],
    max: [String, Number],
    readonly: Boolean,
    hasBorder: {
      type: Boolean,
      default: true,
    },
    stringify: {
      type: Function as PropType<Stringify<any>>,
    },
  },
  setup(props, { emit, slots }) {
    const {
      modelValue,
      modelModifiers,
      editable,
      isSuccess,
      isError,
      hasCleaner,
      size,
    } = toRefs(props);

    const showPass = ref(false);
    const interactive = useInteractive();
    const modifiers = useModelModifiers(modelModifiers.value);

    const isValue = computed(
      () => !!modelValue.value && String(modelValue.value).length > 0
    );

    const iconSize = computed(() => {
      return size.value === "sm" ? "md" : "lg";
    });

    const computedHasValueContent = computed(() =>
      hasSlotContent(slots.valueContent)
    );

    const showValueTemplate = computed(() => {
      const showValueContent = isValue.value && computedHasValueContent.value;
      const notEditable = !editable.value && showValueContent;
      const isEditableAndNotFocused =
        editable.value && !interactive.focused.value && showValueContent;

      return notEditable || isEditableAndNotFocused;
    });

    const hasRightSlot = computed(() => hasSlotContent(slots.right));

    const hasLeftSlot = computed(() => hasSlotContent(slots.left));

    const hasRightIcons = computed(() => {
      return (
        isError.value ||
        isSuccess.value ||
        (isValue.value && hasCleaner.value) ||
        hasRightSlot.value
      );
    });

    const emitValue = (value: any) => {
      emit("update:modelValue", modifiers.modify(value));
    };

    const clearSearch = () => {
      emit("search-clear");
      interactive.focus();
    };

    return {
      showPass,
      focused: interactive.focused,
      native: interactive.native,
      id: interactive.id,
      focus: interactive.focus,
      blur: interactive.blur,
      isValue,
      showValueTemplate,
      clearSearch,
      emitValue,
      hasRightIcons,
      hasRightSlot,
      hasLeftSlot,
      iconSize,
    };
  },
});
</script>

<style lang="scss" module>
.input {
  display: block;
  cursor: inherit;

  &_readonly {
    cursor: default;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--smed-base-09);
  border-radius: 6px;

  color: var(--smed-base-01);

  &_hasBorder {
    border: 1px solid var(--smed-base-05);
  }

  &_sm {
    @include smed-text_body-sm;

    height: 32px;
  }

  &_md {
    @include smed-text_body-xl;

    height: 44px;
  }

  &_lg {
    @include smed-text_body-xl;

    height: 56px;
  }

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

.nativeWrapper {
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.native {
  @include clearinput();

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  white-space: nowrap;
  overflow: hidden;
  cursor: inherit;

  &_template {
    user-select: none;
    pointer-events: none;
  }

  &_hidden {
    opacity: 0;
  }

  .wrapper_sm & {
    padding: 6px 8px;
  }

  .wrapper_md & {
    padding: 10px 12px;
  }

  .wrapper_lg & {
    padding: 16px;
  }

  .input_readonly & {
    cursor: default;
  }

  &_notEditable {
    text-overflow: ellipsis;
  }

  &_disabled {
    cursor: default;
  }
}

.label {
  display: inline-block;
  color: var(--smed-base-03);
  margin-bottom: 4px;
}

.iconsLeft {
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper_sm & {
    padding: 6px 0 6px 8px;
  }

  .wrapper_md & {
    padding: 10px 0 10px 12px;
  }

  .wrapper_lg & {
    padding: 16px 0 16px 16px;
  }
}

.icon {
  color: var(--smed-base-05);

  &_left {
    flex-shrink: 0;
  }

  &_right {
    display: flex;
  }

  &_right:not(:last-child) {
    margin-right: 8px;
  }

  &_error {
    color: var(--smed-error);
  }

  &_success {
    color: var(--smed-success);
  }
}

.iconsRight {
  display: flex;
  align-items: center;
  height: 100%;
  flex-shrink: 0;

  .wrapper_sm & {
    padding: 6px 8px 6px 0;
  }

  .wrapper_md & {
    padding: 10px 12px 10px 0;
  }

  .wrapper_lg & {
    padding: 16px;
    padding-left: 0;
  }
}

.error {
  border-color: var(--smed-error) !important;
}

.closeIcon {
  cursor: pointer;
  flex-shrink: 0;
  color: var(--smed-base-05);

  &:hover {
    color: var(--smed-base-04);
  }

  &:active {
    color: var(--smed-base-03);
  }
}
</style>
