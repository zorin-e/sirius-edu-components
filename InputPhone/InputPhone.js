this.smartmed = this.smartmed || {};
this.smartmed.InputPhone = (function (vue, textMaskCore, domain, tokens, BaseInput) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var BaseInput__default = /*#__PURE__*/_interopDefaultLegacy(BaseInput);

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
  var script = vue.defineComponent({
      inheritAttrs: false,
      components: {
          BaseInput: BaseInput__default["default"],
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
          const { modelValue, disabled } = vue.toRefs(props);
          const selectionChangeEvents = vue.inject(tokens.SELECTION_CHANGE_TOKEN);
          const baseInput = vue.ref(null);
          const formattedValue = vue.computed(() => {
              const formatted = modelValue.value.replace(/^7/, "") || COUNTRY_PREFIX;
              const { conformedValue } = textMaskCore.conformToMask(formatted, maskOptions.mask, {
                  guide: false,
              });
              return conformedValue.replace(/[- ]$/, "");
          });
          const nativeElement = vue.computed(() => {
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
              const text = domain.getClipboardDataText(event).replace(/^\+?7|8/, "");
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
          vue.watch(modelValue, (value) => {
              if (value && value.length === 11 && value.startsWith("8")) {
                  const correctValue = getValueWithoutPrefix(value);
                  updateValue(correctValue);
              }
          }, { immediate: true });
          if (selectionChangeEvents) {
              vue.watch(selectionChangeEvents, () => {
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
    const _component_base_input = vue.resolveComponent("base-input");

    return (vue.openBlock(), vue.createBlock(_component_base_input, vue.mergeProps(_ctx.$attrs, {
      autocomplete: "tel",
      "data-automation-id": "smed-input-phone",
      ref: "baseInput",
      type: "tel",
      name: "tel",
      modelValue: _ctx.formattedValue,
      "mask-options": _ctx.maskOptions,
      disabled: _ctx.disabled,
      onPaste: vue.withModifiers(_ctx.onPaste, ["prevent"]),
      "onUpdate:modelValue": _ctx.updateValue,
      onKeydown: vue.withKeys(_ctx.onBackspace, ["backspace"])
    }), null, 16, ["modelValue", "mask-options", "disabled", "onPaste", "onUpdate:modelValue", "onKeydown"]))
  }

  script.render = render;

  return script;

})(Vue, textMaskCore, smartmed.domain, smartmed.tokens, smartmed.BaseInput);
