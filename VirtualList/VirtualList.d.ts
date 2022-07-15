import { VNode } from "vue";
import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface VirtualListProps {
  /**
   * Элементы списка
   */
  items: Array<T>;

  /**
   * Ключ уникального значения для элемента.
   * По умолчанию "id"
   */
  dataKey: string;

  // Дальше идут не обязательные к заполнению параметры

  /**
   * Сколько отрисовывать в DOM элементов.
   * По умолчанию 50
   */
  keeps: number;

  /**
   * Примерный размер элемента.
   * Влияет длину скроллбара, чем более точное значение, тем лучше выглядит прокрутка. Лучше брать среднее от общего размера всех элементов
   * По умолчанию 50
   */
  estimateSize: number;

  /**
   * Позволяет использовать document для скролла.
   * По умолчанию false
   */
  pageMode: boolean;

  /**
   * Позволяет переключать направление прокрутки в горизонтальный или вертикальный режим
   * По умолчанию vertical
   */
  direction: "vertical" | "horizontal";

  /**
   * Скроллит до элемента по индексу
   * По умолчанию 0
   */
  start: number;

  /**
   * Скролл на указанный отступ
   * По умолчанию 0
   */
  offset: number;

  /**
   * Устанавливает трешход на верхнюю границу списка в px. Влияет на емит события totop
   * По умолчанию 0
   */
  topThreshold: number;

  /**
   * Устанавливает трешход на нижнюю границу списка в px. Влияет на емит события tobottom
   * По умолчанию 0
   */
  bottomThreshold: number;
}

export interface VirtualListSlots {
  before: () => ReadonlyArray<VNode>;

  default: <T>(item: T, index: number) => ReadonlyArray<VNode>;

  after: () => ReadonlyArray<VNode>;
}

export type VirtualListEmits = {
  /**
   * Эмитит событие при прокрутке до верху
   */
  totop: () => void;

  /**
   * Эмитит событие при прокрутке до низу
   */
  tobottom: () => void;
};

declare class VirtualList extends ClassComponent<
  VirtualListProps,
  VirtualListSlots,
  VirtualListEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    VirtualList: GlobalComponentConstructor<VirtualList>;
  }
}

export default VirtualList;
