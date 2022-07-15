<template>
  <Portal>
    <transition appear name="smed-table-bar">
      <div v-if="modelValue" :class="[$style.tableBar, 'smed-table-bar']">
        <div class="smed-table-bar__content"><slot :close="closeFn" /></div>
      </div>
    </transition>
  </Portal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Portal from "@smartmed/webpatient-vue-components/Portal";

export default defineComponent({
  name: "TableBar",
  components: {
    Portal,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const closeFn = () => {
      emit("update:modelValue", false);
    };

    return {
      closeFn,
    };
  },
});
</script>

<style lang="scss" module>
.tableBar {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: var(--smed-base-09);
  color: var(--smed-base-01);

  box-shadow: 0px 36px 75px #c7bdbd;
}
</style>
