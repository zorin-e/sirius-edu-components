<template>
  <base-input
    v-bind="$attrs"
    autocomplete="tel"
    data-automation-id="smed-input-phone"
    ref="baseInput"
    type="tel"
    name="tel"
    :modelValue="formattedValue"
    :mask-options="maskOptions"
    :disabled="disabled"
    @paste.prevent="onPaste"
    @update:modelValue="updateValue"
    @keydown.backspace="onBackspace"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import { conformToMask } from "text-mask-core";
import { getClipboardDataText } from "@smartmed/webpatient-vue-components/domain";
import { SELECTION_CHANGE_TOKEN } from "@smartmed/webpatient-vue-components/tokens";
import BaseInput from "@smartmed/webpatient-vue-components/BaseInput";

const NON_PLUS_AND_DIGITS_REGEX = /[ \-_]/g;
const COUNTRY_PREFIX = "+7 ";
const NON_REMOVABLE_LENGTH = COUNTRY_PREFIX.length;

const maskOptions = {
  mask: [
    ...COUNTRY_PREFIX.split(""),
    /[1-9]/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ],
  pipe: (value: string) => {
    return value === "" ? COUNTRY_PREFIX : value.replace(/[- ]$/, "");
  },
  guide: false,
};

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseInput,
  },
  name: "InputPhone",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const { modelValue, disabled } = toRefs(props);
    const selectionChangeEvents = inject<Ref<Event | null>>(
      SELECTION_CHANGE_TOKEN
    );

    const baseInput = ref<HTMLElement | null>(null);

    const formattedValue = computed(() => {
      const formatted = modelValue.value.replace(/^7/, "") || COUNTRY_PREFIX;

      const { conformedValue } = conformToMask(formatted, maskOptions.mask, {
        guide: false,
      });

      return conformedValue.replace(/[- ]$/, "");
    });

    const nativeElement = computed(() => {
      return (
        baseInput.value && (baseInput.value as any).$refs.native.$refs.native
      );
    });

    const updateValue = (value: string) => {
      emit("update:modelValue", value);
    };

    const onBackspace = (event: Event & { target: HTMLInputElement }) => {
      if (
        (event.target.selectionStart || 0) <= NON_REMOVABLE_LENGTH &&
        event.target.selectionStart === event.target.selectionEnd
      ) {
        event.preventDefault();
      }
    };

    const getValueWithoutPrefix = (value: string) => {
      const oldValueExist =
        modelValue.value.length > 1 && modelValue.value.length < 11;
      const newValueLength = value.replace(
        NON_PLUS_AND_DIGITS_REGEX,
        ""
      ).length;
      const cleanNewValue = value.replace(/[^0-9]+/g, "");
      const selectionLength = String(getSelection()).length;

      if (oldValueExist && selectionLength === 0) {
        return `${modelValue.value}${cleanNewValue}`.slice(0, 13);
      }

      if (newValueLength < 10) {
        return `7${cleanNewValue}`.slice(0, 11);
      }

      return `7${cleanNewValue.replace(/^7|^8/, "")}`.slice(0, 11);
    };

    const onPaste = (event: ClipboardEvent) => {
      if (disabled.value) {
        return;
      }

      const text = getClipboardDataText(event).replace(/^\+?7|8/, "");

      const value = getValueWithoutPrefix(text);

      updateValue(value);
    };

    const caretIsInForbiddenArea = () => {
      if (!nativeElement.value || !baseInput.value) {
        return false;
      }

      const { selectionStart, selectionEnd } = nativeElement.value;

      return (
        (baseInput.value as any).focused &&
        selectionStart !== null &&
        selectionStart < NON_REMOVABLE_LENGTH &&
        selectionStart === selectionEnd
      );
    };

    const setCarretPosition = () => {
      if (caretIsInForbiddenArea() && !!nativeElement.value) {
        nativeElement.value.setSelectionRange(
          NON_REMOVABLE_LENGTH,
          NON_REMOVABLE_LENGTH,
          "none"
        );
      }
    };

    watch(
      modelValue,
      (value) => {
        if (value && value.length === 11 && value.startsWith("8")) {
          const correctValue = getValueWithoutPrefix(value);

          updateValue(correctValue);
        }
      },
      { immediate: true }
    );

    if (selectionChangeEvents) {
      watch(selectionChangeEvents, () => {
        setCarretPosition();
      });
    }

    return {
      baseInput,
      formattedValue,
      onBackspace,
      onPaste,
      maskOptions,
      updateValue,
    };
  },
});
</script>
