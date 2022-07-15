'use strict';

var vue = require('vue');
var Tag = require('@smartmed/webpatient-vue-components/Tag');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Tag__default = /*#__PURE__*/_interopDefaultLegacy(Tag);

const PLUS_CHAR = "\u002B";
var script = vue.defineComponent({
    components: { Tag: Tag__default["default"] },
    props: {
        value: {
            type: [String, Number, null],
            default: null,
        },
        color: {
            type: String,
        },
    },
    setup(props) {
        const { value } = vue.toRefs(props);
        const computedValue = vue.computed(() => {
            if (value.value === null) {
                return null;
            }
            if (typeof value.value === "number") {
                return value.value > 99 ? `99${PLUS_CHAR}` : `${value.value}`;
            }
            return value.value || "\u0020";
        });
        return {
            computedValue,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tag = vue.resolveComponent("tag");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.$style.host)
  }, [
    vue.createElementVNode("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    (_ctx.computedValue !== null)
      ? (vue.openBlock(), vue.createBlock(_component_tag, {
          key: 0,
          size: "xxs",
          clickable: false,
          color: _ctx.color,
          class: vue.normalizeClass(_ctx.$style.notification)
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(_ctx.computedValue), 1)
          ]),
          _: 1
        }, 8, ["color", "class"]))
      : vue.createCommentVNode("", true)
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

var css_248z = "._host_1qkb4_1 {\n  position: relative;\n  display: inline-block;\n}\n._notification_1qkb4_6 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  transform: translate(50%, -50%);\n}";
styleInject(css_248z);

var style0 = {"host":"_host_1qkb4_1","notification":"_notification_1qkb4_6"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
