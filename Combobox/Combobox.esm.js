import { defineComponent, toRefs, ref, inject, provide, computed, watch, resolveComponent, openBlock, createBlock, normalizeClass, withKeys, withCtx, renderSlot, createVNode, mergeProps, createSlots, withModifiers, createCommentVNode } from 'vue';
import BaseInput from '@smartmed/webpatient-vue-components/BaseInput';
import DropdownHost from '@smartmed/webpatient-vue-components/DropdownHost';
import SvgIcon from '@smartmed/webpatient-vue-components/SvgIcon';
import { CONTROL_ACCESSOR_TOKEN } from '@smartmed/webpatient-vue-components/tokens';

var script = defineComponent({
    inheritAttrs: false,
    components: {
        BaseInput,
        DropdownHost,
        SvgIcon,
    },
    name: "Combobox",
    props: {
        modelValue: {
            type: [String, Number, Object, null],
            required: true,
        },
        items: {
            type: [Array, null],
            default: () => [],
        },
        stringify: {
            type: Function,
            default: (item) => item,
        },
        disabled: Boolean,
        matcher: Function,
        itemsFilter: Function,
        minHeight: Number,
        maxHeight: Number,
        maxWidth: Number,
        align: String,
        direction: String,
    },
    setup(props, { emit }) {
        const { modelValue, items } = toRefs(props);
        const opened = ref(false);
        const baseInput = ref(null);
        const controlAccessor = inject(CONTROL_ACCESSOR_TOKEN, null);
        if (controlAccessor) {
            provide(CONTROL_ACCESSOR_TOKEN, null);
        }
        const defaultComparsion = (search, item) => {
            const first = props.stringify(search);
            const second = props.stringify(item);
            return first === second;
        };
        const matchedValue = computed(() => {
            if (!items.value) {
                return null;
            }
            const matcher = props.matcher || defaultComparsion;
            return items.value.find((item) => matcher(modelValue.value, item));
        });
        const filteredItems = computed(() => {
            if (items.value === null) {
                return null;
            }
            if (matchedValue.value) {
                return items.value;
            }
            const filter = props.itemsFilter || defaultComparsion;
            return items.value.filter((item) => filter(modelValue.value, item));
        });
        const isValue = computed(() => modelValue.value !== null && String(modelValue.value).length > 0);
        watch(opened, (value) => {
            if (!value && controlAccessor) {
                controlAccessor.markAsTouch();
            }
        });
        watch(modelValue, () => {
            if (!opened.value && isValue.value && !matchedValue.value) {
                show();
            }
        });
        watch(matchedValue, (value) => {
            if (!value) {
                return;
            }
            hide();
            if (baseInput.value) {
                baseInput.value.focus();
            }
        });
        const show = () => {
            opened.value = true;
        };
        const hide = () => {
            opened.value = false;
        };
        const onKeyupEnter = (event) => {
            if (opened.value) {
                event.preventDefault();
            }
            const items = filteredItems.value;
            if (!items || items.length !== 1) {
                return;
            }
            emit("update:modelValue", items[0]);
        };
        return {
            hide,
            opened,
            filteredItems,
            baseInput,
            onKeyupEnter,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_base_input = resolveComponent("base-input");
  const _component_dropdown_host = resolveComponent("dropdown-host");

  return (openBlock(), createBlock(_component_dropdown_host, {
    modelValue: _ctx.opened,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.opened) = $event)),
    class: normalizeClass(_ctx.$style.host),
    align: _ctx.align,
    "can-open": !_ctx.disabled,
    direction: _ctx.direction,
    "max-height": _ctx.maxHeight,
    "max-width": _ctx.maxWidth,
    "min-height": _ctx.minHeight,
    onKeyup: withKeys(_ctx.onKeyupEnter, ["enter"])
  }, {
    dropdown: withCtx(() => [
      renderSlot(_ctx.$slots, "dropdown", { items: _ctx.filteredItems })
    ]),
    default: withCtx(() => [
      createVNode(_component_base_input, mergeProps(_ctx.$attrs, {
        "has-cleaner": "",
        ref: "baseInput",
        disabled: _ctx.disabled,
        "model-value": _ctx.modelValue,
        stringify: _ctx.stringify,
        onSearchClear: _cache[1] || (_cache[1] = $event => (_ctx.$emit('update:modelValue', null)))
      }), createSlots({
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
        _: 2
      }, [
        (_ctx.$slots.left)
          ? {
              name: "left",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "left")
              ])
            }
          : undefined
      ]), 1040, ["disabled", "model-value", "stringify"])
    ]),
    _: 3
  }, 8, ["modelValue", "class", "align", "can-open", "direction", "max-height", "max-width", "min-height", "onKeyup"]))
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

var css_248z = "._host_1cv49_1 {\n  width: 100%;\n}\n._icon_1cv49_5 {\n  transition: transform 0.2s linear;\n  color: var(--smed-base-05);\n  cursor: pointer;\n}\n._icon_rotated_1cv49_10 {\n  transform: rotate(180deg);\n}";
styleInject(css_248z);

var style0 = {"host":"_host_1cv49_1","icon":"_icon_1cv49_5","icon_rotated":"_icon_rotated_1cv49_10"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
