import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface PasswordInputProps {}

export interface PasswordInputSlots {}

export type PasswordInputEmits = {};

declare class PasswordInput extends ClassComponent<
  PasswordInputProps,
  PasswordInputSlots,
  PasswordInputEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    PasswordInput: GlobalComponentConstructor<PasswordInput>;
  }
}

export default PasswordInput;
