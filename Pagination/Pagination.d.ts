import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface PaginationProps {}

export interface PaginationSlots {}

export type PaginationEmits = {};

declare class Pagination extends ClassComponent<
  PaginationProps,
  PaginationSlots,
  PaginationEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Pagination: GlobalComponentConstructor<Pagination>;
  }
}

export default Pagination;
