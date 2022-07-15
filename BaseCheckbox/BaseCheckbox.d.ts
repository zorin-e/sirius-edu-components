import { VNode } from "vue";
import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface BaseCheckboxProps {
  modelValue?: boolean | undefined;

  disabled?: boolean | undefined;

  label?: string | undefined;

  size?: string | undefined;

  icon?: string | undefined;

  isError?: boolean | undenfined;
}

export interface BaseCheckboxSlots {
  default: () => ReadonlyArray<VNode>;
}

export type BaseCheckboxEmits = {
  "update:modelValue": (checked: boolean) => void;
};

declare class BaseCheckbox extends ClassComponent<
  BaseCheckboxProps,
  BaseCheckboxSlots,
  BaseCheckboxEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    BaseCheckbox: GlobalComponentConstructor<BaseCheckbox>;
  }
}

export default BaseCheckbox;
