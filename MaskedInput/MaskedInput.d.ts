import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface MaskedInputProps {}

export interface MaskedInputSlots {}

export type MaskedInputEmits = {};

declare class MaskedInput extends ClassComponent<
  MaskedInputProps,
  MaskedInputSlots,
  MaskedInputEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    MaskedInput: GlobalComponentConstructor<MaskedInput>;
  }
}

export default MaskedInput;
