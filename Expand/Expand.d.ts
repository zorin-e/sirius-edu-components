import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface ExpandProps {}

export interface ExpandSlots {
  default: () => ReadonlyArray<VNode>;

  content: () => ReadonlyArray<VNode>;
}

export type ExpandEmits = {};

declare class Expand extends ClassComponent<
  ExpandProps,
  ExpandSlots,
  ExpandEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Expand: GlobalComponentConstructor<Expand>;
  }
}

export default Expand;
