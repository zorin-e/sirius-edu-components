<template>
  <span>
    <spinner-icon :class="[$style[size], $style[theme]]" />
  </span>
</template>

<script lang="ts">
import SpinnerIcon from "@smartmed/webpatient-vue-components/assets/svg/spinner.svg";

export default {
  name: "Spinner",
  components: {
    SpinnerIcon,
  },
  props: {
    size: {
      type: String,
      default: "md",
      validator: (value: string) => ["xs", "sm", "md"].includes(value),
    },
    theme: {
      type: String,
      default: "default",
      validator: (value: string) => ["default", "primary"].includes(value),
    },
  },
};
</script>

<style lang="scss" module>
.xs {
  @include size(20px);
}

.sm {
  @include size(24px);
}

.md {
  @include size(28px);
}

.default {
  color: var(--smed-base-09);
}

.primary {
  color: var(--smed-primary);
}
</style>
