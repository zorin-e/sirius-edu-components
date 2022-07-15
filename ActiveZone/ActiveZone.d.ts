import { VNode } from "vue";
import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface ActiveZoneProps {}

export interface ActiveZoneSlots {
  default: () => ReadonlyArray<VNode>;
}

export type ActiveZoneEmits = {
  "active-zone-changed": (active: boolean) => void;
};

declare class ActiveZone extends ClassComponent<
  ActiveZoneProps,
  ActiveZoneSlots,
  ActiveZoneEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    ActiveZone: GlobalComponentConstructor<ActiveZone>;
  }
}

export default ActiveZone;
