import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface SearchInputProps {}

export interface SearchInputSlots {}

export type SearchInputEmits = {};

declare class SearchInput extends ClassComponent<
  SearchInputProps,
  SearchInputSlots,
  SearchInputEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    SearchInput: GlobalComponentConstructor<SearchInput>;
  }
}

export default SearchInput;
