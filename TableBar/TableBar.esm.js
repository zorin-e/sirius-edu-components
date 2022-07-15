import { defineComponent, resolveComponent, openBlock, createBlock, withCtx, createVNode, Transition, createElementBlock, normalizeClass, createElementVNode, renderSlot, createCommentVNode } from 'vue';
import Portal from '@smartmed/webpatient-vue-components/Portal';

var script = defineComponent({
    name: "TableBar",
    components: {
        Portal,
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    setup(_, { emit }) {
        const closeFn = () => {
            emit("update:modelValue", false);
        };
        return {
            closeFn,
        };
    },
});

const _hoisted_1 = { class: "smed-table-bar__content" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = resolveComponent("Portal");

  return (openBlock(), createBlock(_component_Portal, null, {
    default: withCtx(() => [
      createVNode(Transition, {
        appear: "",
        name: "smed-table-bar"
      }, {
        default: withCtx(() => [
          (_ctx.modelValue)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass([_ctx.$style.tableBar, 'smed-table-bar'])
              }, [
                createElementVNode("div", _hoisted_1, [
                  renderSlot(_ctx.$slots, "default", { close: _ctx.closeFn })
                ])
              ], 2))
            : createCommentVNode("", true)
        ]),
        _: 3
      })
    ]),
    _: 3
  }))
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

var css_248z = "._tableBar_118fi_1 {\n  position: fixed;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  background-color: var(--smed-base-09);\n  color: var(--smed-base-01);\n  box-shadow: 0px 36px 75px #c7bdbd;\n}";
styleInject(css_248z);

var style0 = {"tableBar":"_tableBar_118fi_1"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
