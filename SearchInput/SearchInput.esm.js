import { defineComponent, toRefs, computed, resolveComponent, openBlock, createBlock, mergeProps, withCtx, createVNode, renderSlot, createCommentVNode } from 'vue';
import BaseInput from '@smartmed/webpatient-vue-components/BaseInput';
import SvgIcon from '@smartmed/webpatient-vue-components/SvgIcon';
import { hasSlotContent } from '@smartmed/webpatient-vue-components/domain';

var script = defineComponent({
    inheritAttrs: false,
    components: {
        BaseInput,
        SvgIcon,
    },
    props: { size: String },
    name: "SearchInput",
    setup(props, { slots }) {
        const { size } = toRefs(props);
        const hasRightSlot = computed(() => slots.right && hasSlotContent(slots.right));
        const hasValueContentSlot = computed(() => slots.valueContent && hasSlotContent(slots.valueContent));
        const iconSize = computed(() => {
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
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_base_input = resolveComponent("base-input");

  return (openBlock(), createBlock(_component_base_input, mergeProps(_ctx.$attrs, {
    "has-cleaner": "",
    size: _ctx.size
  }), {
    left: withCtx(() => [
      createVNode(_component_svg_icon, {
        name: "search",
        size: _ctx.iconSize
      }, null, 8, ["size"])
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
  }, 16, ["size"]))
}

script.render = render;

export { script as default };
