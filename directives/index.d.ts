import { ObjectDirective } from "vue";

export const AutoFocusDirective: ObjectDirective;

export const ClickOutsideDirective: ObjectDirective;

type Binding = {
  onEvent: (element: EventTarget | null, offset: [number, number]) => void;
};

export const DragDropDirective: ObjectDirective<HTMLElement, Binding>;

interface ObserverHTMLElement extends HTMLElement {
  __observer_intersection: IntersectionObserver;
}

type Options = IntersectionObserverInit & {
  root?: () =>
    | IntersectionObserverInit["root"]
    | IntersectionObserverInit["root"];
};

type BindingValue = {
  onIntersect: (el: IntersectionObserverEntry) => void;
  isObserve?: boolean;
  disconnectAfterIntersect?: boolean;
  options?: Options;
};

export const IntersectionDirective: ObjectDirective<
  ObserverHTMLElement,
  BindingValue
>;
