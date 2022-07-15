'use strict';

var tokens = require('@smartmed/webpatient-vue-components/tokens');
var vue = require('vue');

var script = vue.defineComponent({
    name: "ActiveZone",
    setup(_, { emit }) {
        const activeZone = vue.ref(null);
        const focused = vue.ref(false);
        const activeElement = vue.inject(tokens.ACTIVE_ELEMENT_TOKEN, null);
        if (activeElement) {
            vue.watch(activeElement, (element) => {
                if (!element) {
                    focused.value = false;
                    return;
                }
                if (activeZone.value) {
                    focused.value = activeZone.value.contains(element);
                }
            });
        }
        vue.watch(focused, (value) => {
            emit("active-zone-changed", value);
        });
        return {
            activeZone,
            focused,
        };
    },
});

const _hoisted_1 = { ref: "activeZone" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512))
}

script.render = render;

module.exports = script;
