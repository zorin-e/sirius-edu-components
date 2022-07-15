import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface BaseTextareaProps {}

export interface BaseTextareaSlots {}

export type BaseTextareaEmits = {};

declare class BaseTextarea extends ClassComponent<
  BaseTextareaProps,
  BaseTextareaSlots,
  BaseTextareaEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    BaseTextarea: GlobalComponentConstructor<BaseTextarea>;
  }
}

export default BaseTextarea;
