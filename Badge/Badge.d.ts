import { VNode } from "vue";
import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface BadgeProps {
  value: string | number | null;

  color: string;
}

export interface BadgeSlots {
  default: () => ReadonlyArray<VNode>;
}

export type BadgeEmits = {};

declare class Badge extends ClassComponent<
  BadgeProps,
  BadgeSlots,
  BadgeEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Badge: GlobalComponentConstructor<Badge>;
  }
}

export default Badge;
