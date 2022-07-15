<template>
  <div class="demoBlock">
    <h2 v-if="header" :class="['smed-text_h2', $style.header]">{{ header }}</h2>

    <div :class="[$style.block, mode && $style['block_' + mode]]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    header: String,
    mode: {
      type: [String, null] as PropType<string | "onDark">,
      validator: (value: string) => ["onDark", null].includes(value),
      default: null,
    },
  },
});
</script>

<style lang="scss" module>
.block {
  padding: 16px 32px;
  background-color: var(--smed-base-09);
  border: 1px solid var(--smed-base-05);
  box-shadow: 0 6px 12px var(--smed-base-05);

  &_onDark {
    background-color: var(--smed-base-02);
    color: var(--smed-base-09);
  }
}

.header {
  margin-bottom: 20px;
}
</style>
