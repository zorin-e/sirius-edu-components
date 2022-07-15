import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface SvgIconProps {
  size?: string | undefined;

  name: string;
}

export interface SvgIconSlots {}

export type SvgIconEmits = {};

declare class SvgIcon extends ClassComponent<
  SvgIconProps,
  SvgIconSlots,
  SvgIconEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    SvgIcon: GlobalComponentConstructor<SvgIcon>;
  }
}

export default SvgIcon;
