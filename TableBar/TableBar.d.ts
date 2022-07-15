import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface TableBarProps {
  modelValue: boolean;
}

export interface TableBarSlots {
  default: (close: () => void) => ReadonlyArray<VNode>;
}

export type TableBarEmits = {
  "update:modelValue": (value: boolean) => void;
};

declare class TableBar extends ClassComponent<
  TableBarProps,
  TableBarSlots,
  TableBarEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    TableBar: GlobalComponentConstructor<TableBar>;
  }
}

export default TableBar;
