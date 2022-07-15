import { defineComponent, toRefs, ref, inject, provide, watch, computed, resolveComponent, openBlock, createBlock, mergeProps, withCtx, renderSlot, createVNode, normalizeClass, withModifiers, createCommentVNode } from 'vue';
import DropdownHost from '@smartmed/webpatient-vue-components/DropdownHost';
import BaseInput from '@smartmed/webpatient-vue-components/BaseInput';
import SvgIcon from '@smartmed/webpatient-vue-components/SvgIcon';
import { CONTROL_ACCESSOR_TOKEN } from '@smartmed/webpatient-vue-components/tokens';

var script = defineComponent({
    inheritAttrs: false,
    components: { DropdownHost, BaseInput, SvgIcon },
    name: "BaseSelect",
    props: {
        modelValue: {
            type: [String, Number, Object, null],
            required: true,
        },
        items: {
            type: [Array, null],
            default: () => [],
        },
        minHeight: Number,
        maxHeight: Number,
        maxWidth: Number,
        align: String,
        direction: String,
        disabled: Boolean,
    },
    setup(props, { attrs }) {
        const { modelValue } = toRefs(props);
        const opened = ref(false);
        const controlAccessor = inject(CONTROL_ACCESSOR_TOKEN, null);
        if (controlAccessor) {
            provide(CONTROL_ACCESSOR_TOKEN, null);
        }
        watch(modelValue, () => {
            if (opened.value) {
                opened.value = false;
            }
        });
        watch(opened, (value) => {
            if (!value && controlAccessor) {
                controlAccessor.markAsTouch();
            }
        });
        const splittedStyleAndClassAttrs = computed(() => {
            const { style, class: classNames, ...otherAttrs } = attrs;
            return [
                {
                    style,
                    class: classNames,
                },
                otherAttrs,
            ];
        });
        return {
            opened,
            splittedStyleAndClassAttrs,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_base_input = resolveComponent("base-input");
  const _component_dropdown_host = resolveComponent("dropdown-host");

  return (openBlock(), createBlock(_component_dropdown_host, mergeProps(_ctx.splittedStyleAndClassAttrs[0], {
    modelValue: _ctx.opened,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.opened) = $event)),
    class: _ctx.$style.host,
    align: _ctx.align,
    "can-open": !_ctx.disabled,
    direction: _ctx.direction,
    "max-height": _ctx.maxHeight,
    "max-width": _ctx.maxWidth,
    "min-height": _ctx.minHeight
  }), {
    dropdown: withCtx(() => [
      renderSlot(_ctx.$slots, "dropdown", { items: _ctx.items })
    ]),
    default: withCtx(() => [
      createVNode(_component_base_input, mergeProps(_ctx.splittedStyleAndClassAttrs[1], {
        "model-value": _ctx.modelValue,
        class: [_ctx.$style.input, _ctx.disabled && _ctx.$style.input_disabled],
        editable: false,
        disabled: _ctx.disabled
      }), {
        right: withCtx(() => [
          createVNode(_component_svg_icon, {
            name: "arrow-down",
            class: normalizeClass([_ctx.$style.icon, _ctx.opened && _ctx.$style.icon_rotated]),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
          }, null, 8, ["class"])
        ]),
        valueContent: withCtx(() => [
          (_ctx.$slots.valueContent)
            ? renderSlot(_ctx.$slots, "valueContent", {
                key: 0,
                value: _ctx.modelValue
              })
            : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["model-value", "class", "disabled"])
    ]),
    _: 3
  }, 16, ["modelValue", "class", "align", "can-open", "direction", "max-height", "max-width", "min-height"]))
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

var css_248z = "._host_1xgcw_1 {\n  width: 100%;\n}\n._input_1xgcw_5 {\n  cursor: pointer;\n}\n._input_disabled_1xgcw_8 {\n  cursor: default;\n}\n._icon_1xgcw_12 {\n  transition: transform 0.2s linear;\n  display: flex;\n  align-items: center;\n  color: var(--smed-base-05);\n  cursor: pointer;\n}\n._icon_rotated_1xgcw_19 {\n  transform: rotate(180deg);\n}";
styleInject(css_248z);

var style0 = {"host":"_host_1xgcw_1","input":"_input_1xgcw_5","input_disabled":"_input_disabled_1xgcw_8","icon":"_icon_1xgcw_12","icon_rotated":"_icon_rotated_1xgcw_19"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
