import { defineComponent, inject, toRefs, ref, computed, onMounted, onUnmounted, watch, resolveDirective, openBlock, createElementBlock, normalizeClass, withDirectives, createElementVNode, normalizeStyle, Fragment, renderList, renderSlot } from 'vue';
import { isMobile, clamp } from '@smartmed/webpatient-vue-components/domain';
import { DragDropDirective, IntersectionDirective } from '@smartmed/webpatient-vue-components/directives';
import { EVENT_TUNNEL_TOKEN } from '@smartmed/webpatient-vue-components/tokens';
import { throttle } from '@smartmed/webpatient-vue-components/infrastructure';

const CAROUSEL_SCROLL_INSTANCE_KEY = "__smartmed_carouselScroll__";
const CarouselScrollDirective = {
    beforeMount(element, { value }) {
        const callback = throttle((num) => {
            value.onEvent(num);
        }, 500);
        const wheel = ({ deltaX }) => {
            if (Math.abs(deltaX) <= 20) {
                return;
            }
            callback(Math.sign(deltaX));
            element.scrollLeft = 10;
        };
        if (!isMobile()) {
            element.addEventListener("wheel", wheel);
            element[CAROUSEL_SCROLL_INSTANCE_KEY] = wheel;
        }
    },
    beforeUnmount(element) {
        if (element[CAROUSEL_SCROLL_INSTANCE_KEY]) {
            element.removeEventListener("wheel", element[CAROUSEL_SCROLL_INSTANCE_KEY]);
        }
    },
};

var script = defineComponent({
    name: "Carousel",
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        itemsCount: {
            type: Number,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        draggable: {
            type: Boolean,
        },
        autoScrollLooping: {
            type: Boolean,
        },
    },
    directives: {
        "drag-drop": DragDropDirective,
        intersection: IntersectionDirective,
        "carousel-scroll": CarouselScrollDirective,
    },
    setup(props, { emit }) {
        const autoScrollEvents = inject(EVENT_TUNNEL_TOKEN, null);
        const { itemsCount, modelValue, items, draggable, autoScrollLooping } = toRefs(props);
        const transitioned = ref(true);
        const translate = ref(0);
        const host = ref(null);
        const intersectionRoot = ref(null);
        const computedStyle = computed(() => {
            const percent = `${100 / itemsCount.value}%`;
            return {
                minWidth: percent,
                maxWidth: percent,
                flexBasis: percent,
            };
        });
        const computedTranslate = computed(() => -modelValue.value / itemsCount.value);
        const transform = computed(() => {
            const x = transitioned.value ? computedTranslate.value : translate.value;
            return {
                transform: `translateX(${100 * x}%)`,
            };
        });
        const computedDraggable = computed(() => isMobile() || draggable.value);
        onMounted(() => {
            const element = host.value;
            if (element) {
                element.addEventListener("touchstart", startTouch);
                element.addEventListener("touchend", endTouch);
                element.addEventListener("mousedown", startTouch);
                document.addEventListener("mouseup", endTouch);
            }
        });
        onUnmounted(() => {
            const element = host.value;
            if (element) {
                element.removeEventListener("touchstart", startTouch);
                element.removeEventListener("touchend", endTouch);
                element.removeEventListener("mousedown", startTouch);
                document.removeEventListener("mouseup", endTouch);
            }
        });
        if (autoScrollEvents) {
            watch(autoScrollEvents, () => {
                onAutoScroll();
            });
        }
        const updateIndex = (index) => {
            const offsetCount = items.value.length >= itemsCount.value
                ? itemsCount.value
                : items.value.length;
            emit("update:modelValue", clamp(index, 0, items.value.length - offsetCount));
        };
        watch(itemsCount, () => {
            updateIndex(0);
        });
        const next = () => {
            updateIndex(modelValue.value + 1);
        };
        const prev = () => {
            updateIndex(modelValue.value - 1);
        };
        const onDragDrop = (element, [offsetX]) => {
            if (!computedDraggable.value) {
                return;
            }
            const { clientWidth } = element;
            const min = 1 - items.value.length / itemsCount.value;
            translate.value = clamp(offsetX / clientWidth + translate.value, min, 0);
        };
        const onAutoScroll = () => {
            const loopingIndex = modelValue.value === items.value.length - 1 ? 0 : modelValue.value + 1;
            const index = autoScrollLooping.value
                ? loopingIndex
                : clamp(modelValue.value + 1, 0, items.value.length - 1);
            updateIndex(index);
            if (!autoScrollLooping.value && index === items.value.length - 1) {
                emit("autoscroll-end");
            }
        };
        const startTouch = () => {
            transitioned.value = false;
            translate.value = computedTranslate.value;
        };
        const endTouch = () => {
            transitioned.value = true;
        };
        const onIntersect = (index, { intersectionRatio }) => {
            if (intersectionRatio && intersectionRatio !== 1 && !transitioned.value) {
                updateIndex(index - Math.floor(itemsCount.value / 2));
            }
        };
        const onScroll = (delta) => {
            updateIndex(modelValue.value + delta);
        };
        return {
            computedStyle,
            transform,
            transitioned,
            onDragDrop,
            host,
            onIntersect,
            intersectionRoot,
            onScroll,
            next,
            prev,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_intersection = resolveDirective("intersection");
  const _directive_drag_drop = resolveDirective("drag-drop");
  const _directive_carousel_scroll = resolveDirective("carousel-scroll");

  return (openBlock(), createElementBlock("div", {
    ref: "host",
    ondragstart: "return false;",
    class: normalizeClass([_ctx.$style.container, _ctx.draggable && _ctx.$style.container_draggable])
  }, [
    withDirectives((openBlock(), createElementBlock("div", {
      class: normalizeClass(_ctx.$style.scroller)
    }, [
      createElementVNode("div", {
        class: normalizeClass(_ctx.$style.wrapper)
      }, [
        withDirectives((openBlock(), createElementBlock("div", {
          class: normalizeClass([_ctx.$style.items, _ctx.transitioned && _ctx.$style.items_transitioned]),
          style: normalizeStyle(_ctx.transform)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
            return withDirectives((openBlock(), createElementBlock("div", {
              key: item,
              style: normalizeStyle(_ctx.computedStyle),
              class: normalizeClass(_ctx.$style.item)
            }, [
              renderSlot(_ctx.$slots, "default", { item: item })
            ], 6)), [
              [_directive_intersection, {
              options: {
                threshold: [0.01, 0.01],
                rootMargin: '100px 100000px 100px -51%',
                root: () => _ctx.$refs.host,
              },
              disconnectAfterIntersect: false,
              isObserve: true,
              onIntersect: _ctx.onIntersect.bind(null, index),
            }]
            ])
          }), 128))
        ], 6)), [
          [_directive_drag_drop, { onEvent: _ctx.onDragDrop }]
        ])
      ], 2)
    ], 2)), [
      [_directive_carousel_scroll, { onEvent: _ctx.onScroll }]
    ])
  ], 2))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "._container_uernr_1 {\n  position: relative;\n  display: block;\n  overflow: hidden;\n}\n._container_draggable_uernr_6 {\n  user-select: none;\n}\n._container_draggable_uernr_6:hover {\n  cursor: grab;\n}\n._container_draggable_uernr_6:active {\n  cursor: grabbing;\n}\n._scroller_uernr_16 {\n  display: flex;\n  overflow: auto;\n  overscroll-behavior-x: none;\n  padding-bottom: 2rem;\n  margin-bottom: -2rem;\n}\n._scroller_uernr_16:before, ._scroller_uernr_16:after {\n  content: \"\";\n  display: block;\n  min-width: 1rem;\n}\n._items_uernr_29 {\n  display: flex;\n  align-items: center;\n}\n._items_transitioned_uernr_33 {\n  transition: transform 0.4s ease;\n}\n._wrapper_uernr_37 {\n  position: sticky;\n  left: 0;\n  right: 0;\n  min-width: 100%;\n  overflow: hidden;\n}\n._item_uernr_29 {\n  padding: 0 8px;\n}";
styleInject(css_248z);

var style0 = {"container":"_container_uernr_1","container_draggable":"_container_draggable_uernr_6","scroller":"_scroller_uernr_16","items":"_items_uernr_29","items_transitioned":"_items_transitioned_uernr_33","wrapper":"_wrapper_uernr_37","item":"_item_uernr_29"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
