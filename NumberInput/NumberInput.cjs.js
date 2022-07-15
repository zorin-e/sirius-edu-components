'use strict';

var vue = require('vue');
var createNumberMask = require('text-mask-addons/dist/createNumberMask');
var BaseInput = require('@smartmed/webpatient-vue-components/BaseInput');
var domain = require('@smartmed/webpatient-vue-components/domain');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var createNumberMask__default = /*#__PURE__*/_interopDefaultLegacy(createNumberMask);
var BaseInput__default = /*#__PURE__*/_interopDefaultLegacy(BaseInput);

var script = vue.defineComponent({
    inheritAttrs: false,
    components: {
        BaseInput: BaseInput__default["default"],
    },
    name: "NumberInput",
    props: {
        modelValue: {
            type: [Number, null],
            required: true,
        },
    },
    setup(_, { emit, slots }) {
        const emitValue = (value) => {
            emit("update:modelValue", value ? parseInt(value) : null);
        };
        const hasLeftSlot = vue.computed(() => slots.left && domain.hasSlotContent(slots.left));
        const hasValueContentSlot = vue.computed(() => slots.left && domain.hasSlotContent(slots.valueContent));
        const hasRightSlot = vue.computed(() => slots.left && domain.hasSlotContent(slots.right));
        return {
            emitValue,
            hasLeftSlot,
            hasValueContentSlot,
            hasRightSlot,
            maskOptions: {
                mask: createNumberMask__default["default"]({
                    prefix: "",
                    includeThousandsSeparator: false,
                }),
                guide: false,
            },
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_input = vue.resolveComponent("base-input");

  return (vue.openBlock(), vue.createBlock(_component_base_input, vue.mergeProps(_ctx.$attrs, {
    type: "text",
    modelValue: _ctx.modelValue,
    "mask-options": _ctx.maskOptions,
    "onUpdate:modelValue": _ctx.emitValue
  }), {
    left: vue.withCtx(() => [
      (_ctx.hasLeftSlot)
        ? vue.renderSlot(_ctx.$slots, "left", { key: 0 })
        : vue.createCommentVNode("", true)
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
  }, 16, ["modelValue", "mask-options", "onUpdate:modelValue"]))
}

script.render = render;

module.exports = script;
