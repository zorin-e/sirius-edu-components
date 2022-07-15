'use strict';

var vue = require('vue');

var script = vue.defineComponent({
    props: {
        appendTo: {
            type: String,
            default: "body",
        },
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Teleport, { to: _ctx.appendTo }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 8, ["to"]))
}

script.render = render;

module.exports = script;
