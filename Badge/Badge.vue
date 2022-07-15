<template>
  <div :class="$style.host">
    <div>
      <slot />
    </div>
    <tag
      v-if="computedValue !== null"
      size="xxs"
      :clickable="false"
      :color="color"
      :class="$style.notification"
    >
      {{ computedValue }}
    </tag>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import Tag from "@smartmed/webpatient-vue-components/Tag";

const PLUS_CHAR = "\u002B";

export default defineComponent({
  components: { Tag },
  props: {
    value: {
      type: [String, Number, null] as PropType<string | number | null>,
      default: null,
    },
    color: {
      type: String,
    },
  },
  setup(props) {
    const { value } = toRefs(props);

    const computedValue = computed(() => {
      if (value.value === null) {
        return null;
      }

      if (typeof value.value === "number") {
        return value.value > 99 ? `99${PLUS_CHAR}` : `${value.value}`;
      }

      return value.value || "\u0020";
    });

    return {
      computedValue,
    };
  },
});
</script>

<style lang="scss" module>
.host {
  position: relative;
  display: inline-block;
}

.notification {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
</style>
