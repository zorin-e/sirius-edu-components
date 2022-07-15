import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface ToggleProps {}

export interface ToggleSlots {}

export type ToggleEmits = {};

declare class Toggle extends ClassComponent<
  ToggleProps,
  ToggleSlots,
  ToggleEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Toggle: GlobalComponentConstructor<Toggle>;
  }
}

export default Toggle;
