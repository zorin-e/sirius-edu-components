this.smartmed = this.smartmed || {};
this.smartmed.BaseInput = (function (vue, MaskedInput, application, domain, SvgIcon) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var MaskedInput__default = /*#__PURE__*/_interopDefaultLegacy(MaskedInput);
  var SvgIcon__default = /*#__PURE__*/_interopDefaultLegacy(SvgIcon);

  var script = vue.defineComponent({
      name: "BaseInput",
      components: {
          MaskedInput: MaskedInput__default["default"],
          SvgIcon: SvgIcon__default["default"],
      },
      props: {
          modelValue: {
              type: [String, Number, Object, null],
              required: true,
          },
          modelModifiers: {
              type: Object,
              default: () => ({}),
          },
          type: {
              type: String,
              default: "text",
          },
          size: {
              type: String,
              default: "md",
              validator: (value) => ["lg", "md", "sm"].includes(value),
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
              type: Object,
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
              type: Function,
          },
      },
      setup(props, { emit, slots }) {
          const { modelValue, modelModifiers, editable, isSuccess, isError, hasCleaner, size, } = vue.toRefs(props);
          const showPass = vue.ref(false);
          const interactive = application.useInteractive();
          const modifiers = application.useModelModifiers(modelModifiers.value);
          const isValue = vue.computed(() => !!modelValue.value && String(modelValue.value).length > 0);
          const iconSize = vue.computed(() => {
              return size.value === "sm" ? "md" : "lg";
          });
          const computedHasValueContent = vue.computed(() => domain.hasSlotContent(slots.valueContent));
          const showValueTemplate = vue.computed(() => {
              const showValueContent = isValue.value && computedHasValueContent.value;
              const notEditable = !editable.value && showValueContent;
              const isEditableAndNotFocused = editable.value && !interactive.focused.value && showValueContent;
              return notEditable || isEditableAndNotFocused;
          });
          const hasRightSlot = vue.computed(() => domain.hasSlotContent(slots.right));
          const hasLeftSlot = vue.computed(() => domain.hasSlotContent(slots.left));
          const hasRightIcons = vue.computed(() => {
              return (isError.value ||
                  isSuccess.value ||
                  (isValue.value && hasCleaner.value) ||
                  hasRightSlot.value);
          });
          const emitValue = (value) => {
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

  const _hoisted_1 = ["for"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_masked_input = vue.resolveComponent("masked-input");
    const _component_svg_icon = vue.resolveComponent("svg-icon");

    return (vue.openBlock(), vue.createElementBlock("label", {
      class: vue.normalizeClass([_ctx.$style.input, _ctx.readonly && _ctx.$style.input_readonly]),
      for: _ctx.id
    }, [
      (!!_ctx.label)
        ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            "data-automation-id": "smed-base-input-label",
            class: vue.normalizeClass([_ctx.$style.label, 'smed-text_body-sm']),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {}, ["stop"]))
          }, vue.toDisplayString(_ctx.label), 3))
        : vue.createCommentVNode("", true),
      vue.createElementVNode("div", {
        class: vue.normalizeClass([
          _ctx.$style.wrapper,
          _ctx.$style['wrapper_' + _ctx.size],
          _ctx.hasBorder && _ctx.$style.wrapper_hasBorder,
          _ctx.isError && _ctx.$style.wrapper_error,
          _ctx.disabled && _ctx.$style.wrapper_disabled,
          _ctx.focused && _ctx.$style.focus,
        ])
      }, [
        (_ctx.hasLeftSlot)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              "data-automation-id": "smed-base-input-left-icon",
              class: vue.normalizeClass([_ctx.$style.icon, _ctx.$style.iconsLeft, _ctx.$style.icon_left])
            }, [
              vue.renderSlot(_ctx.$slots, "left", { size: _ctx.iconSize })
            ], 2))
          : vue.createCommentVNode("", true),
        vue.createElementVNode("div", {
          class: vue.normalizeClass(_ctx.$style.nativeWrapper)
        }, [
          vue.createVNode(_component_masked_input, {
            "data-automation-id": "smed-base-input-native",
            ref: "native",
            class: vue.normalizeClass([
              _ctx.$style.native,
              !_ctx.editable && _ctx.$style.native_notEditable,
              _ctx.showValueTemplate && _ctx.$style.native_hidden,
              _ctx.disabled && _ctx.$style.native_disabled,
            ]),
            modelValue: _ctx.modelValue,
            type: _ctx.type,
            autocomplete: _ctx.autocomplete,
            name: _ctx.name,
            placeholder: _ctx.placeholder,
            disabled: _ctx.disabled,
            id: _ctx.id,
            maskOptions: _ctx.maskOptions,
            inputmode: _ctx.inputmode,
            min: _ctx.min,
            max: _ctx.max,
            readOnly: _ctx.readonly || !_ctx.editable,
            stringify: _ctx.stringify,
            "onUpdate:modelValue": _ctx.emitValue
          }, null, 8, ["class", "modelValue", "type", "autocomplete", "name", "placeholder", "disabled", "id", "maskOptions", "inputmode", "min", "max", "readOnly", "stringify", "onUpdate:modelValue"]),
          (_ctx.showValueTemplate)
            ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                "data-automation-id": "smed-base-input-value-content",
                class: vue.normalizeClass([
              _ctx.$style.native,
              !_ctx.editable && _ctx.$style.native_notEditable,
              _ctx.$style.native_template,
            ])
              }, [
                vue.renderSlot(_ctx.$slots, "valueContent")
              ], 2))
            : vue.createCommentVNode("", true)
        ], 2),
        (_ctx.hasRightIcons)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(_ctx.$style.iconsRight)
            }, [
              (_ctx.isError)
                ? (vue.openBlock(), vue.createBlock(_component_svg_icon, {
                    key: 0,
                    "data-automation-id": "smed-base-input-error-icon",
                    name: "close-filled",
                    class: vue.normalizeClass([_ctx.$style.icon, _ctx.$style.icon_right, _ctx.$style.icon_error]),
                    size: _ctx.iconSize
                  }, null, 8, ["class", "size"]))
                : vue.createCommentVNode("", true),
              (_ctx.isSuccess)
                ? (vue.openBlock(), vue.createBlock(_component_svg_icon, {
                    key: 1,
                    "data-automation-id": "smed-base-input-success-icon",
                    name: "check-filled",
                    class: vue.normalizeClass([_ctx.$style.icon, _ctx.$style.icon_success, _ctx.$style.icon_right]),
                    size: _ctx.iconSize
                  }, null, 8, ["class", "size"]))
                : vue.createCommentVNode("", true),
              (_ctx.hasCleaner && _ctx.isValue)
                ? (vue.openBlock(), vue.createBlock(_component_svg_icon, {
                    key: 2,
                    "data-automation-id": "smed-base-input-cleaner-icon",
                    name: "close",
                    class: vue.normalizeClass([_ctx.$style.closeIcon, _ctx.$style.icon, _ctx.$style.icon_right]),
                    size: _ctx.iconSize,
                    onClick: vue.withModifiers(_ctx.clearSearch, ["stop","prevent"])
                  }, null, 8, ["class", "size", "onClick"]))
                : vue.createCommentVNode("", true),
              (_ctx.hasRightSlot)
                ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 3,
                    "data-automation-id": "smed-base-input-right-icon",
                    class: vue.normalizeClass(_ctx.$style.icon_right)
                  }, [
                    vue.renderSlot(_ctx.$slots, "right")
                  ], 2))
                : vue.createCommentVNode("", true)
            ], 2))
          : vue.createCommentVNode("", true)
      ], 2)
    ], 10, _hoisted_1))
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "._input_2ye4h_1 {\n  display: block;\n  cursor: inherit;\n}\n._input_readonly_2ye4h_5 {\n  cursor: default;\n}\n._wrapper_2ye4h_9 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--smed-base-09);\n  border-radius: 6px;\n  color: var(--smed-base-01);\n}\n._wrapper_hasBorder_2ye4h_17 {\n  border: 1px solid var(--smed-base-05);\n}\n._wrapper_sm_2ye4h_20 {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: 0px;\n  height: 32px;\n}\n._wrapper_md_2ye4h_27 {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  height: 44px;\n}\n._wrapper_lg_2ye4h_34 {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  height: 56px;\n}\n._wrapper_2ye4h_9:hover {\n  border-color: var(--smed-base-04);\n}\n._wrapper_2ye4h_9:focus, ._wrapper_2ye4h_9._focus_2ye4h_44 {\n  border-color: var(--smed-primary);\n}\n._wrapper_error_2ye4h_47 {\n  border-color: var(--smed-error);\n}\n._wrapper_error_2ye4h_47:hover, ._wrapper_error_2ye4h_47:focus, ._wrapper_error_2ye4h_47._focus_2ye4h_44 {\n  border-color: var(--smed-error);\n}\n._wrapper_disabled_2ye4h_53 {\n  opacity: 0.6;\n  pointer-events: none;\n}\n._nativeWrapper_2ye4h_58 {\n  position: relative;\n  display: inline-flex;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n._native_2ye4h_58 {\n  padding: 0;\n  border: 0;\n  border-radius: inherit;\n  background: none;\n  font-size: inherit;\n  line-height: inherit;\n  font-weight: inherit;\n  color: inherit;\n  caret-color: currentColor;\n  outline: none;\n  appearance: none;\n  word-break: keep-all;\n  -webkit-text-fill-color: currentColor;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  cursor: inherit;\n}\n._native_2ye4h_58:-webkit-autofill, ._native_2ye4h_58:-webkit-autofill:hover, ._native_2ye4h_58:-webkit-autofill:focus {\n  border-radius: inherit;\n  -webkit-text-fill-color: inherit !important;\n  color: inherit !important;\n  background-color: transparent !important;\n  -webkit-box-shadow: 0 0 0 1000px var(--smed-base-09) 5c0 inset !important;\n}\n._native_template_2ye4h_97 {\n  user-select: none;\n  pointer-events: none;\n}\n._native_hidden_2ye4h_101 {\n  opacity: 0;\n}\n._wrapper_sm_2ye4h_20 ._native_2ye4h_58 {\n  padding: 6px 8px;\n}\n._wrapper_md_2ye4h_27 ._native_2ye4h_58 {\n  padding: 10px 12px;\n}\n._wrapper_lg_2ye4h_34 ._native_2ye4h_58 {\n  padding: 16px;\n}\n._input_readonly_2ye4h_5 ._native_2ye4h_58 {\n  cursor: default;\n}\n._native_notEditable_2ye4h_116 {\n  text-overflow: ellipsis;\n}\n._native_disabled_2ye4h_119 {\n  cursor: default;\n}\n._label_2ye4h_123 {\n  display: inline-block;\n  color: var(--smed-base-03);\n  margin-bottom: 4px;\n}\n._iconsLeft_2ye4h_129 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n._wrapper_sm_2ye4h_20 ._iconsLeft_2ye4h_129 {\n  padding: 6px 0 6px 8px;\n}\n._wrapper_md_2ye4h_27 ._iconsLeft_2ye4h_129 {\n  padding: 10px 0 10px 12px;\n}\n._wrapper_lg_2ye4h_34 ._iconsLeft_2ye4h_129 {\n  padding: 16px 0 16px 16px;\n}\n._icon_2ye4h_129 {\n  color: var(--smed-base-05);\n}\n._icon_left_2ye4h_147 {\n  flex-shrink: 0;\n}\n._icon_right_2ye4h_150 {\n  display: flex;\n}\n._icon_right_2ye4h_150:not(:last-child) {\n  margin-right: 8px;\n}\n._icon_error_2ye4h_156 {\n  color: var(--smed-error);\n}\n._icon_success_2ye4h_159 {\n  color: var(--smed-success);\n}\n._iconsRight_2ye4h_163 {\n  display: flex;\n  align-items: center;\n  height: 100%;\n  flex-shrink: 0;\n}\n._wrapper_sm_2ye4h_20 ._iconsRight_2ye4h_163 {\n  padding: 6px 8px 6px 0;\n}\n._wrapper_md_2ye4h_27 ._iconsRight_2ye4h_163 {\n  padding: 10px 12px 10px 0;\n}\n._wrapper_lg_2ye4h_34 ._iconsRight_2ye4h_163 {\n  padding: 16px;\n  padding-left: 0;\n}\n._error_2ye4h_180 {\n  border-color: var(--smed-error) !important;\n}\n._closeIcon_2ye4h_184 {\n  cursor: pointer;\n  flex-shrink: 0;\n  color: var(--smed-base-05);\n}\n._closeIcon_2ye4h_184:hover {\n  color: var(--smed-base-04);\n}\n._closeIcon_2ye4h_184:active {\n  color: var(--smed-base-03);\n}";
  styleInject(css_248z);

  var style0 = {"input":"_input_2ye4h_1","input_readonly":"_input_readonly_2ye4h_5","wrapper":"_wrapper_2ye4h_9","wrapper_hasBorder":"_wrapper_hasBorder_2ye4h_17","wrapper_sm":"_wrapper_sm_2ye4h_20","wrapper_md":"_wrapper_md_2ye4h_27","wrapper_lg":"_wrapper_lg_2ye4h_34","focus":"_focus_2ye4h_44","wrapper_error":"_wrapper_error_2ye4h_47","wrapper_disabled":"_wrapper_disabled_2ye4h_53","nativeWrapper":"_nativeWrapper_2ye4h_58","native":"_native_2ye4h_58","native_template":"_native_template_2ye4h_97","native_hidden":"_native_hidden_2ye4h_101","native_notEditable":"_native_notEditable_2ye4h_116","native_disabled":"_native_disabled_2ye4h_119","label":"_label_2ye4h_123","iconsLeft":"_iconsLeft_2ye4h_129","icon":"_icon_2ye4h_129","icon_left":"_icon_left_2ye4h_147","icon_right":"_icon_right_2ye4h_150","icon_error":"_icon_error_2ye4h_156","icon_success":"_icon_success_2ye4h_159","iconsRight":"_iconsRight_2ye4h_163","error":"_error_2ye4h_180","closeIcon":"_closeIcon_2ye4h_184"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(Vue, smartmed.MaskedInput, smartmed.application, smartmed.domain, SvgIcon);
