import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface BaseSelectProps {}

export interface BaseSelectSlots {}

export type BaseSelectEmits = {};

declare class BaseSelect extends ClassComponent<
  BaseSelectProps,
  BaseSelectSlots,
  BaseSelectEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    BaseSelect: GlobalComponentConstructor<BaseSelect>;
  }
}

export default BaseSelect;
