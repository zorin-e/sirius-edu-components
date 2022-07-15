import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface TabsProps {}

export interface TabsSlots {}

export type TabsEmits = {};

declare class Tabs extends ClassComponent<TabsProps, TabsSlots, TabsEmits> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Tabs: GlobalComponentConstructor<Tabs>;
  }
}

export default Tabs;
