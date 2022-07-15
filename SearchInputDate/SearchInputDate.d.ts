import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface SearchInputDateProps {}

export interface SearchInputDateSlots {}

export type SearchInputDateEmits = {};

declare class SearchInputDate extends ClassComponent<
  SearchInputDateProps,
  SearchInputDateSlots,
  SearchInputDateEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    SearchInputDate: GlobalComponentConstructor<SearchInputDate>;
  }
}

export default SearchInputDate;
