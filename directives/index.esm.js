const AutoFocusDirective = {
    mounted(el) {
        el.focus();
    },
};

const ClickOutsideDirective = {
    beforeMount: (el, binding) => {
        const handler = (event) => {
            if (!el.contains(event.target) && el !== event.target) {
                binding.value(event);
            }
        };
        const clickHandler = "ontouchstart" in document.documentElement ? "touchstart" : "click";
        el.__privateClickOutsideHandler = handler;
        document.addEventListener(clickHandler, handler);
    },
    beforeUnmount: (el) => {
        if (el.__privateClickOutsideHandler) {
            const clickHandler = "ontouchstart" in document.documentElement ? "touchstart" : "click";
            document.removeEventListener(clickHandler, el.__privateClickOutsideHandler);
            delete el.__privateClickOutsideHandler;
        }
    },
};

const DRAG_DROP_INSTANCE_KEY = "__smartmed_dragDrop__";
const touchEvents = ["touchstart", "touchmove", "touchend"];
const mouseEvents = ["mousedown", "mousemove", "mouseup"];
const DragDropDirective = {
    beforeMount: (element, { value }) => {
        const eventFilter = (event) => {
            return event instanceof MouseEvent ? true : event.touches.length < 2;
        };
        const eventMapper = (event) => {
            return event instanceof MouseEvent
                ? {
                    clientX: event.clientX,
                    clientY: event.clientY,
                }
                : {
                    clientX: event.touches[0].clientX,
                    clientY: event.touches[0].clientX,
                };
        };
        const setup = ([startKey, moveKey, endKey], filter, mapper) => {
            const callback = (event) => {
                if (!filter(event)) {
                    return;
                }
                const mappedEvent = mapper(event);
                let currentPosition = {
                    x: mappedEvent.clientX,
                    y: mappedEvent.clientY,
                };
                const move = (moveEvent) => {
                    if (!filter(moveEvent)) {
                        return;
                    }
                    const mappedMoveEvent = mapper(moveEvent);
                    value.onEvent(element, [
                        mappedMoveEvent.clientX - currentPosition.x,
                        mappedMoveEvent.clientY - currentPosition.y,
                    ]);
                    currentPosition = {
                        x: mappedMoveEvent.clientX,
                        y: mappedMoveEvent.clientY,
                    };
                };
                const end = () => {
                    document.removeEventListener(moveKey, move);
                    document.removeEventListener(endKey, end);
                    document[DRAG_DROP_INSTANCE_KEY + endKey] = null;
                    document[DRAG_DROP_INSTANCE_KEY + moveKey] = null;
                };
                document.removeEventListener(endKey, end);
                document.addEventListener(moveKey, move);
                document.addEventListener(endKey, end);
                document[DRAG_DROP_INSTANCE_KEY + endKey] = end;
                document[DRAG_DROP_INSTANCE_KEY + moveKey] = move;
            };
            element.addEventListener(startKey, callback);
            element[`${DRAG_DROP_INSTANCE_KEY}${startKey}`] = callback;
        };
        setup(touchEvents, eventFilter, eventMapper);
        setup(mouseEvents, eventFilter, eventMapper);
    },
    beforeUnmount: (element) => {
        [...touchEvents, ...mouseEvents].forEach((key) => {
            const documentCallback = document[`${DRAG_DROP_INSTANCE_KEY}${key}`];
            const elementCallback = element[`${DRAG_DROP_INSTANCE_KEY}${key}`];
            if (documentCallback) {
                document.removeEventListener(key, documentCallback);
            }
            if (elementCallback) {
                element.removeEventListener(key, elementCallback);
            }
        });
    },
};

const OPTIONS = {
    threshold: 1.0,
};
const IntersectionDirective = {
    mounted(el, { value }) {
        const { onIntersect, isObserve = true, disconnectAfterIntersect = true, options = {}, } = value;
        if (!isObserve) {
            return;
        }
        const cb = ([entry]) => {
            const { isIntersecting } = entry;
            if (isIntersecting) {
                onIntersect(entry);
                if (disconnectAfterIntersect) {
                    el.__observer_intersection.disconnect();
                }
            }
        };
        el.__observer_intersection = new IntersectionObserver(cb, {
            ...OPTIONS,
            ...options,
            root: typeof options.root === "function"
                ? options.root()
                : options.root,
        });
        el.__observer_intersection.observe(el);
    },
    beforeUnmount(el) {
        el.__observer_intersection && el.__observer_intersection.disconnect();
    },
};

export { AutoFocusDirective, ClickOutsideDirective, DragDropDirective, IntersectionDirective };
