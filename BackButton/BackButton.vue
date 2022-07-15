<template>
  <button tabindex="0" :class="['smed-text_body-md', $style.button]">
    <svg-icon name="arrow-back" :class="$style.icon" />
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

export default defineComponent({
  name: "BackButton",
  components: {
    SvgIcon,
  },
});
</script>

<style lang="scss" module>
.button {
  @include clearbutton;
  @include transition(color);
  display: flex;
  align-items: center;
  color: var(--smed-base-03);
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: var(--smed-base-04);
  }

  &:active,
  &:focus {
    color: var(--smed-base-05);
  }
}

.icon {
  margin-right: 5px;
}
</style>
