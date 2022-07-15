import { VNode } from "vue";
import { ClassComponent } from "../ts-helpers";
import { MaskOptions } from "src/domain/MaskOptions.type";

export interface BaseInputProps {
  modelValue?: string | number | {} | null | undefined;

  modelModifiers?: Record<string, boolean> | undefined;

  type?: string | undefined;

  size?: string | undefined;

  disabled?: boolean | undefined;

  label?: string | undefined;

  editable?: boolean | undefined;

  maskOptions?: MaskOptions | null | undefined;

  isError?: boolean | undefined;

  isSuccess?: boolean | undefined;

  placeholder?: string | undefined;

  autocomplete?: string | undefined;

  name?: string | undefined;

  hasCleaner?: boolean | undefined;

  inputmode?: string | undefined;

  min?: string | number | undefined;

  max?: string | number | undefined;

  readonly?: boolean | undefined;

  hasBorder?: boolean | undefined;

  stringify?: (value: string | number | {} | null) => string | undefined;
}

export interface BaseInputSlots {
  right: () => ReadonlyArray<VNode>;

  left: () => ReadonlyArray<VNode>;

  valueContent: () => ReadonlyArray<VNode>;
}

export type BaseInputEmits = {
  "update:modelValue": (value: string | number | {} | null) => void;

  "search-clear": () => void;
};

declare class BaseInput extends ClassComponent<
  BaseInputProps,
  BaseInputSlots,
  BaseInputEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    BaseInput: GlobalComponentConstructor<BaseInput>;
  }
}

export default BaseInput;
