import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface ComboboxProps {}

export interface ComboboxSlots {}

export type ComboboxEmits = {};

declare class Combobox extends ClassComponent<
  ComboboxProps,
  ComboboxSlots,
  ComboboxEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Combobox: GlobalComponentConstructor<Combobox>;
  }
}

export default Combobox;
