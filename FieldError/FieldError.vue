<template>
  <transition name="fade-height16">
    <div v-if="errorComputed" :class="['smed-text_body-xs', $style.error]">
      {{ errorComputed }}
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, toRefs } from "vue";
import { VALIDATION_ERRORS_TOKEN } from "@smartmed/webpatient-vue-components/tokens";

export default defineComponent({
  name: "FieldError",
  props: {
    error: {
      type: [String, Object, null] as PropType<
        string | Record<string, string> | null
      >,
      required: true,
    },
  },
  setup(props) {
    const { error } = toRefs(props);
    const validationErrors = inject<Record<string, string> | null>(
      VALIDATION_ERRORS_TOKEN,
      null
    );

    const errorComputed = computed(() => {
      const value = error.value;

      if (typeof value === "string" || value === null) {
        return value;
      }

      const keys = Object.keys(value);

      if (keys.length === 0) {
        return null;
      }

      const firstKey = keys[0];

      if (!validationErrors) {
        return value[firstKey];
      }

      return validationErrors[firstKey] || value[firstKey];
    });

    return {
      errorComputed,
    };
  },
});
</script>

<style lang="scss" module>
.error {
  color: var(--smed-error);
}
</style>
