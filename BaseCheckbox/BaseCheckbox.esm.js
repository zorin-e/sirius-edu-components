import { defineComponent, toRefs, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createVNode, renderSlot, createTextVNode, toDisplayString, createCommentVNode } from 'vue';
import { useInteractive } from '@smartmed/webpatient-vue-components/application';
import SvgIcon from '@smartmed/webpatient-vue-components/SvgIcon';

var script = defineComponent({
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
            validator: (value) => {
                return ["sm", "md", "lg"].includes(value);
            },
        },
        icon: {
            type: String,
            default: "check",
            validator: (value) => {
                return ["check", "minus"].includes(value);
            },
        },
        isError: [Boolean, String],
    },
    components: {
        SvgIcon,
    },
    setup(props) {
        toRefs(props);
        const interactive = useInteractive();
        return {
            id: interactive.id,
            native: interactive.native,
            focus: interactive.focus,
            blur: interactive.blur,
        };
    },
});

const _hoisted_1 = ["disabled", "for"];
const _hoisted_2 = ["id", "checked", "disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");

  return (openBlock(), createElementBlock("label", {
    class: normalizeClass(_ctx.$style.checkbox),
    disabled: _ctx.disabled,
    for: _ctx.id
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.$style.wrapper)
    }, [
      createElementVNode("input", {
        ref: "native",
        type: "checkbox",
        class: normalizeClass(_ctx.$style.input),
        id: _ctx.id,
        checked: _ctx.modelValue,
        disabled: _ctx.disabled,
        onChange: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', $event.target.checked)))
      }, null, 42, _hoisted_2),
      createElementVNode("div", {
        class: normalizeClass([
          _ctx.$style.icon,
          _ctx.$style[_ctx.size],
          _ctx.disabled && _ctx.$style.disabled,
          _ctx.isError && _ctx.$style.error,
        ])
      }, [
        createVNode(_component_svg_icon, {
          size: _ctx.size,
          name: _ctx.icon,
          class: normalizeClass(_ctx.$style.iconComponent)
        }, null, 8, ["size", "name", "class"])
      ], 2),
      (_ctx.$slots.default)
        ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass([_ctx.$style.text, _ctx.$style['text_' + _ctx.size]])
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.label), 1)
            ])
          ], 2))
        : createCommentVNode("", true)
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

var css_248z = "._checkbox_1n4wc_1 {\n  overflow: hidden;\n  display: inline-block;\n  cursor: pointer;\n}\n._wrapper_1n4wc_7 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n._icon_1n4wc_13 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  align-self: flex-start;\n  flex-shrink: 0;\n  border: 2px solid var(--smed-base-05);\n  color: var(--smed-base-09);\n}\n._iconComponent_1n4wc_24 {\n  display: inline-flex;\n  opacity: 0;\n}\n._input_1n4wc_29 {\n  clip: rect(1px, 1px, 1px, 1px);\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n  height: 1px;\n}\n._input_1n4wc_29:focus ~ ._icon_1n4wc_13 {\n  border-color: var(--smed-base-03);\n}\n._input_1n4wc_29:enabled ~ ._icon_1n4wc_13:hover {\n  border-color: var(--smed-base-04);\n}\n._input_1n4wc_29:enabled ~ ._icon_1n4wc_13:active {\n  border-color: var(--smed-base-03);\n}\n._input_1n4wc_29:checked ~ ._icon_1n4wc_13 {\n  background-color: var(--smed-primary);\n  border: 0;\n}\n._input_1n4wc_29:checked ~ ._icon_1n4wc_13:hover {\n  background-color: var(--smed-primary-hover);\n}\n._input_1n4wc_29:checked ~ ._icon_1n4wc_13:active {\n  background-color: var(--smed-primary-active);\n}\n._input_1n4wc_29:checked ~ ._icon_1n4wc_13 ._iconComponent_1n4wc_24 {\n  opacity: 1;\n}\n._input_1n4wc_29:checked:disabled ~ ._icon_1n4wc_13 {\n  background-color: var(--smed-base-05);\n}\n._input_1n4wc_29:checked:focus ~ ._icon_1n4wc_13 {\n  background-color: var(--smed-primary-active);\n}\n._sm_1n4wc_65 {\n  width: 16px;\n  height: 16px;\n  border-radius: 3px;\n}\n._md_1n4wc_71 {\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n}\n._lg_1n4wc_77 {\n  width: 24px;\n  height: 24px;\n  border-radius: 5px;\n}\n._disabled_1n4wc_83 {\n  background-color: var(--smed-base-08);\n  border-color: var(--smed-base-06);\n  cursor: default;\n}\n._error_1n4wc_89 {\n  border-color: var(--smed-error);\n}\n._text_1n4wc_93 {\n  color: var(--smed-base-03);\n}\n._text_sm_1n4wc_96 {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  letter-spacing: 0px;\n  margin-left: 8px;\n}\n._text_md_1n4wc_103 {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: 0px;\n  margin-left: 12px;\n}\n._text_lg_1n4wc_110 {\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  margin-left: 16px;\n}";
styleInject(css_248z);

var style0 = {"checkbox":"_checkbox_1n4wc_1","wrapper":"_wrapper_1n4wc_7","icon":"_icon_1n4wc_13","iconComponent":"_iconComponent_1n4wc_24","input":"_input_1n4wc_29","sm":"_sm_1n4wc_65","md":"_md_1n4wc_71","lg":"_lg_1n4wc_77","disabled":"_disabled_1n4wc_83","error":"_error_1n4wc_89","text":"_text_1n4wc_93","text_sm":"_text_sm_1n4wc_96","text_md":"_text_md_1n4wc_103","text_lg":"_text_lg_1n4wc_110"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
