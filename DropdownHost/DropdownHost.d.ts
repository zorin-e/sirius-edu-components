import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface DropdownHostProps {}

export interface DropdownHostSlots {}

export type DropdownHostEmits = {};

declare class DropdownHost extends ClassComponent<
  DropdownHostProps,
  DropdownHostSlots,
  DropdownHostEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    DropdownHost: GlobalComponentConstructor<DropdownHost>;
  }
}

export default DropdownHost;
