import { defineComponent, toRefs, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, Fragment, renderList, renderSlot, createElementVNode, toDisplayString, createBlock, createCommentVNode, mergeProps, withCtx, createTextVNode } from 'vue';
import Spinner from '@smartmed/webpatient-vue-components/Spinner';
import VirtualList from '@smartmed/webpatient-vue-components/VirtualList';
import SvgIcon from '@smartmed/webpatient-vue-components/SvgIcon';

var script = defineComponent({
    components: {
        Spinner,
        SvgIcon,
        VirtualList,
    },
    name: "DataList",
    props: {
        modelValue: {
            type: [String, Number, Object, null],
            required: true,
        },
        items: {
            type: [Array, null],
            required: true,
        },
        isVirtual: {
            type: Boolean,
        },
        size: {
            type: String,
            default: "md",
            validator: (value) => ["sm", "md", "lg"].includes(value),
        },
        matcher: {
            type: Function,
            default: (value, item) => value === item,
        },
    },
    setup(props) {
        const { items, size } = toRefs(props);
        const isLoading = computed(() => items.value === null);
        const iconSize = computed(() => {
            return size.value === "sm" ? "md" : "lg";
        });
        return {
            isLoading,
            iconSize,
        };
    },
});

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = /*#__PURE__*/createTextVNode(" Ничего не найдено ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_spinner = resolveComponent("spinner");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_virtual_list = resolveComponent("virtual-list");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.list)
  }, [
    (_ctx.isLoading)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([_ctx.$style.spinner, _ctx.$style[_ctx.size]])
        }, [
          createVNode(_component_spinner, {
            theme: "primary",
            size: "md"
          })
        ], 2))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          (_ctx.items.length > 0)
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                (!_ctx.isVirtual)
                  ? (openBlock(), createElementBlock("ul", _hoisted_1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                        return (openBlock(), createElementBlock("li", {
                          key: index,
                          class: normalizeClass([
              'smed-text_body-xl',
              _ctx.$style.item,
              _ctx.$style.item_hoverable,
              _ctx.$style[_ctx.size],
            ]),
                          onClick: $event => (_ctx.$emit('update:modelValue', item))
                        }, [
                          renderSlot(_ctx.$slots, "itemContent", {
                            item: item,
                            active: _ctx.matcher(_ctx.modelValue, item)
                          }, () => [
                            createElementVNode("span", null, toDisplayString(item), 1),
                            (_ctx.matcher(_ctx.modelValue, item))
                              ? (openBlock(), createBlock(_component_svg_icon, {
                                  key: 0,
                                  name: "check",
                                  class: normalizeClass(_ctx.$style.icon),
                                  size: _ctx.iconSize
                                }, null, 8, ["class", "size"]))
                              : createCommentVNode("", true)
                          ])
                        ], 10, _hoisted_2))
                      }), 128)),
                      (_ctx.$slots.action)
                        ? (openBlock(), createElementBlock("li", {
                            key: 0,
                            class: normalizeClass([
              'smed-text_body-xl',
              _ctx.$style.item,
              _ctx.$style.item_hoverable,
              _ctx.$style[_ctx.size],
            ])
                          }, [
                            renderSlot(_ctx.$slots, "action")
                          ], 2))
                        : createCommentVNode("", true)
                    ]))
                  : (openBlock(), createBlock(_component_virtual_list, mergeProps({ key: 1 }, _ctx.$attrs, { items: _ctx.items }), {
                      default: withCtx(({ item }) => [
                        createElementVNode("li", {
                          class: normalizeClass([
                'smed-text_body-xl',
                _ctx.$style.item,
                _ctx.$style.item_hoverable,
                _ctx.$style[_ctx.size],
              ]),
                          onClick: $event => (_ctx.$emit('update:modelValue', item))
                        }, [
                          renderSlot(_ctx.$slots, "itemContent", {
                            item: item,
                            active: _ctx.matcher(_ctx.modelValue, item)
                          }, () => [
                            createElementVNode("span", null, toDisplayString(item), 1),
                            (_ctx.matcher(_ctx.modelValue, item))
                              ? (openBlock(), createBlock(_component_svg_icon, {
                                  key: 0,
                                  name: "check",
                                  class: normalizeClass(_ctx.$style.icon),
                                  size: _ctx.iconSize
                                }, null, 8, ["class", "size"]))
                              : createCommentVNode("", true)
                          ])
                        ], 10, _hoisted_3)
                      ]),
                      after: withCtx(() => [
                        renderSlot(_ctx.$slots, "action")
                      ]),
                      _: 3
                    }, 16, ["items"]))
              ], 64))
            : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass([
          'smed-text_body-xl',
          _ctx.$style.item,
          _ctx.$style.item_notFound,
          _ctx.$style[_ctx.size],
        ])
              }, [
                renderSlot(_ctx.$slots, "emptyContent", {}, () => [
                  _hoisted_4
                ])
              ], 2))
        ], 64))
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

var css_248z = "._list_3xxas_1 {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: inherit;\n  overflow-y: auto;\n}\n._sm_3xxas_9 {\n  padding: 6px 8px;\n}\n._md_3xxas_13 {\n  padding: 8px 12px;\n}\n._lg_3xxas_17 {\n  padding: 12px 16px;\n}\n._icon_3xxas_21 {\n  display: inline-flex;\n  align-self: center;\n}\n._spinner_3xxas_26 {\n  text-align: center;\n}\n._item_3xxas_30 {\n  transition: background-color 0.2s linear;\n  display: flex;\n  justify-content: space-between;\n  cursor: pointer;\n}\n._item_notFound_3xxas_36 {\n  cursor: default;\n  color: var(--smed-base-03);\n}\n._item_hoverable_3xxas_40:hover {\n  background-color: var(--smed-base-08);\n}";
styleInject(css_248z);

var style0 = {"list":"_list_3xxas_1","sm":"_sm_3xxas_9","md":"_md_3xxas_13","lg":"_lg_3xxas_17","icon":"_icon_3xxas_21","spinner":"_spinner_3xxas_26","item":"_item_3xxas_30","item_notFound":"_item_notFound_3xxas_36","item_hoverable":"_item_hoverable_3xxas_40"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
