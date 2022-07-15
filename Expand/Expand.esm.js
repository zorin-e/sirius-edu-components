import { defineComponent, ref, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, renderSlot, createVNode, createCommentVNode } from 'vue';
import SvgIcon from '@smartmed/webpatient-vue-components/SvgIcon';

var script = defineComponent({
    components: {
        SvgIcon,
    },
    setup() {
        const opened = ref(false);
        const toggle = () => {
            opened.value = !opened.value;
        };
        return {
            opened,
            toggle,
        };
    },
});

const _hoisted_1 = { key: 0 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");

  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("div", {
      tabindex: "0",
      class: normalizeClass([_ctx.$style.expandable, _ctx.opened && _ctx.$style.expandable_opened]),
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.toggle && _ctx.toggle(...args)))
    }, [
      renderSlot(_ctx.$slots, "default"),
      createVNode(_component_svg_icon, {
        name: "arrow-down",
        class: normalizeClass([_ctx.$style.icon, _ctx.opened && _ctx.$style.icon_rotated])
      }, null, 8, ["class"])
    ], 2),
    (_ctx.opened)
      ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "content")
        ]))
      : createCommentVNode("", true)
  ]))
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

var css_248z = "._expandable_1ka90_1 {\n  transition: color 0.2s linear;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  cursor: pointer;\n}\n._expandable_1ka90_1:hover, ._expandable_opened_1ka90_9 {\n  color: var(--smed-base-04);\n}\n._icon_1ka90_13 {\n  transition: transform 0.2s linear;\n}\n._icon_rotated_1ka90_16 {\n  transform: rotate(180deg);\n}";
styleInject(css_248z);

var style0 = {"expandable":"_expandable_1ka90_1","expandable_opened":"_expandable_opened_1ka90_9","icon":"_icon_1ka90_13","icon_rotated":"_icon_rotated_1ka90_16"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
