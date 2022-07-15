'use strict';

var vue = require('vue');

var script = vue.defineComponent({
    name: "Tabs",
    props: {
        modelValue: {
            type: [String, Number, Object],
            required: true,
        },
        tabs: {
            type: Array,
        },
        type: {
            type: String,
            default: "boxed",
            validator: (value) => ["boxed", "underline"].includes(value),
        },
        wide: Boolean,
        size: {
            type: String,
            validator: (value) => ["sm", "md"].includes(value),
            default: "md",
        },
    },
});

const _hoisted_1 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("ul", {
    class: vue.normalizeClass([_ctx.$style.tabs, _ctx.$style['tabs_' + _ctx.size]])
  }, [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.tabs, (tab) => {
      return (vue.openBlock(), vue.createElementBlock("li", {
        key: tab.id,
        class: vue.normalizeClass([
        'smed-text_body-xl',
        _ctx.$style.tab,
        _ctx.$style['tab_' + _ctx.size],
        _ctx.$style['tab_' + _ctx.type],
        tab.id === _ctx.modelValue.id && _ctx.$style.tab_active,
        _ctx.wide && _ctx.$style.tab_wide,
      ]),
        onClick: $event => (_ctx.$emit('update:modelValue', tab))
      }, [
        vue.renderSlot(_ctx.$slots, "default", { tab: tab })
      ], 10, _hoisted_1))
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

var css_248z = "._tabs_179zk_1 {\n  -webkit-overflow-scrolling: touch;\n  scroll-behavior: smooth;\n  scrollbar-width: none;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n  display: inline-flex;\n  width: 100%;\n  flex-wrap: nowrap;\n  overflow: auto;\n}\n._tabs_179zk_1::-webkit-scrollbar {\n  display: none;\n}\n._tab_179zk_1 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-sizing: border-box;\n  flex-shrink: 0;\n  cursor: pointer;\n}\n._tab_boxed_179zk_23 {\n  background-color: var(--smed-base-09);\n  color: var(--smed-base-01);\n}\n._tab_boxed_179zk_23:first-child {\n  border-top-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n._tab_boxed_179zk_23:last-child {\n  border-top-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n}\n._tab_boxed_179zk_23._tab_active_179zk_35 {\n  background-color: var(--smed-primary);\n  color: var(--smed-base-09);\n}\n._tab_underline_179zk_39 {\n  border-bottom: 1px solid var(--smed-base-05);\n}\n._tab_sm_179zk_42 {\n  padding: 8px 16px;\n}\n._tab_md_179zk_45 {\n  padding: 16px 32px;\n}\n._tab_wide_179zk_48 {\n  flex: 1;\n}\n._tab_underline_179zk_39._tab_active_179zk_35 {\n  position: relative;\n  color: var(--smed-primary);\n}\n._tab_underline_179zk_39._tab_active_179zk_35:after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  bottom: -1px;\n  width: 100%;\n  max-height: 2px;\n  height: 2px;\n  min-height: 2px;\n  box-sizing: border-box;\n  border-radius: 2px 2px 0px 0px;\n  border: 1px solid var(--smed-primary);\n  background-color: var(--smed-primary);\n}\n._tab_active_179zk_35 {\n  cursor: default;\n}";
styleInject(css_248z);

var style0 = {"tabs":"_tabs_179zk_1","tab":"_tab_179zk_1","tab_boxed":"_tab_boxed_179zk_23","tab_active":"_tab_active_179zk_35","tab_underline":"_tab_underline_179zk_39","tab_sm":"_tab_sm_179zk_42","tab_md":"_tab_md_179zk_45","tab_wide":"_tab_wide_179zk_48"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
