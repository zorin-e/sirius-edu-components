<template>
  <span :class="[$style.icon, $style['icon_' + size]]">
    <component v-if="name" width="100%" height="100%" :is="iconComponent" />
  </span>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    name: String,
    size: {
      type: String,
      default: "lg",
      validators: (value: string) =>
        ["sm", "md", "lg", "xl", "xxl"].includes(value),
    },
  },
  setup(props) {
    const { name } = toRefs(props);

    const iconComponent = computed(() => {
      return (
        name.value &&
        defineAsyncComponent(
          () =>
            import(
              `@smartmed/webpatient-vue-components/assets/svg/${name.value}.svg`
            )
        )
      );
    });

    return {
      iconComponent,
    };
  },
});
</script>

<style lang="scss" module>
@mixin strict-size($width, $height) {
  min-width: $width;
  min-height: $height;

  width: $width;
  height: $height;

  max-width: $width;
  max-height: $height;
}

.icon {
  display: inline-block;
  vertical-align: middle;

  &_xxl {
    @include strict-size(52px, 52px);
  }

  &_xl {
    @include strict-size(32px, 32px);
  }

  &_lg {
    @include strict-size(24px, 24px);
  }

  &_md {
    @include strict-size(20px, 20px);
  }

  &_sm {
    @include strict-size(16px, 16px);
  }
}
</style>
