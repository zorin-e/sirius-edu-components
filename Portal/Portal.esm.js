import { defineComponent, openBlock, createBlock, Teleport, renderSlot } from 'vue';

var script = defineComponent({
    props: {
        appendTo: {
            type: String,
            default: "body",
        },
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Teleport, { to: _ctx.appendTo }, [
    renderSlot(_ctx.$slots, "default")
  ], 8, ["to"]))
}

script.render = render;

export { script as default };
