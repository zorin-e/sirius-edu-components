<template>
  <div ref="rootElement" :class="$style.root" :style="rootStyles">
    <div
      :class="[$style.content, linesLimit === 1 && $style.content_ellipsis]"
      :style="contentStyles"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  name: "LineClamp",
  props: {
    lineHeight: {
      type: Number,
      required: true,
    },
    linesLimit: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { lineHeight, linesLimit } = toRefs(props);
    const rootElement = ref<HTMLElement | null>(null);

    const rootStyles = computed(() => {
      if (!rootElement.value) {
        return {};
      }

      return {
        height: `${rootElement.value.scrollHeight + 4}px`,
        "max-height": `${lineHeight.value * linesLimit.value}px`,
      };
    });

    const contentStyles = computed(() => {
      return {
        "-webkit-line-clamp": linesLimit.value,
      };
    });

    return {
      rootElement,
      rootStyles,
      contentStyles,
    };
  },
});
</script>

<style lang="scss" module>
.root {
  position: relative;
  display: block;
  overflow: hidden;
}

.content {
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;

  &_ellipsis {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
