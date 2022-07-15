import {
  ClassComponent,
  GlobalComponentConstructor,
} from "../ts-helpers";

export interface CarouselProps {}

export interface CarouselSlots {}

export type CarouselEmits = {};

declare class Carousel extends ClassComponent<
  CarouselProps,
  CarouselSlots,
  CarouselEmits
> {}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Carousel: GlobalComponentConstructor<Carousel>;
  }
}

export default Carousel;
