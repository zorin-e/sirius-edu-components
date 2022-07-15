'use strict';

var vue = require('vue');
var ActiveZone = require('@smartmed/webpatient-vue-components/ActiveZone');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ActiveZone__default = /*#__PURE__*/_interopDefaultLegacy(ActiveZone);

const DEFAULT_MARGIN = 8;
const DEFAULT_MAX_HEIGHT = 400;
const DEFAULT_MIN_HEIGHT = 80;
var script = vue.defineComponent({
    components: {
        ActiveZone: ActiveZone__default["default"],
    },
    name: "DropdownHost",
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        canOpen: {
            type: Boolean,
            default: true,
        },
        minHeight: {
            type: Number,
        },
        maxHeight: {
            type: Number,
            default: DEFAULT_MAX_HEIGHT,
        },
        maxWidth: {
            type: Number,
        },
        minWidth: {
            type: Number,
        },
        align: {
            type: String,
            default: "right",
            validatior: (value) => ["left", "right"].includes(value),
        },
        direction: {
            type: String,
            default: "bottom",
            validator: (value) => ["top", "bottom"].includes(value),
        },
    },
    setup(props, { emit }) {
        const { modelValue, canOpen, maxHeight, maxWidth, minHeight, direction, minWidth, } = vue.toRefs(props);
        const styledMaxHeight = vue.ref(null);
        const styledTop = vue.ref(null);
        const styledBottom = vue.ref(null);
        const host = vue.ref(null);
        const dropdown = vue.ref(null);
        vue.watch(canOpen, (value, oldValue) => {
            if (oldValue && !value) {
                emit("update:modelValue", false);
            }
        });
        const dropdownStyle = vue.computed(() => {
            const _maxWidth = maxWidth.value;
            const _minWidth = minWidth.value;
            const _maxHeight = styledMaxHeight.value;
            return {
                "max-width": _maxWidth ? `${_maxWidth}px` : null,
                "min-width": _minWidth ? `${_minWidth}px` : null,
                "max-height": _maxHeight ? `${_maxHeight}px` : null,
                top: styledTop.value,
                bottom: styledBottom.value,
            };
        });
        const toggleOpen = () => {
            if (canOpen.value) {
                emit("update:modelValue", !modelValue.value);
            }
        };
        const hide = () => {
            if (modelValue.value) {
                emit("update:modelValue", false);
            }
        };
        const activeZoneChanged = (value) => {
            if (!value) {
                hide();
            }
        };
        const prevDirectionIsTop = vue.ref(false);
        const getFinalDirection = (hostRect) => {
            const windowHeight = window.innerHeight;
            const topAvailableHeight = hostRect.top - DEFAULT_MARGIN;
            const bottomAvailableHeight = windowHeight - hostRect.bottom - DEFAULT_MARGIN;
            const boxHeightLimit = Math.min(maxHeight.value, windowHeight - DEFAULT_MARGIN);
            const visualHeight = Math.min(Math.max(dropdown.value.getBoundingClientRect().height, minHeight.value || DEFAULT_MIN_HEIGHT), boxHeightLimit);
            let finalDirection = null;
            switch (direction.value) {
                case "top":
                    if (topAvailableHeight >= (minHeight.value || visualHeight)) {
                        finalDirection = "top";
                    }
                    break;
                case "bottom":
                    if (bottomAvailableHeight >= (minHeight.value || visualHeight)) {
                        finalDirection = "bottom";
                    }
                    break;
            }
            if (finalDirection === null) {
                if (prevDirectionIsTop.value && topAvailableHeight >= visualHeight) {
                    finalDirection = "top";
                }
                else if (bottomAvailableHeight >= visualHeight) {
                    finalDirection = "bottom";
                }
                else {
                    finalDirection =
                        bottomAvailableHeight >= topAvailableHeight ? "bottom" : "top";
                }
            }
            return finalDirection;
        };
        const calculatePosition = () => {
            if (!host.value || !dropdown.value) {
                return;
            }
            const windowHeight = window.innerHeight;
            const hostRect = host.value.activeZone.getBoundingClientRect();
            const boxHeightLimit = Math.min(maxHeight.value, windowHeight - DEFAULT_MARGIN);
            const topAvailableHeight = hostRect.top - DEFAULT_MARGIN;
            const bottomAvailableHeight = windowHeight - hostRect.bottom - DEFAULT_MARGIN;
            const finalDirection = getFinalDirection(hostRect);
            prevDirectionIsTop.value = finalDirection === "top";
            if (finalDirection === "top") {
                styledMaxHeight.value = Math.min(boxHeightLimit, topAvailableHeight);
                styledTop.value = "auto";
                styledBottom.value = `100%`;
            }
            else {
                styledMaxHeight.value = Math.min(boxHeightLimit, bottomAvailableHeight);
                styledTop.value = `100%`;
                styledBottom.value = "auto";
            }
        };
        vue.onMounted(() => {
            if (modelValue.value && canOpen.value) {
                calculatePosition();
            }
        });
        vue.onUpdated(() => {
            if (modelValue.value && canOpen.value) {
                calculatePosition();
            }
        });
        vue.watch(modelValue, (value) => {
            if (!canOpen.value) {
                return;
            }
            if (!value) {
                window.removeEventListener("scroll", calculatePosition);
                window.removeEventListener("resize", calculatePosition);
            }
            else {
                window.addEventListener("scroll", calculatePosition);
                window.addEventListener("resize", calculatePosition);
            }
        });
        vue.onBeforeUnmount(() => {
            window.removeEventListener("scroll", calculatePosition);
            window.removeEventListener("resize", calculatePosition);
        });
        return {
            hide,
            toggleOpen,
            activeZoneChanged,
            dropdownStyle,
            host,
            dropdown,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_active_zone = vue.resolveComponent("active-zone");

  return (vue.openBlock(), vue.createBlock(_component_active_zone, {
    ref: "host",
    class: vue.normalizeClass(_ctx.$style.container),
    onKeyup: vue.withKeys(vue.withModifiers(_ctx.hide, ["stop"]), ["esc"]),
    onActiveZoneChanged: _ctx.activeZoneChanged
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.$style.content),
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => (_ctx.toggleOpen && _ctx.toggleOpen(...args)), ["stop","prevent"]))
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 2),
      (_ctx.canOpen)
        ? (vue.openBlock(), vue.createBlock(vue.Transition, {
            key: 0,
            name: "fade"
          }, {
            default: vue.withCtx(() => [
              (_ctx.modelValue)
                ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass([_ctx.$style.dropdown, _ctx.$style['dropdown_' + _ctx.align]]),
                    style: vue.normalizeStyle(_ctx.dropdownStyle),
                    ref: "dropdown"
                  }, [
                    vue.renderSlot(_ctx.$slots, "dropdown")
                  ], 6))
                : vue.createCommentVNode("", true)
            ]),
            _: 3
          }))
        : vue.createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class", "onKeyup", "onActiveZoneChanged"]))
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

var css_248z = "._container_1j17e_1 {\n  position: relative;\n  display: inline-flex;\n}\n._content_1j17e_6 {\n  border-radius: inherit;\n  height: inherit;\n  flex: 1 1 auto;\n  width: 100%;\n}\n._dropdown_1j17e_13 {\n  position: absolute;\n  overflow: hidden;\n  top: 100%;\n  width: 100%;\n  padding: 2px 0;\n  background-color: var(--smed-base-09);\n  border-radius: 8px;\n  box-sizing: border-box;\n  box-shadow: 0px 5px 16px -4px rgba(0, 0, 0, 0.2);\n  border: 1px solid var(--smed-base-08);\n  z-index: 1;\n}\n._dropdown_right_1j17e_26 {\n  right: 0;\n}\n._dropdown_left_1j17e_29 {\n  left: 0;\n}\n._dropdown_top_1j17e_32 {\n  top: 0;\n  transform: translateY(-100%);\n}\n._dropdown_bottom_1j17e_36 {\n  top: 100%;\n}";
styleInject(css_248z);

var style0 = {"container":"_container_1j17e_1","content":"_content_1j17e_6","dropdown":"_dropdown_1j17e_13","dropdown_right":"_dropdown_right_1j17e_26","dropdown_left":"_dropdown_left_1j17e_29","dropdown_top":"_dropdown_top_1j17e_32","dropdown_bottom":"_dropdown_bottom_1j17e_36"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
