<template>
  <div ref="root" role="listitem">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  toRefs,
} from "vue";

export default defineComponent({
  name: "VirtualListItem",
  props: {
    horizontal: {
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const { horizontal } = toRefs(props);

    const root = ref<HTMLElement | null>(null);
    let resizeObserver: ResizeObserver | null = null;

    const shapeKey = computed(() =>
      horizontal.value ? "offsetWidth" : "offsetHeight"
    );

    onMounted(() => {
      if (typeof ResizeObserver !== "undefined" && root.value) {
        resizeObserver = new ResizeObserver(() => {
          dispatchSizeChange();
        });

        resizeObserver.observe(root.value);
      }
    });

    const dispatchSizeChange = () => {
      ctx.emit("item-resize", getCurrentSize());
    };

    const getCurrentSize = () => {
      return root.value ? root.value[shapeKey.value] : 0;
    };

    onUpdated(() => {
      dispatchSizeChange();
    });

    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    });

    return {
      root,
    };
  },
});
</script>
