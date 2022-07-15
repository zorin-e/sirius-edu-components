import { defineComponent, computed, resolveComponent, openBlock, createBlock, mergeProps, withCtx, renderSlot, createCommentVNode } from 'vue';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import BaseInput from '@smartmed/webpatient-vue-components/BaseInput';
import { hasSlotContent } from '@smartmed/webpatient-vue-components/domain';

var script = defineComponent({
    inheritAttrs: false,
    components: {
        BaseInput,
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
        const hasLeftSlot = computed(() => slots.left && hasSlotContent(slots.left));
        const hasValueContentSlot = computed(() => slots.left && hasSlotContent(slots.valueContent));
        const hasRightSlot = computed(() => slots.left && hasSlotContent(slots.right));
        return {
            emitValue,
            hasLeftSlot,
            hasValueContentSlot,
            hasRightSlot,
            maskOptions: {
                mask: createNumberMask({
                    prefix: "",
                    includeThousandsSeparator: false,
                }),
                guide: false,
            },
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_base_input = resolveComponent("base-input");

  return (openBlock(), createBlock(_component_base_input, mergeProps(_ctx.$attrs, {
    type: "text",
    modelValue: _ctx.modelValue,
    "mask-options": _ctx.maskOptions,
    "onUpdate:modelValue": _ctx.emitValue
  }), {
    left: withCtx(() => [
      (_ctx.hasLeftSlot)
        ? renderSlot(_ctx.$slots, "left", { key: 0 })
        : createCommentVNode("", true)
    ]),
    valueContent: withCtx(() => [
      (_ctx.hasValueContentSlot)
        ? renderSlot(_ctx.$slots, "valueContent", { key: 0 })
        : createCommentVNode("", true)
    ]),
    right: withCtx(() => [
      (_ctx.hasRightSlot)
        ? renderSlot(_ctx.$slots, "right", { key: 0 })
        : createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["modelValue", "mask-options", "onUpdate:modelValue"]))
}

script.render = render;

export { script as default };
