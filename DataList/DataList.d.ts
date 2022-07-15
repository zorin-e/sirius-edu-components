import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface DataListProps {}

export interface DataListSlots {}

export type DataListEmits = {};

declare class DataList extends ClassComponent<
  DataListProps,
  DataListSlots,
  DataListEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    DataList: GlobalComponentConstructor<DataList>;
  }
}

export default DataList;
