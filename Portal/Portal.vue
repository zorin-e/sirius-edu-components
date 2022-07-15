<template>
  <Teleport :to="appendTo">
    <slot />
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    appendTo: {
      type: String,
      default: "body",
    },
  },
});
</script>
