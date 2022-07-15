<template>
  <div
    :class="[
      $style.container,
      $style['container_' + size],
      wrappable && $style.container_wrappable,
    ]"
  >
    <button
      v-for="index in length"
      :key="index"
      :class="$style.button"
      :style="computedStyle"
      @click="$emit('update:modelValue', index - 1)"
    >
      <span
        :class="[
          $style.content,
          hasAutoProgress
            ? modelValue >= index - 1 && $style.content_active
            : modelValue === index - 1 && $style.content_active,
        ]"
        :style="
          hasAutoProgress && modelValue == index - 1 ? activeElementStyle : {}
        "
      ></span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, toRefs } from "vue";
import { EVENT_TUNNEL_PROGRESS_TOKEN } from "@smartmed/webpatient-vue-components/tokens";

export default defineComponent({
  name: "Pagination",
  props: {
    size: {
      type: String,
      default: "sm",
      validator: (value: string) => ["sm", "md"].includes(value),
    },
    length: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
    wrappable: Boolean,
  },
  setup(props) {
    const authSwitchingProgress = inject<Ref<number> | null>(
      EVENT_TUNNEL_PROGRESS_TOKEN,
      null
    );
    const { length, size } = toRefs(props);

    const computedStyle = computed(() => {
      if (size.value === "md") {
        return {
          width: `${100 / length.value}%`,
        };
      }

      return {};
    });

    const hasAutoProgress = computed(() => authSwitchingProgress !== null);

    const activeElementStyle = computed(() => {
      return {
        transform: authSwitchingProgress
          ? `translateX(${authSwitchingProgress.value * 100 - 100}%)`
          : `translateX(0)`,
      };
    });

    return {
      computedStyle,
      activeElementStyle,
      authSwitchingProgress,
      hasAutoProgress,
    };
  },
});
</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: center;

  &_wrappable {
    flex-wrap: wrap;

    .button {
      margin-bottom: 12px;
    }
  }

  &_sm {
    .button {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      flex-shrink: 0;
      margin-right: 8px;
    }
  }

  &_md {
    width: 100%;

    .button {
      height: 4px;
      border-radius: 500px;
    }

    .button + .button {
      margin-left: 4px;
    }
  }
}

.button {
  @include clearbutton();

  background-color: var(--smed-base-05);
  overflow: hidden;

  cursor: pointer;
}

.content {
  @include transition(transform, 0.1s);

  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  border-radius: inherit;

  &_active {
    background-color: var(--smed-primary);
    transform: translateX(0);
  }
}
</style>
