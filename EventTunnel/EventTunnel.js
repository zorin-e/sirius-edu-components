this.smartmed = this.smartmed || {};
this.smartmed.EventTunnel = (function (vue, domain, tokens) {
  'use strict';

  var script = vue.defineComponent({
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
          const { duration, preventOntouch, eventsCount } = vue.toRefs(props);
          const durationEvents = vue.ref([duration.value, 0]);
          const progressEvents = vue.ref(0);
          const eventsInterval = vue.ref(null);
          const progressInterval = vue.ref(null);
          const host = vue.ref(null);
          const startEmits = () => {
              let count = 0;
              eventsInterval.value = setInterval(() => {
                  durationEvents.value = [duration.value, durationEvents.value[1] + 1];
                  count = 0;
              }, duration.value);
              progressInterval.value = setInterval(() => {
                  count += 1;
                  progressEvents.value = domain.clamp(count / eventsCount.value, 0, 1);
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
          vue.onMounted(() => {
              startEmits();
              if (preventOntouch.value && host.value) {
                  host.value.addEventListener("mouseenter", preventEmits);
                  host.value.addEventListener("touchstart", preventEmits);
                  host.value.addEventListener("touchend", initEmits);
                  host.value.addEventListener("mouseleave", initEmits);
              }
          });
          vue.onUnmounted(() => {
              stopEmits();
              if (preventOntouch.value && host.value) {
                  host.value.removeEventListener("mouseenter", preventEmits);
                  host.value.removeEventListener("touchstart", preventEmits);
                  host.value.removeEventListener("touchend", initEmits);
                  host.value.removeEventListener("mouseleave", initEmits);
              }
          });
          vue.watch(duration, (value) => {
              stopEmits();
              if (value) {
                  startEmits();
              }
          });
          vue.provide(tokens.EVENT_TUNNEL_TOKEN, vue.readonly(durationEvents));
          vue.provide(tokens.EVENT_TUNNEL_PROGRESS_TOKEN, vue.readonly(progressEvents));
          return {
              host,
          };
      },
  });

  const _hoisted_1 = { ref: "host" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 512))
  }

  script.render = render;

  return script;

})(Vue, smartmed.domain, smartmed.tokens);
