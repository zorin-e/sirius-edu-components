<template>
  <input
    ref="native"
    v-bind="$attrs"
    :value="stringify(modelValue)"
    :disabled="disabled"
    @input="updateValue($event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType } from "vue";
import { createTextMaskInputElement } from "text-mask-core";
import {
  Stringify,
  MaskOptions,
} from "@smartmed/webpatient-vue-components/domain";

export default defineComponent({
  name: "MaskedInput",
  props: {
    modelValue: {
      type: [String, Number, Object, null] as PropType<
        string | number | {} | null
      >,
      required: true,
    },
    maskOptions: {
      type: [Object, null] as PropType<MaskOptions>,
      default: null,
    },
    disabled: Boolean,
    stringify: {
      type: Function as PropType<Stringify<any>>,
      default: (item: any) => item,
    },
  },
  mounted() {
    if (this.maskOptions) {
      this.initMask();
    }
  },
  data() {
    return {
      textMaskInputElement: null,
    };
  },
  methods: {
    initMask() {
      nextTick(() => {
        this.setTextMaskInputElement();
        (this as any).textMaskInputElement.update(this.modelValue);
      });
    },
    createTextMaskInputElement,
    setTextMaskInputElement() {
      this.textMaskInputElement = this.createTextMaskInputElement({
        inputElement: this.$refs.native,
        mask: this.maskOptions!.mask,
        value: this.modelValue,
        showMask: false,
        guide: this.maskOptions!.guide || false,
        pipe: this.maskOptions!.pipe || ((v: any) => v),
      });
    },
    updateValue(value: any) {
      if (this.disabled) {
        return;
      }

      if (this.maskOptions) {
        (this as any).textMaskInputElement.update(value);
      }

      this.$emit("update:modelValue", (this as any).$refs.native.value);
    },
    bind() {
      this.setTextMaskInputElement();
      this.updateValue(this.modelValue);
    },
  },
  watch: {
    maskOptions(newMask, oldMask) {
      if (this.maskOptions !== oldMask) {
        this.bind();
      }
    },
  },
});
</script>
