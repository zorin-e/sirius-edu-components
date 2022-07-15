'use strict';

var vue = require('vue');
var application = require('@smartmed/webpatient-vue-components/application');

var script = vue.defineComponent({
    name: "BaseTextarea",
    emits: ["update:modelValue"],
    props: {
        label: {
            type: String,
            default: "",
        },
        modelValue: {
            type: [String, Number, null],
            required: true,
        },
        modelModifiers: {
            type: Object,
            default: () => ({}),
        },
        indentRight: {
            type: Number,
        },
        isError: Boolean,
        disabled: Boolean,
    },
    setup(props, { emit }) {
        const { modelModifiers, disabled, indentRight } = vue.toRefs(props);
        const modifiers = application.useModelModifiers(modelModifiers.value);
        const interactive = application.useInteractive();
        const emitValue = (value) => {
            if (disabled.value) {
                return;
            }
            emit("update:modelValue", modifiers.modify(value));
        };
        const style = vue.ref({
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

const _hoisted_1 = ["for"];
const _hoisted_2 = ["disabled", "id", "value"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("label", {
    class: vue.normalizeClass(_ctx.$style.textarea),
    for: _ctx.id
  }, [
    (!!_ctx.label)
      ? (vue.openBlock(), vue.createElementBlock("span", {
          key: 0,
          class: vue.normalizeClass([_ctx.$style.label, 'smed-text_body-sm'])
        }, vue.toDisplayString(_ctx.label), 3))
      : vue.createCommentVNode("", true),
    vue.createElementVNode("textarea", {
      ref: "native",
      class: vue.normalizeClass([
        _ctx.$style.wrapper,
        'smed-text_body-xl',
        _ctx.isError && _ctx.$style.wrapper_error,
        _ctx.disabled && _ctx.$style.wrapper_disabled,
        _ctx.focused && _ctx.$style.focus,
      ]),
      style: vue.normalizeStyle(_ctx.style),
      disabled: _ctx.disabled,
      id: _ctx.id,
      value: _ctx.modelValue,
      onInput: _cache[0] || (_cache[0] = $event => (_ctx.emitValue($event.target.value)))
    }, "\n    ", 46, _hoisted_2)
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

var css_248z = "._wrapper_pdou5_1 {\n  -webkit-overflow-scrolling: touch;\n  scroll-behavior: smooth;\n  scrollbar-width: none;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  outline: none;\n  resize: none;\n  width: 100%;\n  height: 88px;\n  background: var(--smed-base-09);\n  border: 1px solid var(--smed-base-05);\n  border-radius: 6px;\n  color: var(--smed-base-01);\n  padding: 10px 12px;\n}\n._wrapper_pdou5_1::-webkit-scrollbar {\n  display: none;\n}\n._wrapper_pdou5_1:hover {\n  border-color: var(--smed-base-04);\n}\n._wrapper_pdou5_1:focus, ._wrapper_pdou5_1._focus_pdou5_25 {\n  border-color: var(--smed-primary);\n}\n._wrapper_error_pdou5_28 {\n  border-color: var(--smed-error);\n}\n._wrapper_error_pdou5_28:hover, ._wrapper_error_pdou5_28:focus, ._wrapper_error_pdou5_28._focus_pdou5_25 {\n  border-color: var(--smed-error);\n}\n._wrapper_disabled_pdou5_34 {\n  opacity: 0.6;\n  pointer-events: none;\n}\n._label_pdou5_39 {\n  display: inline-block;\n  margin-bottom: 4px;\n  color: var(--smed-base-03);\n}";
styleInject(css_248z);

var style0 = {"wrapper":"_wrapper_pdou5_1","focus":"_focus_pdou5_25","wrapper_error":"_wrapper_error_pdou5_28","wrapper_disabled":"_wrapper_disabled_pdou5_34","label":"_label_pdou5_39"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
