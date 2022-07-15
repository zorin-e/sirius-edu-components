import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface DatepickerProps {}

export interface DatepickerSlots {}

export type DatepickerEmits = {};

declare class Datepicker extends ClassComponent<
  DatepickerProps,
  DatepickerSlots,
  DatepickerEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Datepicker: GlobalComponentConstructor<Datepicker>;
  }
}

export default Datepicker;
