import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface TagProps {}

export interface TagSlots {}

export type TagEmits = {};

declare class Tag extends ClassComponent<TagProps, TagSlots, TagEmits> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Tag: GlobalComponentConstructor<Tag>;
  }
}

export default Tag;
