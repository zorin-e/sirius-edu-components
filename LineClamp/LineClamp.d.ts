import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface LineClampProps {}

export interface LineClampSlots {}

export type LineClampEmits = {};

declare class LineClamp extends ClassComponent<
  LineClampProps,
  LineClampSlots,
  LineClampEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    LineClamp: GlobalComponentConstructor<LineClamp>;
  }
}

export default LineClamp;
