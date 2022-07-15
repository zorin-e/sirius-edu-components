<template>
  <div>
    <slot
      :invalid="invalid"
      :model="model"
      :disabled="disabled"
      :valid="valid"
    />
    <field-error v-if="showErrors" :class="$style.error" :error="error" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, reactive } from "vue";
import FieldError from "@smartmed/webpatient-vue-components/FieldError";
import {
  VALIDATION_ERRORS_TOKEN,
  CONTROL_ACCESSOR_TOKEN,
} from "@smartmed/webpatient-vue-components/tokens";
import { ControlType } from "@smartmed/webpatient-vue-components/infrastructure";

export default defineComponent({
  components: {
    FieldError,
  },
  name: "Control",
  props: {
    control: {
      type: Object as PropType<ControlType<any>>,
      required: true,
    },
    showErrors: {
      type: Boolean,
      default: true,
    },
    validationErrors: {
      type: Object as PropType<Record<string, string> | null>,
      default: null,
    },
  },
  setup(props) {
    provide(CONTROL_ACCESSOR_TOKEN, {
      markAsTouch: props.control.markAsTouch,
    });

    if (props.validationErrors) {
      provide(VALIDATION_ERRORS_TOKEN, props.validationErrors);
    }

    return {
      model: reactive({
        value: props.control.value,
      }),
      invalid: props.control.invalid,
      error: props.control.error,
      disabled: props.control.disabled,
      valid: props.control.valid,
    };
  },
});
</script>

<style lang="scss" module>
.error {
  margin-top: 4px;
}
</style>
