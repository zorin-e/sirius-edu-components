import { VNode } from "vue";
import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface BaseButtonProps {
  title?: string | undefined;

  color?: string | undefined;

  disabled?: boolean | undefined;

  size?: string | undefined;

  type?: string | undefined;

  isLoading?: boolean | undefined;

  wide?: boolean | undefined;

  rounded?: boolean | undefined;

  iconButton?: boolean | undefined;
}

export interface BaseButtonSlots {
  "left-icon": () => ReadonlyArray<VNode>;

  default: () => ReadonlyArray<VNode>;

  "right-icon": () => ReadonlyArray<VNode>;
}

export type BaseButtonEmits = {};

declare class BaseButton extends ClassComponent<
  BaseButtonProps,
  BaseButtonSlots,
  BaseButtonEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    BaseButton: GlobalComponentConstructor<BaseButton>;
  }
}

export default BaseButton;
