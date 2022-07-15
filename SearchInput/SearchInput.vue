<template>
  <base-input v-bind="$attrs" has-cleaner :size="size">
    <template v-slot:left>
      <svg-icon name="search" :size="iconSize" />
    </template>

    <template v-slot:valueContent>
      <slot v-if="hasValueContentSlot" name="valueContent" />
    </template>

    <template v-slot:right>
      <slot v-if="hasRightSlot" name="right" />
    </template>
  </base-input>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import BaseInput from "@smartmed/webpatient-vue-components/BaseInput";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";
import { hasSlotContent } from "@smartmed/webpatient-vue-components/domain";

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseInput,
    SvgIcon,
  },
  props: { size: String },
  name: "SearchInput",
  setup(props, { slots }) {
    const { size } = toRefs(props);

    const hasRightSlot = computed(
      () => slots.right && hasSlotContent(slots.right)
    );
    const hasValueContentSlot = computed(
      () => slots.valueContent && hasSlotContent(slots.valueContent)
    );

    const iconSize = computed(() => {
      return size.value === "sm" ? "md" : "lg";
    });

    return {
      hasRightSlot,
      hasValueContentSlot,
      iconSize,
    };
  },
});
</script>
