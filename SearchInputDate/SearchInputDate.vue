<template>
  <div
    v-click-outside="closeCalendar"
    :class="$style.wrapper"
    @keydown.esc="closeCalendar"
  >
    <search-input
      :modelValue="modelValue"
      :size="size"
      :placeholder="placeholder"
      @update:modelValue="$emit('update:modelValue', $event)"
      @search-clear="$emit('clear-search', $event)"
    >
      <template v-slot:right>
        <svg-icon
          v-if="!date"
          name="calendar"
          :class="[$style.calendarIcon, isShowCalendar && $style.active]"
          :size="iconSize"
          @click.prevent="isShowCalendar = !isShowCalendar"
        />

        <div v-else :class="[$style.dateTag, size === 'sm' && $style.small]">
          <span :class="$style.showDate" @click.prevent="isShowCalendar = true">
            {{ formattedDate }}
          </span>
          <svg-icon
            name="close"
            :class="$style.closeTag"
            :size="iconSize"
            @click.prevent="$emit('update:date', null)"
          />
        </div>
      </template>
    </search-input>

    <datepicker
      v-if="isShowCalendar"
      inline
      range
      :modelValue="date"
      :class="$style.datePicker"
      :disabled-dates="disabledDates"
      @update:modelValue="selectDate"
    >
    </datepicker>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SearchInput from "@smartmed/webpatient-vue-components/SearchInput";
import Datepicker from "@smartmed/webpatient-vue-components/Datepicker";
import { ClickOutsideDirective } from "@smartmed/webpatient-vue-components/directives";
import SvgIcon from "@smartmed/webpatient-vue-components/SvgIcon";

const INTL_DAY_AND_MONTH = new Intl.DateTimeFormat("ru", {
  day: "numeric",
  month: "short",
});
const BASE_SEPARATOR = " \u2014 ";

export default defineComponent({
  emits: ["update:modelValue", "update:date", "clear-search"],
  directives: {
    "click-outside": ClickOutsideDirective,
  },
  name: "SearchInputDate",
  props: {
    disableNextDate: Boolean,
    modelValue: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => ["lg", "md", "sm"].includes(value),
    },
    date: {
      type: [Date, String, Array, Object] as PropType<
        Date | string | [Date, Date] | {}
      >,
    },
    placeholder: String,
  },
  data() {
    return {
      isShowCalendar: false,
    };
  },
  computed: {
    formattedDate() {
      if (Array.isArray(this.date)) {
        return this.date
          .map((item) => {
            return INTL_DAY_AND_MONTH.format(item);
          })
          .join(BASE_SEPARATOR);
      }

      if (this.date instanceof Date) {
        return INTL_DAY_AND_MONTH.format(this.date);
      }

      return "";
    },
    disabledDates() {
      return this.disableNextDate
        ? (date: Date) => new Date() < date
        : () => false;
    },
    iconSize() {
      return this.size === "sm" ? "md" : "lg";
    },
  },
  methods: {
    closeCalendar() {
      this.isShowCalendar = false;
    },
    selectDate(date: Date) {
      this.isShowCalendar = false;
      this.$emit("update:date", date);
    },
  },

  components: {
    SearchInput,
    Datepicker,
    SvgIcon,
  },
});
</script>

<style lang="scss" module>
.wrapper {
  position: relative;
}
.datePicker {
  position: absolute;
  right: 0;
  top: calc(100% + 16px);
}
.calendarIcon {
  color: var(--smed-base-05);

  cursor: pointer;

  &.active,
  &:hover {
    color: var(--smed-primary);
  }
}

.dateTag {
  @include smed-text_body-sm;

  background-color: var(--smed-primary);
  border-radius: 4px;
  color: var(--smed-base-09);
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  &.small {
    @include smed-text_body-xs;

    .showDate {
      padding: 2px 6px;
    }
  }
}

.closeTag {
  color: var(--smed-base-09);
  border-left: 1px solid var(--smed-base-09);
}

.showDate {
  padding: 4px 8px;
}

.showDate,
.closeTag {
  &:hover {
    color: var(--smed-base-06);
  }
}
</style>
