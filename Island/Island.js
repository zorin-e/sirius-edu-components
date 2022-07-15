this.smartmed = this.smartmed || {};
this.smartmed.Island = (function (vue, LineClamp) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var LineClamp__default = /*#__PURE__*/_interopDefaultLegacy(LineClamp);

  var script = vue.defineComponent({
      components: {
          LineClamp: LineClamp__default["default"],
      },
      name: "Island",
      props: {
          title: String,
          description: String,
          isLoading: Boolean,
      },
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_line_clamp = vue.resolveComponent("line-clamp");

    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(_ctx.$style.island)
    }, [
      vue.createElementVNode("div", null, [
        vue.renderSlot(_ctx.$slots, "image")
      ]),
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.$style.content)
      }, [
        vue.createElementVNode("h5", {
          class: vue.normalizeClass([
            _ctx.$style.title,
            'smed-text_h5 smed-text_medium',
            _ctx.isLoading && 'mds-skeleton mds-skeleton_short',
          ])
        }, vue.toDisplayString(_ctx.title), 3),
        vue.createElementVNode("p", {
          class: vue.normalizeClass([
            _ctx.$style.description,
            'smed-text_body-xl',
            _ctx.isLoading && 'mds-skeleton',
          ])
        }, [
          vue.createVNode(_component_line_clamp, {
            "line-height": 24,
            "lines-limit": 2
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(_ctx.description), 1)
            ]),
            _: 1
          })
        ], 2),
        (_ctx.$slots.footer)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(_ctx.$style.footer)
            }, [
              vue.renderSlot(_ctx.$slots, "footer")
            ], 2))
          : vue.createCommentVNode("", true)
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

  return script;

})(Vue, LineClamp);
