import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface IslandProps {}

export interface IslandSlots {}

export type IslandEmits = {};

declare class Island extends ClassComponent<
  IslandProps,
  IslandSlots,
  IslandEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Island: GlobalComponentConstructor<Island>;
  }
}

export default Island;
