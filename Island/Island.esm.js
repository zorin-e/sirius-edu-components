import { defineComponent, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, toDisplayString, createVNode, withCtx, createTextVNode, createCommentVNode } from 'vue';
import LineClamp from '@smartmed/webpatient-vue-components/LineClamp';

var script = defineComponent({
    components: {
        LineClamp,
    },
    name: "Island",
    props: {
        title: String,
        description: String,
        isLoading: Boolean,
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_line_clamp = resolveComponent("line-clamp");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.island)
  }, [
    createElementVNode("div", null, [
      renderSlot(_ctx.$slots, "image")
    ]),
    createElementVNode("div", {
      class: normalizeClass(_ctx.$style.content)
    }, [
      createElementVNode("h5", {
        class: normalizeClass([
          _ctx.$style.title,
          'smed-text_h5 smed-text_medium',
          _ctx.isLoading && 'mds-skeleton mds-skeleton_short',
        ])
      }, toDisplayString(_ctx.title), 3),
      createElementVNode("p", {
        class: normalizeClass([
          _ctx.$style.description,
          'smed-text_body-xl',
          _ctx.isLoading && 'mds-skeleton',
        ])
      }, [
        createVNode(_component_line_clamp, {
          "line-height": 24,
          "lines-limit": 2
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.description), 1)
          ]),
          _: 1
        })
      ], 2),
      (_ctx.$slots.footer)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.footer)
          }, [
            renderSlot(_ctx.$slots, "footer")
          ], 2))
        : createCommentVNode("", true)
    ], 2)
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

var css_248z = "._island_f2wmm_1 {\n  display: flex;\n  flex-direction: column;\n  border-radius: 12px;\n  background-color: var(--smed-base-09);\n  cursor: pointer;\n  overflow: hidden;\n}\n._island_f2wmm_1:hover {\n  box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.12);\n}\n._content_f2wmm_13 {\n  display: flex;\n  flex-direction: column;\n  padding: 16px 20px;\n  flex: 1;\n}\n._title_f2wmm_20 {\n  margin-bottom: 8px;\n}\n._description_f2wmm_24 {\n  color: var(--smed-base-03);\n  margin-bottom: 44px;\n}\n._footer_f2wmm_29 {\n  margin-top: auto;\n}";
styleInject(css_248z);

var style0 = {"island":"_island_f2wmm_1","content":"_content_f2wmm_13","title":"_title_f2wmm_20","description":"_description_f2wmm_24","footer":"_footer_f2wmm_29"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
