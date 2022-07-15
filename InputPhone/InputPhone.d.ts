import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface InputPhoneProps {}

export interface InputPhoneSlots {}

export type InputPhoneEmits = {};

declare class InputPhone extends ClassComponent<
  InputPhoneProps,
  InputPhoneSlots,
  InputPhoneEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    InputPhone: GlobalComponentConstructor<InputPhone>;
  }
}

export default InputPhone;
