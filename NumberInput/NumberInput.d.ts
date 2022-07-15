import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface NumberInputProps {}

export interface NumberInputSlots {}

export type NumberInputEmits = {};

declare class NumberInput extends ClassComponent<
  NumberInputProps,
  NumberInputSlots,
  NumberInputEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    NumberInput: GlobalComponentConstructor<NumberInput>;
  }
}

export default NumberInput;
