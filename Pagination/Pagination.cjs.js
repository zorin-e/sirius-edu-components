'use strict';

var vue = require('vue');
var tokens = require('@smartmed/webpatient-vue-components/tokens');

var script = vue.defineComponent({
    name: "Pagination",
    props: {
        size: {
            type: String,
            default: "sm",
            validator: (value) => ["sm", "md"].includes(value),
        },
        length: {
            type: Number,
            required: true,
        },
        modelValue: {
            type: Number,
            required: true,
        },
        wrappable: Boolean,
    },
    setup(props) {
        const authSwitchingProgress = vue.inject(tokens.EVENT_TUNNEL_PROGRESS_TOKEN, null);
        const { length, size } = vue.toRefs(props);
        const computedStyle = vue.computed(() => {
            if (size.value === "md") {
                return {
                    width: `${100 / length.value}%`,
                };
            }
            return {};
        });
        const hasAutoProgress = vue.computed(() => authSwitchingProgress !== null);
        const activeElementStyle = vue.computed(() => {
            return {
                transform: authSwitchingProgress
                    ? `translateX(${authSwitchingProgress.value * 100 - 100}%)`
                    : `translateX(0)`,
            };
        });
        return {
            computedStyle,
            activeElementStyle,
            authSwitchingProgress,
            hasAutoProgress,
        };
    },
});

const _hoisted_1 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([
      _ctx.$style.container,
      _ctx.$style['container_' + _ctx.size],
      _ctx.wrappable && _ctx.$style.container_wrappable,
    ])
  }, [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.length, (index) => {
      return (vue.openBlock(), vue.createElementBlock("button", {
        key: index,
        class: vue.normalizeClass(_ctx.$style.button),
        style: vue.normalizeStyle(_ctx.computedStyle),
        onClick: $event => (_ctx.$emit('update:modelValue', index - 1))
      }, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass([
          _ctx.$style.content,
          _ctx.hasAutoProgress
            ? _ctx.modelValue >= index - 1 && _ctx.$style.content_active
            : _ctx.modelValue === index - 1 && _ctx.$style.content_active,
        ]),
          style: vue.normalizeStyle(
          _ctx.hasAutoProgress && _ctx.modelValue == index - 1 ? _ctx.activeElementStyle : {}
        )
        }, null, 6)
      ], 14, _hoisted_1))
    }), 128))
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

var css_248z = "._container_10ovn_1 {\n  display: flex;\n  justify-content: center;\n}\n._container_wrappable_10ovn_5 {\n  flex-wrap: wrap;\n}\n._container_wrappable_10ovn_5 ._button_10ovn_8 {\n  margin-bottom: 12px;\n}\n._container_sm_10ovn_11 ._button_10ovn_8 {\n  width: 8px;\n  height: 8px;\n  border-radius: 100%;\n  flex-shrink: 0;\n  margin-right: 8px;\n}\n._container_md_10ovn_18 {\n  width: 100%;\n}\n._container_md_10ovn_18 ._button_10ovn_8 {\n  height: 4px;\n  border-radius: 500px;\n}\n._container_md_10ovn_18 ._button_10ovn_8 + ._button_10ovn_8 {\n  margin-left: 4px;\n}\n._button_10ovn_8 {\n  appearance: none;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: inherit;\n  line-height: inherit;\n  background-color: var(--smed-base-05);\n  overflow: hidden;\n  cursor: pointer;\n}\n._button_10ovn_8:focus, ._button_10ovn_8:active {\n  outline: none;\n}\n._content_10ovn_44 {\n  transition: transform 0.1s linear;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  transform: translateX(-100%);\n  border-radius: inherit;\n}\n._content_active_10ovn_52 {\n  background-color: var(--smed-primary);\n  transform: translateX(0);\n}";
styleInject(css_248z);

var style0 = {"container":"_container_10ovn_1","container_wrappable":"_container_wrappable_10ovn_5","button":"_button_10ovn_8","container_sm":"_container_sm_10ovn_11","container_md":"_container_md_10ovn_18","content":"_content_10ovn_44","content_active":"_content_active_10ovn_52"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
