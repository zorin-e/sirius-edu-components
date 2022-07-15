import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface PortalProps {
  appendTo?: string;
}

export interface PortalSlots {}

export type PortalEmits = {};

declare class Portal extends ClassComponent<
  PortalProps,
  PortalSlots,
  PortalEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Portal: GlobalComponentConstructor<Portal>;
  }
}

export default Portal;
