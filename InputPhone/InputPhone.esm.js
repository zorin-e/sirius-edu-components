import { defineComponent, toRefs, inject, ref, computed, watch, resolveComponent, openBlock, createBlock, mergeProps, withModifiers, withKeys } from 'vue';
import { conformToMask } from 'text-mask-core';
import { getClipboardDataText } from '@smartmed/webpatient-vue-components/domain';
import { SELECTION_CHANGE_TOKEN } from '@smartmed/webpatient-vue-components/tokens';
import BaseInput from '@smartmed/webpatient-vue-components/BaseInput';

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
    pipe: (value) => {
        return value === "" ? COUNTRY_PREFIX : value.replace(/[- ]$/, "");
    },
    guide: false,
};
var script = defineComponent({
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
        const selectionChangeEvents = inject(SELECTION_CHANGE_TOKEN);
        const baseInput = ref(null);
        const formattedValue = computed(() => {
            const formatted = modelValue.value.replace(/^7/, "") || COUNTRY_PREFIX;
            const { conformedValue } = conformToMask(formatted, maskOptions.mask, {
                guide: false,
            });
            return conformedValue.replace(/[- ]$/, "");
        });
        const nativeElement = computed(() => {
            return (baseInput.value && baseInput.value.$refs.native.$refs.native);
        });
        const updateValue = (value) => {
            emit("update:modelValue", value);
        };
        const onBackspace = (event) => {
            if ((event.target.selectionStart || 0) <= NON_REMOVABLE_LENGTH &&
                event.target.selectionStart === event.target.selectionEnd) {
                event.preventDefault();
            }
        };
        const getValueWithoutPrefix = (value) => {
            const oldValueExist = modelValue.value.length > 1 && modelValue.value.length < 11;
            const newValueLength = value.replace(NON_PLUS_AND_DIGITS_REGEX, "").length;
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
        const onPaste = (event) => {
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
            return (baseInput.value.focused &&
                selectionStart !== null &&
                selectionStart < NON_REMOVABLE_LENGTH &&
                selectionStart === selectionEnd);
        };
        const setCarretPosition = () => {
            if (caretIsInForbiddenArea() && !!nativeElement.value) {
                nativeElement.value.setSelectionRange(NON_REMOVABLE_LENGTH, NON_REMOVABLE_LENGTH, "none");
            }
        };
        watch(modelValue, (value) => {
            if (value && value.length === 11 && value.startsWith("8")) {
                const correctValue = getValueWithoutPrefix(value);
                updateValue(correctValue);
            }
        }, { immediate: true });
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_input = resolveComponent("base-input");

  return (openBlock(), createBlock(_component_base_input, mergeProps(_ctx.$attrs, {
    autocomplete: "tel",
    "data-automation-id": "smed-input-phone",
    ref: "baseInput",
    type: "tel",
    name: "tel",
    modelValue: _ctx.formattedValue,
    "mask-options": _ctx.maskOptions,
    disabled: _ctx.disabled,
    onPaste: withModifiers(_ctx.onPaste, ["prevent"]),
    "onUpdate:modelValue": _ctx.updateValue,
    onKeydown: withKeys(_ctx.onBackspace, ["backspace"])
  }), null, 16, ["modelValue", "mask-options", "disabled", "onPaste", "onUpdate:modelValue", "onKeydown"]))
}

script.render = render;

export { script as default };
