<template>
  <div ref="activeZone">
    <slot />
  </div>
</template>

<script lang="ts">
import { ACTIVE_ELEMENT_TOKEN } from "@smartmed/webpatient-vue-components/tokens";
import { defineComponent, inject, ref, watch } from "vue";

export default defineComponent({
  name: "ActiveZone",
  setup(_, { emit }) {
    const activeZone = ref<HTMLElement | null>(null);
    const focused = ref<boolean>(false);

    const activeElement = inject<Node | null>(ACTIVE_ELEMENT_TOKEN, null);

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
</script>
