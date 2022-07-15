this.smartmed = this.smartmed || {};
this.smartmed.BackButton = (function (vue, SvgIcon) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var SvgIcon__default = /*#__PURE__*/_interopDefaultLegacy(SvgIcon);

  var script = vue.defineComponent({
      name: "BackButton",
      components: {
          SvgIcon: SvgIcon__default["default"],
      },
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_svg_icon = vue.resolveComponent("svg-icon");

    return (vue.openBlock(), vue.createElementBlock("button", {
      tabindex: "0",
      class: vue.normalizeClass(['smed-text_body-md', _ctx.$style.button])
    }, [
      vue.createVNode(_component_svg_icon, {
        name: "arrow-back",
        class: vue.normalizeClass(_ctx.$style.icon)
      }, null, 8, ["class"]),
      vue.createElementVNode("span", null, [
        vue.renderSlot(_ctx.$slots, "default")
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

  var css_248z = "._button_q1cbs_1 {\n  appearance: none;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: inherit;\n  line-height: inherit;\n  transition: color 0.2s linear;\n  display: flex;\n  align-items: center;\n  color: var(--smed-base-03);\n  text-transform: uppercase;\n  cursor: pointer;\n}\n._button_q1cbs_1:focus, ._button_q1cbs_1:active {\n  outline: none;\n}\n._button_q1cbs_1:hover {\n  color: var(--smed-base-04);\n}\n._button_q1cbs_1:active, ._button_q1cbs_1:focus {\n  color: var(--smed-base-05);\n}\n._icon_q1cbs_25 {\n  margin-right: 5px;\n}";
  styleInject(css_248z);

  var style0 = {"button":"_button_q1cbs_1","icon":"_icon_q1cbs_25"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(Vue, SvgIcon);
