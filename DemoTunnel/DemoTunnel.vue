<template>
  <div :class="$style.container">
    <p>Прогресс: {{ progress }}</p>
    <p>События периода: {{ duration }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from "vue";
import {
  EVENT_TUNNEL_PROGRESS_TOKEN,
  EVENT_TUNNEL_TOKEN,
} from "@smartmed/webpatient-vue-components/tokens";

export default defineComponent({
  setup() {
    const progress = inject<Ref<number>>(EVENT_TUNNEL_PROGRESS_TOKEN);
    const duration = inject<Ref<[number, number]>>(EVENT_TUNNEL_TOKEN);

    return {
      progress,
      duration,
    };
  },
});
</script>

<style lang="scss" module>
.container {
  background-color: green;
  padding: 16px;
}
</style>
