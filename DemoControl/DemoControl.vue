<template>
  <div><slot /></div>
</template>

<script lang="ts">
import { VALIDATION_ERRORS_TOKEN } from "@smartmed/webpatient-vue-components/tokens";
import { defineComponent, provide } from "vue";

export default defineComponent({
  setup() {
    provide(VALIDATION_ERRORS_TOKEN, {
      required: "Переопределенная ошибка с помощью токена",
      email: "Переопределенная ошибка email валидатора с помощью токена",
    });
  },
});
</script>
