import { defineComponent, toRefs, ref, onMounted, onUnmounted, watch, provide, readonly, openBlock, createElementBlock, renderSlot } from 'vue';
import { clamp } from '@smartmed/webpatient-vue-components/domain';
import { EVENT_TUNNEL_TOKEN, EVENT_TUNNEL_PROGRESS_TOKEN } from '@smartmed/webpatient-vue-components/tokens';

var script = defineComponent({
    props: {
        duration: {
            type: Number,
            required: true,
        },
        eventsCount: {
            type: Number,
            required: true,
        },
        preventOntouch: Boolean,
    },
    name: "EventTunnel",
    setup(props) {
        const { duration, preventOntouch, eventsCount } = toRefs(props);
        const durationEvents = ref([duration.value, 0]);
        const progressEvents = ref(0);
        const eventsInterval = ref(null);
        const progressInterval = ref(null);
        const host = ref(null);
        const startEmits = () => {
            let count = 0;
            eventsInterval.value = setInterval(() => {
                durationEvents.value = [duration.value, durationEvents.value[1] + 1];
                count = 0;
            }, duration.value);
            progressInterval.value = setInterval(() => {
                count += 1;
                progressEvents.value = clamp(count / eventsCount.value, 0, 1);
            }, duration.value / eventsCount.value);
        };
        const stopEmits = () => {
            if (eventsInterval.value) {
                clearInterval(eventsInterval.value);
            }
            if (progressInterval.value) {
                clearInterval(progressInterval.value);
                progressEvents.value = 1;
            }
        };
        const preventEmits = () => stopEmits();
        const initEmits = () => {
            stopEmits();
            startEmits();
        };
        onMounted(() => {
            startEmits();
            if (preventOntouch.value && host.value) {
                host.value.addEventListener("mouseenter", preventEmits);
                host.value.addEventListener("touchstart", preventEmits);
                host.value.addEventListener("touchend", initEmits);
                host.value.addEventListener("mouseleave", initEmits);
            }
        });
        onUnmounted(() => {
            stopEmits();
            if (preventOntouch.value && host.value) {
                host.value.removeEventListener("mouseenter", preventEmits);
                host.value.removeEventListener("touchstart", preventEmits);
                host.value.removeEventListener("touchend", initEmits);
                host.value.removeEventListener("mouseleave", initEmits);
            }
        });
        watch(duration, (value) => {
            stopEmits();
            if (value) {
                startEmits();
            }
        });
        provide(EVENT_TUNNEL_TOKEN, readonly(durationEvents));
        provide(EVENT_TUNNEL_PROGRESS_TOKEN, readonly(progressEvents));
        return {
            host,
        };
    },
});

const _hoisted_1 = { ref: "host" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ], 512))
}

script.render = render;

export { script as default };
