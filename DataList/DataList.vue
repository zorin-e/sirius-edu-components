<template>
  <div :class="$style.list">
    <template v-if="isLoading">
      <div :class="[$style.spinner, $style[size]]">
        <spinner theme="primary" size="md" />
      </div>
    </template>

    <template v-else>
      <template v-if="items.length > 0">
        <ul v-if="!isVirtual">
          <li
            v-for="(item, index) in items"
            :key="index"
            :class="[
              'smed-text_body-xl',
              $style.item,
              $style.item_hoverable,
              $style[size],
            ]"
            @click="$emit('update:modelValue', item)"
          >
            <slot
              name="itemContent"
              :item="item"
              :active="matcher(modelValue, item)"
            >
              <span>{{ item }}</span>

              <svg-icon
                v-if="matcher(modelValue, item)"
                name="check"
                :class="$style.icon"
                :size="iconSize"
              />
            </slot>
          </li>

          <li
            v-if="$slots.action"
            :class="[
              'smed-text_body-xl',
              $style.item,
              $style.item_hoverable,
              $style[size],
            ]"
          >
            <slot name="action" />
          </li>
        </ul>

        <virtual-list v-else v-bind="$attrs" :items="items">
          <template v-slot:default="{ item }">
            <li
              :class="[
                'smed-text_body-xl',
                $style.item,
                $style.item_hoverable,
                $style[size],
              ]"
              @click="$emit('update:modelValue', item)"
            >
              <slot
                name="itemContent"
                :item="item"
                :active="matcher(modelValue, item)"
              >
                <span>{{ item }}</span>

                <svg-icon
                  v-if="matcher(modelValue, item)"
                  name="check"
                  :class="$style.icon"
                  :size="iconSize"
                />
              </slot>
            </li>
          </template>

          <template #after>
            <slot name="action" />
          </template>
        </virtual-list>
      </template>

      <div
        v-else
        :class="[
          'smed-text_body-xl',
          $style.item,
          $style.item_notFound,
          $style[size],
        ]"
      >
        <slot name="emptyContent"> Ничего не найдено </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import Spinner from "@smartmed/webpatient-vue-components/Spinner";
import VirtualList from "@smartmed/webpatient-vue-components/VirtualList";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

export default defineComponent({
  components: {
    Spinner,
    SvgIcon,
    VirtualList,
  },
  name: "DataList",
  props: {
    modelValue: {
      type: [String, Number, Object, null] as PropType<
        string | number | {} | null
      >,
      required: true,
    },
    items: {
      type: [Array, null] as PropType<ReadonlyArray<any> | null>,
      required: true,
    },
    isVirtual: {
      type: Boolean,
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => ["sm", "md", "lg"].includes(value),
    },
    matcher: {
      type: Function as PropType<(value: any, item: any) => boolean>,
      default: (value: any, item: any) => value === item,
    },
  },
  setup(props) {
    const { items, size } = toRefs(props);

    const isLoading = computed(() => items.value === null);

    const iconSize = computed(() => {
      return size.value === "sm" ? "md" : "lg";
    });

    return {
      isLoading,
      iconSize,
    };
  },
});
</script>

<style lang="scss" module>
.list {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: inherit;
  overflow-y: auto;
}

.sm {
  padding: 6px 8px;
}

.md {
  padding: 8px 12px;
}

.lg {
  padding: 12px 16px;
}

.icon {
  display: inline-flex;
  align-self: center;
}

.spinner {
  text-align: center;
}

.item {
  @include transition(background-color);

  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &_notFound {
    cursor: default;

    color: var(--smed-base-03);
  }

  &_hoverable {
    &:hover {
      background-color: var(--smed-base-08);
    }
  }
}
</style>
