'use strict';

var vue = require('vue');
var BaseInput = require('@smartmed/webpatient-vue-components/BaseInput');
var DropdownHost = require('@smartmed/webpatient-vue-components/DropdownHost');
var SvgIcon = require('@smartmed/webpatient-vue-components/SvgIcon');
var tokens = require('@smartmed/webpatient-vue-components/tokens');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseInput__default = /*#__PURE__*/_interopDefaultLegacy(BaseInput);
var DropdownHost__default = /*#__PURE__*/_interopDefaultLegacy(DropdownHost);
var SvgIcon__default = /*#__PURE__*/_interopDefaultLegacy(SvgIcon);

var script = vue.defineComponent({
    inheritAttrs: false,
    components: {
        BaseInput: BaseInput__default["default"],
        DropdownHost: DropdownHost__default["default"],
        SvgIcon: SvgIcon__default["default"],
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
        const { modelValue, items } = vue.toRefs(props);
        const opened = vue.ref(false);
        const baseInput = vue.ref(null);
        const controlAccessor = vue.inject(tokens.CONTROL_ACCESSOR_TOKEN, null);
        if (controlAccessor) {
            vue.provide(tokens.CONTROL_ACCESSOR_TOKEN, null);
        }
        const defaultComparsion = (search, item) => {
            const first = props.stringify(search);
            const second = props.stringify(item);
            return first === second;
        };
        const matchedValue = vue.computed(() => {
            if (!items.value) {
                return null;
            }
            const matcher = props.matcher || defaultComparsion;
            return items.value.find((item) => matcher(modelValue.value, item));
        });
        const filteredItems = vue.computed(() => {
            if (items.value === null) {
                return null;
            }
            if (matchedValue.value) {
                return items.value;
            }
            const filter = props.itemsFilter || defaultComparsion;
            return items.value.filter((item) => filter(modelValue.value, item));
        });
        const isValue = vue.computed(() => modelValue.value !== null && String(modelValue.value).length > 0);
        vue.watch(opened, (value) => {
            if (!value && controlAccessor) {
                controlAccessor.markAsTouch();
            }
        });
        vue.watch(modelValue, () => {
            if (!opened.value && isValue.value && !matchedValue.value) {
                show();
            }
        });
        vue.watch(matchedValue, (value) => {
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
  const _component_svg_icon = vue.resolveComponent("svg-icon");
  const _component_base_input = vue.resolveComponent("base-input");
  const _component_dropdown_host = vue.resolveComponent("dropdown-host");

  return (vue.openBlock(), vue.createBlock(_component_dropdown_host, {
    modelValue: _ctx.opened,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.opened) = $event)),
    class: vue.normalizeClass(_ctx.$style.host),
    align: _ctx.align,
    "can-open": !_ctx.disabled,
    direction: _ctx.direction,
    "max-height": _ctx.maxHeight,
    "max-width": _ctx.maxWidth,
    "min-height": _ctx.minHeight,
    onKeyup: vue.withKeys(_ctx.onKeyupEnter, ["enter"])
  }, {
    dropdown: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "dropdown", { items: _ctx.filteredItems })
    ]),
    default: vue.withCtx(() => [
      vue.createVNode(_component_base_input, vue.mergeProps(_ctx.$attrs, {
        "has-cleaner": "",
        ref: "baseInput",
        disabled: _ctx.disabled,
        "model-value": _ctx.modelValue,
        stringify: _ctx.stringify,
        onSearchClear: _cache[1] || (_cache[1] = $event => (_ctx.$emit('update:modelValue', null)))
      }), vue.createSlots({
        right: vue.withCtx(() => [
          vue.createVNode(_component_svg_icon, {
            name: "arrow-down",
            class: vue.normalizeClass([_ctx.$style.icon, _ctx.opened && _ctx.$style.icon_rotated]),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {}, ["stop"]))
          }, null, 8, ["class"])
        ]),
        valueContent: vue.withCtx(() => [
          (_ctx.$slots.valueContent)
            ? vue.renderSlot(_ctx.$slots, "valueContent", {
                key: 0,
                value: _ctx.modelValue
              })
            : vue.createCommentVNode("", true)
        ]),
        _: 2
      }, [
        (_ctx.$slots.left)
          ? {
              name: "left",
              fn: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "left")
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

module.exports = script;
