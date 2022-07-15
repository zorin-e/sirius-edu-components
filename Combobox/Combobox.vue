<template>
  <dropdown-host
    v-model="opened"
    :class="$style.host"
    :align="align"
    :can-open="!disabled"
    :direction="direction"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :min-height="minHeight"
    @keyup.enter="onKeyupEnter"
  >
    <base-input
      v-bind="$attrs"
      has-cleaner
      ref="baseInput"
      :disabled="disabled"
      :model-value="modelValue"
      :stringify="stringify"
      @search-clear="$emit('update:modelValue', null)"
    >
      <template v-if="$slots.left" v-slot:left>
        <slot name="left" />
      </template>
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
      <slot name="dropdown" :items="filteredItems" />
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
import BaseInput from "@smartmed/webpatient-vue-components/BaseInput";
import DropdownHost from "@smartmed/webpatient-vue-components/DropdownHost";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";
import { Stringify } from "@smartmed/webpatient-vue-components/domain";
import { ControlType } from "@smartmed/webpatient-vue-components/infrastructure";
import { CONTROL_ACCESSOR_TOKEN } from "@smartmed/webpatient-vue-components/tokens";

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseInput,
    DropdownHost,
    SvgIcon,
  },
  name: "Combobox",
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
    stringify: {
      type: Function as PropType<Stringify<any>>,
      default: (item: any) => item,
    },
    disabled: Boolean,
    matcher: Function as PropType<(search: any, item: any) => boolean>,
    itemsFilter: Function,
    minHeight: Number,
    maxHeight: Number,
    maxWidth: Number,
    align: String,
    direction: String,
  },
  setup(props, { emit }) {
    const { modelValue, items } = toRefs(props);
    const opened = ref(false);
    const baseInput = ref<{ focus: () => void } | null>(null);

    const controlAccessor = inject<ControlType<any> | null>(
      CONTROL_ACCESSOR_TOKEN,
      null
    );

    if (controlAccessor) {
      provide(CONTROL_ACCESSOR_TOKEN, null);
    }

    const defaultComparsion = (search: any, item: any) => {
      const first = props.stringify(search);
      const second = props.stringify(item);

      return first === second;
    };

    const matchedValue = computed(() => {
      if (!items.value) {
        return null;
      }

      const matcher = props.matcher || defaultComparsion;

      return items.value.find((item) => matcher(modelValue.value, item));
    });

    const filteredItems = computed(() => {
      if (items.value === null) {
        return null;
      }

      if (matchedValue.value) {
        return items.value;
      }

      const filter = props.itemsFilter || defaultComparsion;

      return items.value.filter((item) => filter(modelValue.value, item));
    });

    const isValue = computed(
      () => modelValue.value !== null && String(modelValue.value).length > 0
    );

    watch(opened, (value) => {
      if (!value && controlAccessor) {
        controlAccessor.markAsTouch();
      }
    });

    watch(modelValue, () => {
      if (!opened.value && isValue.value && !matchedValue.value) {
        show();
      }
    });

    watch(matchedValue, (value) => {
      if (!value) {
        return;
      }

      hide();

      if (baseInput.value) {
        baseInput.value.focus();
      }
    });

    const show = () => {
      opened.value = true;
    };

    const hide = () => {
      opened.value = false;
    };

    const onKeyupEnter = (event: KeyboardEvent) => {
      if (opened.value) {
        event.preventDefault();
      }

      const items = filteredItems.value;

      if (!items || items.length !== 1) {
        return;
      }

      emit("update:modelValue", items[0]);
    };

    return {
      hide,
      opened,
      filteredItems,
      baseInput,
      onKeyupEnter,
    };
  },
});
</script>

<style lang="scss" module>
.host {
  width: 100%;
}

.icon {
  @include transition(transform);

  color: var(--smed-base-05);
  cursor: pointer;

  &_rotated {
    transform: rotate(180deg);
  }
}
</style>
