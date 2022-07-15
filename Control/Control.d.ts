import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface ControlProps {}

export interface ControlSlots {}

export type ControlEmits = {};

declare class Control extends ClassComponent<
  ControlProps,
  ControlSlots,
  ControlEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Control: GlobalComponentConstructor<Control>;
  }
}

export default Control;
