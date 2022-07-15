import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface FieldErrorProps {}

export interface FieldErrorSlots {}

export type FieldErrorEmits = {};

declare class FieldError extends ClassComponent<
  FieldErrorProps,
  FieldErrorSlots,
  FieldErrorEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    FieldError: GlobalComponentConstructor<FieldError>;
  }
}

export default FieldError;
