'use strict';

var SpinnerIcon = require('@smartmed/webpatient-vue-components/assets/svg/spinner.svg');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);

var script = {
    name: "Spinner",
    components: {
        SpinnerIcon: SpinnerIcon__default["default"],
    },
    props: {
        size: {
            type: String,
            default: "md",
            validator: (value) => ["xs", "sm", "md"].includes(value),
        },
        theme: {
            type: String,
            default: "default",
            validator: (value) => ["default", "primary"].includes(value),
        },
    },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_spinner_icon = vue.resolveComponent("spinner-icon");

  return (vue.openBlock(), vue.createElementBlock("span", null, [
    vue.createVNode(_component_spinner_icon, {
      class: vue.normalizeClass([_ctx.$style[$props.size], _ctx.$style[$props.theme]])
    }, null, 8, ["class"])
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

var css_248z = "._xs_u8hlg_1 {\n  width: 20px;\n  height: 20px;\n}\n._sm_u8hlg_6 {\n  width: 24px;\n  height: 24px;\n}\n._md_u8hlg_11 {\n  width: 28px;\n  height: 28px;\n}\n._default_u8hlg_16 {\n  color: var(--smed-base-09);\n}\n._primary_u8hlg_20 {\n  color: var(--smed-primary);\n}";
styleInject(css_248z);

var style0 = {"xs":"_xs_u8hlg_1","sm":"_sm_u8hlg_6","md":"_md_u8hlg_11","default":"_default_u8hlg_16","primary":"_primary_u8hlg_20"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
