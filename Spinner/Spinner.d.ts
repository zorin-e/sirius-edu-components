import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface SpinnerProps {}

export interface SpinnerSlots {}

export type SpinnerEmits = {};

declare class Spinner extends ClassComponent<
  SpinnerProps,
  SpinnerSlots,
  SpinnerEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Spinner: GlobalComponentConstructor<Spinner>;
  }
}

export default Spinner;
