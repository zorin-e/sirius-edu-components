<template>
  <div>
    <div
      tabindex="0"
      :class="[$style.expandable, opened && $style.expandable_opened]"
      @click="toggle"
    >
      <slot />

      <svg-icon
        name="arrow-down"
        :class="[$style.icon, opened && $style.icon_rotated]"
      />
    </div>

    <div v-if="opened">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

export default defineComponent({
  components: {
    SvgIcon,
  },
  setup() {
    const opened = ref(false);

    const toggle = () => {
      opened.value = !opened.value;
    };

    return {
      opened,
      toggle,
    };
  },
});
</script>

<style lang="scss" module>
.expandable {
  @include transition(color);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;

  cursor: pointer;

  &:hover,
  &_opened {
    color: var(--smed-base-04);
  }
}

.icon {
  @include transition(transform);

  &_rotated {
    transform: rotate(180deg);
  }
}
</style>
