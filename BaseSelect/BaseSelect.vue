<template>
  <dropdown-host
    v-bind="splittedStyleAndClassAttrs[0]"
    v-model="opened"
    :class="$style.host"
    :align="align"
    :can-open="!disabled"
    :direction="direction"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :min-height="minHeight"
  >
    <base-input
      v-bind="splittedStyleAndClassAttrs[1]"
      :model-value="modelValue"
      :class="[$style.input, disabled && $style.input_disabled]"
      :editable="false"
      :disabled="disabled"
    >
      <template v-slot:right>
        <svg-icon
          name="arrow-down"
          :class="[$style.icon, opened && $style.icon_rotated]"
          @click.stop
        />
      </template>

      <template v-slot:valueContent>
        <slot
          v-if="$slots.valueContent"
          name="valueContent"
          :value="modelValue"
        />
      </template>
    </base-input>

    <template v-slot:dropdown>
      <slot name="dropdown" :items="items" />
    </template>
  </dropdown-host>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ref,
  toRefs,
  watch,
} from "vue";
import DropdownHost from "@smartmed/webpatient-vue-components/DropdownHost";
import BaseInput from "@smartmed/webpatient-vue-components/BaseInput";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";
import { ControlType } from "@smartmed/webpatient-vue-components/infrastructure";
import { CONTROL_ACCESSOR_TOKEN } from "@smartmed/webpatient-vue-components/tokens";

export default defineComponent({
  inheritAttrs: false,
  components: { DropdownHost, BaseInput, SvgIcon },
  name: "BaseSelect",
  props: {
    modelValue: {
      type: [String, Number, Object, null] as PropType<
        string | number | {} | null
      >,
      required: true,
    },
    items: {
      type: [Array, null] as PropType<ReadonlyArray<any> | null>,
      default: () => [],
    },
    minHeight: Number,
    maxHeight: Number,
    maxWidth: Number,
    align: String,
    direction: String,
    disabled: Boolean,
  },
  setup(props, { attrs }) {
    const { modelValue } = toRefs(props);
    const opened = ref(false);

    const controlAccessor = inject<ControlType<any> | null>(
      CONTROL_ACCESSOR_TOKEN,
      null
    );

    if (controlAccessor) {
      provide(CONTROL_ACCESSOR_TOKEN, null);
    }

    watch(modelValue, () => {
      if (opened.value) {
        opened.value = false;
      }
    });

    watch(opened, (value) => {
      if (!value && controlAccessor) {
        controlAccessor.markAsTouch();
      }
    });

    const splittedStyleAndClassAttrs = computed(() => {
      const { style, class: classNames, ...otherAttrs } = attrs;

      return [
        {
          style,
          class: classNames,
        },
        otherAttrs,
      ];
    });

    return {
      opened,
      splittedStyleAndClassAttrs,
    };
  },
});
</script>
<style lang="scss" module>
.host {
  width: 100%;
}

.input {
  cursor: pointer;

  &_disabled {
    cursor: default;
  }
}

.icon {
  @include transition(transform);
  display: flex;
  align-items: center;

  color: var(--smed-base-05);
  cursor: pointer;

  &_rotated {
    transform: rotate(180deg);
  }
}
</style>
