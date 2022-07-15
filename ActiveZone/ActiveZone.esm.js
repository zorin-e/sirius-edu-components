import { ACTIVE_ELEMENT_TOKEN } from '@smartmed/webpatient-vue-components/tokens';
import { defineComponent, ref, inject, watch, openBlock, createElementBlock, renderSlot } from 'vue';

var script = defineComponent({
    name: "ActiveZone",
    setup(_, { emit }) {
        const activeZone = ref(null);
        const focused = ref(false);
        const activeElement = inject(ACTIVE_ELEMENT_TOKEN, null);
        if (activeElement) {
            watch(activeElement, (element) => {
                if (!element) {
                    focused.value = false;
                    return;
                }
                if (activeZone.value) {
                    focused.value = activeZone.value.contains(element);
                }
            });
        }
        watch(focused, (value) => {
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
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ], 512))
}

script.render = render;

export { script as default };
