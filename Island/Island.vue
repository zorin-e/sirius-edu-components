<template>
  <div :class="$style.island">
    <div>
      <slot name="image" />
    </div>

    <div :class="$style.content">
      <h5
        :class="[
          $style.title,
          'smed-text_h5 smed-text_medium',
          isLoading && 'mds-skeleton mds-skeleton_short',
        ]"
      >
        {{ title }}
      </h5>
      <p
        :class="[
          $style.description,
          'smed-text_body-xl',
          isLoading && 'mds-skeleton',
        ]"
      >
        <line-clamp :line-height="24" :lines-limit="2">{{
          description
        }}</line-clamp>
      </p>

      <div v-if="$slots.footer" :class="$style.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LineClamp from "@smartmed/webpatient-vue-components/LineClamp";

export default defineComponent({
  components: {
    LineClamp,
  },
  name: "Island",
  props: {
    title: String,
    description: String,
    isLoading: Boolean,
  },
});
</script>

<style lang="scss" module>
.island {
  display: flex;
  flex-direction: column;

  border-radius: 12px;
  background-color: var(--smed-base-09);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.12);
  }
}

.content {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  flex: 1;
}

.title {
  margin-bottom: 8px;
}

.description {
  color: var(--smed-base-03);

  margin-bottom: 44px;
}

.footer {
  margin-top: auto;
}
</style>
