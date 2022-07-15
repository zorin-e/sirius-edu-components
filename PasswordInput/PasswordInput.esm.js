import { defineComponent, toRefs, ref, computed, resolveComponent, openBlock, createBlock, mergeProps, withCtx, createVNode, normalizeClass } from 'vue';
import BaseInput from '@smartmed/webpatient-vue-components/BaseInput';
import SvgIcon from '@smartmed/webpatient-vue-components/SvgIcon';

var script = defineComponent({
    inheritAttrs: false,
    components: {
        BaseInput,
        SvgIcon,
    },
    name: "PassowrdInput",
    props: {
        modelValue: {
            type: [String, null],
            required: true,
        },
        size: String,
    },
    setup(props) {
        const { size } = toRefs(props);
        const showPassword = ref(false);
        const toggleShowPassword = () => {
            showPassword.value = !showPassword.value;
        };
        const iconSize = computed(() => {
            return size.value === "sm" ? "md" : "lg";
        });
        return {
            showPassword,
            toggleShowPassword,
            iconSize,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_base_input = resolveComponent("base-input");

  return (openBlock(), createBlock(_component_base_input, mergeProps(_ctx.$attrs, {
    name: "password",
    autocomplete: "on",
    type: _ctx.showPassword ? 'text' : 'password',
    modelValue: _ctx.modelValue,
    size: _ctx.size,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', $event)))
  }), {
    right: withCtx(() => [
      createVNode(_component_svg_icon, {
        class: normalizeClass(_ctx.$style.icon),
        name: _ctx.showPassword ? 'see' : 'unsee',
        size: _ctx.iconSize,
        onClick: _ctx.toggleShowPassword
      }, null, 8, ["class", "name", "size", "onClick"])
    ]),
    _: 1
  }, 16, ["type", "modelValue", "size"]))
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

var css_248z = "._icon_1ajw8_1 {\n  color: var(--smed-base-05);\n  cursor: pointer;\n}\n._icon_1ajw8_1:hover {\n  color: var(--smed-base-04);\n}\n._icon_1ajw8_1:active {\n  color: var(--smed-base-03);\n}";
styleInject(css_248z);

var style0 = {"icon":"_icon_1ajw8_1"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
