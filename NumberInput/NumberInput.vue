<template>
  <base-input
    v-bind="$attrs"
    type="text"
    :modelValue="modelValue"
    :mask-options="maskOptions"
    @update:modelValue="emitValue"
  >
    <template v-slot:left>
      <slot v-if="hasLeftSlot" name="left" />
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
import { computed, defineComponent, PropType } from "vue";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import BaseInput from "@smartmed/webpatient-vue-components/BaseInput";
import { hasSlotContent } from "@smartmed/webpatient-vue-components/domain";

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseInput,
  },
  name: "NumberInput",
  props: {
    modelValue: {
      type: [Number, null] as PropType<number | null>,
      required: true,
    },
  },
  setup(_, { emit, slots }) {
    const emitValue = (value: string) => {
      emit("update:modelValue", value ? parseInt(value) : null);
    };

    const hasLeftSlot = computed(
      () => slots.left && hasSlotContent(slots.left)
    );
    const hasValueContentSlot = computed(
      () => slots.left && hasSlotContent(slots.valueContent)
    );
    const hasRightSlot = computed(
      () => slots.left && hasSlotContent(slots.right)
    );

    return {
      emitValue,
      hasLeftSlot,
      hasValueContentSlot,
      hasRightSlot,
      maskOptions: {
        mask: createNumberMask({
          prefix: "",
          includeThousandsSeparator: false,
        }),
        guide: false,
      },
    };
  },
});
</script>
