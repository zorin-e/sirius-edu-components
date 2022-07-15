<template>
  <base-input
    v-bind="$attrs"
    name="password"
    autocomplete="on"
    :type="showPassword ? 'text' : 'password'"
    :modelValue="modelValue"
    :size="size"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template v-slot:right>
      <svg-icon
        :class="$style.icon"
        :name="showPassword ? 'see' : 'unsee'"
        :size="iconSize"
        @click="toggleShowPassword"
      />
    </template>
  </base-input>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from "vue";
import BaseInput from "@smartmed/webpatient-vue-components/BaseInput";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseInput,
    SvgIcon,
  },
  name: "PassowrdInput",
  props: {
    modelValue: {
      type: [String, null] as PropType<string | null>,
      required: true,
    },
    size: String,
  },
  setup(props) {
    const { size } = toRefs(props);
    const showPassword = ref(false);

    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    };

    const iconSize = computed(() => {
      return size.value === "sm" ? "md" : "lg";
    });

    return {
      showPassword,
      toggleShowPassword,
      iconSize,
    };
  },
});
</script>

<style lang="scss" module>
.icon {
  color: var(--smed-base-05);

  cursor: pointer;

  &:hover {
    color: var(--smed-base-04);
  }

  &:active {
    color: var(--smed-base-03);
  }
}
</style>
