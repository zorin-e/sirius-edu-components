<template>
  <ul :class="[$style.tabs, $style['tabs_' + size]]">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      :class="[
        'smed-text_body-xl',
        $style.tab,
        $style['tab_' + size],
        $style['tab_' + type],
        tab.id === modelValue.id && $style.tab_active,
        wide && $style.tab_wide,
      ]"
      @click="$emit('update:modelValue', tab)"
    >
      <slot :tab="tab" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Tabs",
  props: {
    modelValue: {
      type: [String, Number, Object] as PropType<string | number | {}>,
      required: true,
    },
    tabs: {
      type: Array,
    },
    type: {
      type: String,
      default: "boxed",
      validator: (value: string) => ["boxed", "underline"].includes(value),
    },
    wide: Boolean,
    size: {
      type: String,
      validator: (value: string) => ["sm", "md"].includes(value),
      default: "md",
    },
  },
});
</script>

<style lang="scss" module>
.tabs {
  @include hide-scroll;

  display: inline-flex;
  width: 100%;
  flex-wrap: nowrap;
  overflow: auto;
}

.tab {
  @include flex(center, center);

  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;

  &_boxed {
    background-color: var(--smed-base-09);
    color: var(--smed-base-01);

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  &_boxed#{&}_active {
    background-color: var(--smed-primary);
    color: var(--smed-base-09);
  }

  &_underline {
    border-bottom: 1px solid var(--smed-base-05);
  }

  &_sm {
    padding: 8px 16px;
  }

  &_md {
    padding: 16px 32px;
  }

  &_wide {
    flex: 1;
  }

  &_underline#{&}_active {
    position: relative;

    color: var(--smed-primary);

    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      max-height: 2px;
      height: 2px;
      min-height: 2px;
      box-sizing: border-box;
      border-radius: 2px 2px 0px 0px;
      border: 1px solid var(--smed-primary);
      background-color: var(--smed-primary);
    }
  }

  &_active {
    cursor: default;
  }
}
</style>
