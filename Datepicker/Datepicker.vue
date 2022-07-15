<template>
  <temp-datepicker
    locale="ru"
    auto-apply
    month-name-format="long"
    :range="range"
    :inline="inline"
    :close-on-auto-apply="closeOnAutoApply"
    :enable-time-picker="false"
    :position="position"
    :modelValue="modelValue"
    :disabledDates="disabledDates"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #trigger>
      <slot />
    </template>
    <template #month="{ text }">
      {{ firstUpperChar(text) }}
    </template>
    <template #calendar-header="{ index, day }">
      <div :class="index === 5 || index === 6 ? $style.redColor : ''">
        {{ firstUpperChar(day) }}
      </div>
    </template>
  </temp-datepicker>
</template>

<script lang="ts">
import { PropType } from "vue";
import TempDatepicker from "@vuepic/vue-datepicker";
import "./datepicker.scss";

export default {
  name: "Datepicker",
  props: {
    disableNextDate: Boolean,
    inline: Boolean,
    modelValue: [Date, String, Array, Object],
    position: {
      type: String,
      default: "right",
      validator: (value: string) => ["left", "center", "right"].includes(value),
    },
    range: Boolean,
    closeOnAutoApply: {
      type: Boolean,
      default: true,
    },
    disabledDates: {
      type: Function as PropType<(date: Date) => boolean>,
      default: () => false,
    },
  },
  methods: {
    firstUpperChar(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    disableTheFollowingDates(date: Date) {
      return new Date() < date;
    },
  },
  components: {
    TempDatepicker,
  },
};
</script>

<style module lang="scss">
.redColor {
  color: var(--smed-support-secondary-01);
}
</style>
