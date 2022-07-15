import { VNode } from "vue";
import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface BackButtonProps {
  size?: string | undefined;
}

export interface BackButtonSlots {
  default: () => ReadonlyArray<VNode>;
}

export type BackButtonEmits = {};

declare class BackButton extends ClassComponent<
  BackButtonProps,
  BackButtonSlots,
  BackButtonEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    BackButton: GlobalComponentConstructor<BackButton>;
  }
}

export default BackButton;
