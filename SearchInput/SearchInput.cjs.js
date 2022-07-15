'use strict';

var vue = require('vue');
var BaseInput = require('@smartmed/webpatient-vue-components/BaseInput');
var SvgIcon = require('@smartmed/webpatient-vue-components/SvgIcon');
var domain = require('@smartmed/webpatient-vue-components/domain');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseInput__default = /*#__PURE__*/_interopDefaultLegacy(BaseInput);
var SvgIcon__default = /*#__PURE__*/_interopDefaultLegacy(SvgIcon);

var script = vue.defineComponent({
    inheritAttrs: false,
    components: {
        BaseInput: BaseInput__default["default"],
        SvgIcon: SvgIcon__default["default"],
    },
    props: { size: String },
    name: "SearchInput",
    setup(props, { slots }) {
        const { size } = vue.toRefs(props);
        const hasRightSlot = vue.computed(() => slots.right && domain.hasSlotContent(slots.right));
        const hasValueContentSlot = vue.computed(() => slots.valueContent && domain.hasSlotContent(slots.valueContent));
        const iconSize = vue.computed(() => {
            return size.value === "sm" ? "md" : "lg";
        });
        return {
            hasRightSlot,
            hasValueContentSlot,
            iconSize,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = vue.resolveComponent("svg-icon");
  const _component_base_input = vue.resolveComponent("base-input");

  return (vue.openBlock(), vue.createBlock(_component_base_input, vue.mergeProps(_ctx.$attrs, {
    "has-cleaner": "",
    size: _ctx.size
  }), {
    left: vue.withCtx(() => [
      vue.createVNode(_component_svg_icon, {
        name: "search",
        size: _ctx.iconSize
      }, null, 8, ["size"])
    ]),
    valueContent: vue.withCtx(() => [
      (_ctx.hasValueContentSlot)
        ? vue.renderSlot(_ctx.$slots, "valueContent", { key: 0 })
        : vue.createCommentVNode("", true)
    ]),
    right: vue.withCtx(() => [
      (_ctx.hasRightSlot)
        ? vue.renderSlot(_ctx.$slots, "right", { key: 0 })
        : vue.createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["size"]))
}

script.render = render;

module.exports = script;
