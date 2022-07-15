'use strict';

var vue = require('vue');
var SvgIcon = require('@smartmed/webpatient-vue-components/SvgIcon');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SvgIcon__default = /*#__PURE__*/_interopDefaultLegacy(SvgIcon);

var script = vue.defineComponent({
    components: { SvgIcon: SvgIcon__default["default"] },
    name: "Tag",
    props: {
        size: {
            type: String,
            default: "md",
            validator: (value) => ["xxs", "xs", "sm", "md", "lg"].includes(value),
        },
        color: {
            type: String,
            default: "primary",
            validator: (value) => [
                "primary",
                "secondary",
                "grey",
                "darkGrey",
                "white",
                "delete",
                "deleteFilled",
                "pink",
            ].includes(value),
        },
        removable: Boolean,
        disabled: Boolean,
        clickable: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { emit }) {
        const { removable } = vue.toRefs(props);
        const native = vue.ref(null);
        const blur = () => {
            if (native.value) {
                native.value.blur();
            }
        };
        const remove = () => {
            if (removable.value) {
                emit("remove");
            }
        };
        return {
            blur,
            native,
            remove,
        };
    },
});

const _hoisted_1 = ["disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = vue.resolveComponent("svg-icon");

  return (vue.openBlock(), vue.createElementBlock("button", {
    ref: "native",
    type: "button",
    class: vue.normalizeClass([
      _ctx.$style.tag,
      _ctx.$style['tag_' + _ctx.size],
      _ctx.$style['tag_' + _ctx.color],
      _ctx.clickable && _ctx.$style.tag_clickable,
      _ctx.disabled && _ctx.$style.tag_disabled,
    ]),
    disabled: _ctx.disabled || !_ctx.clickable,
    onMouseleave: _cache[1] || (_cache[1] = (...args) => (_ctx.blur && _ctx.blur(...args))),
    onKeydown: [
      _cache[2] || (_cache[2] = vue.withKeys((...args) => (_ctx.remove && _ctx.remove(...args)), ["backspace"])),
      _cache[3] || (_cache[3] = vue.withKeys((...args) => (_ctx.remove && _ctx.remove(...args)), ["esc"]))
    ]
  }, [
    vue.createElementVNode("span", {
      class: vue.normalizeClass([_ctx.$style.content, _ctx.removable && _ctx.$style.content_removable])
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2),
    (_ctx.removable)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.$style.iconContainer),
          onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => (_ctx.remove && _ctx.remove(...args)), ["stop","prevent"]))
        }, [
          vue.createVNode(_component_svg_icon, {
            name: "close-filled",
            class: vue.normalizeClass(_ctx.$style.icon)
          }, null, 8, ["class"])
        ], 2))
      : vue.createCommentVNode("", true)
  ], 42, _hoisted_1))
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

var css_248z = "._tag_18ebu_1 {\n  appearance: none;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: inherit;\n  line-height: inherit;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n}\n._tag_18ebu_1:focus, ._tag_18ebu_1:active {\n  outline: none;\n}\n._tag_clickable_18ebu_16 {\n  cursor: pointer;\n  pointer-events: initial;\n}\n._tag_disabled_18ebu_20 {\n  opacity: 0.6;\n  pointer-events: none;\n  cursor: default;\n}\n._tag_primary_18ebu_25 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-primary);\n  color: var(--smed-base-09);\n}\n._tag_primary_18ebu_25:hover:enabled {\n  background-color: var(--smed-primary-hover);\n}\n._tag_primary_18ebu_25:active:enabled {\n  background-color: var(--smed-primary-active);\n}\n._tag_primary_18ebu_25:focus {\n  background-color: var(--smed-primary-active);\n}\n._tag_pink_18ebu_39 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-support-secondary-02);\n  color: var(--smed-base-09);\n}\n._tag_pink_18ebu_39:hover:enabled {\n  background-color: var(--smed-support-secondary-03);\n}\n._tag_pink_18ebu_39:active:enabled {\n  background-color: var(--smed-support-secondary-01);\n}\n._tag_pink_18ebu_39:focus {\n  background-color: var(--smed-support-secondary-01);\n}\n._tag_secondary_18ebu_53 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-secondary);\n  color: var(--smed-base-09);\n}\n._tag_secondary_18ebu_53:hover:enabled {\n  background-color: var(--smed-secondary-hover);\n}\n._tag_secondary_18ebu_53:active:enabled {\n  background-color: var(--smed-secondary-active);\n}\n._tag_secondary_18ebu_53:focus {\n  background-color: var(--smed-secondary-active);\n}\n._tag_grey_18ebu_67 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-base-08);\n  color: var(--smed-base-02);\n}\n._tag_grey_18ebu_67:hover:enabled {\n  background-color: var(--smed-base-07);\n}\n._tag_grey_18ebu_67:active:enabled {\n  background-color: var(--smed-base-06);\n}\n._tag_grey_18ebu_67:focus {\n  background-color: var(--smed-base-06);\n}\n._tag_darkGrey_18ebu_81 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-base-03);\n  color: var(--smed-base-09);\n}\n._tag_darkGrey_18ebu_81:hover:enabled {\n  background-color: var(--smed-base-04);\n}\n._tag_darkGrey_18ebu_81:active:enabled {\n  background-color: var(--smed-base-05);\n}\n._tag_darkGrey_18ebu_81:focus {\n  background-color: var(--smed-base-05);\n}\n._tag_white_18ebu_95 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-base-09);\n  color: var(--smed-primary);\n}\n._tag_white_18ebu_95:hover:enabled {\n  background-color: var(--smed-base-08);\n}\n._tag_white_18ebu_95:active:enabled {\n  background-color: var(--smed-base-07);\n}\n._tag_white_18ebu_95:focus {\n  background-color: var(--smed-base-07);\n}\n._tag_delete_18ebu_109 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-base-09);\n  color: var(--smed-error);\n}\n._tag_delete_18ebu_109:hover:enabled {\n  background-color: var(--smed-base-08);\n}\n._tag_delete_18ebu_109:active:enabled {\n  background-color: var(--smed-base-07);\n}\n._tag_delete_18ebu_109:focus {\n  background-color: var(--smed-base-07);\n}\n._tag_deleteFilled_18ebu_123 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-error);\n  color: var(--smed-base-09);\n}\n._tag_deleteFilled_18ebu_123:hover:enabled {\n  background-color: var(--smed-error-hover);\n}\n._tag_deleteFilled_18ebu_123:active:enabled {\n  background-color: var(--smed-error-active);\n}\n._tag_deleteFilled_18ebu_123:focus {\n  background-color: var(--smed-error-active);\n}\n._tag_xxs_18ebu_137 {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  letter-spacing: 0px;\n  border-radius: 12px;\n}\n._tag_xs_18ebu_144 {\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  border-radius: 12px;\n}\n._tag_sm_18ebu_151 {\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  border-radius: 20px;\n}\n._tag_md_18ebu_158 {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  border-radius: 22px;\n}\n._tag_lg_18ebu_165 {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  border-radius: 24px;\n}\n._tag_xxs_18ebu_137 ._content_18ebu_173 {\n  height: 16px;\n  min-width: 16px;\n  padding: 0 4px;\n}\n._tag_xs_18ebu_144 ._content_18ebu_173 {\n  padding: 0 9px;\n}\n._tag_sm_18ebu_151 ._content_18ebu_173 {\n  padding: 6px 12px;\n}\n._tag_md_18ebu_158 ._content_18ebu_173 {\n  padding: 8px 16px;\n}\n._tag_lg_18ebu_165 ._content_18ebu_173 {\n  padding: 14px 26px;\n}\n._content_removable_18ebu_190 {\n  padding-right: 0 !important;\n}\n._iconContainer_18ebu_194 {\n  transition: color 0.2s linear;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--smed-base-09);\n}\n._tag_xxs_18ebu_137 ._iconContainer_18ebu_194 {\n  padding: 2px;\n}\n._tag_xs_18ebu_144 ._iconContainer_18ebu_194 {\n  padding: 4px;\n}\n._tag_sm_18ebu_151 ._iconContainer_18ebu_194 {\n  padding: 6px 6px;\n}\n._tag_md_18ebu_158 ._iconContainer_18ebu_194 {\n  padding: 8px 8px;\n}\n._tag_lg_18ebu_165 ._iconContainer_18ebu_194 {\n  padding: 14px 8px;\n}\n._tag_grey_18ebu_67 ._iconContainer_18ebu_194, ._tag_white_18ebu_95 ._iconContainer_18ebu_194, ._tag_delete_18ebu_109 ._iconContainer_18ebu_194 {\n  color: var(--smed-base-03);\n}\n._icon_18ebu_194 {\n  width: 20px;\n  height: 20px;\n  max-width: 20px;\n  max-height: 20px;\n  color: inherit;\n}\n._tag_md_18ebu_158 ._icon_18ebu_194, ._tag_lg_18ebu_165 ._icon_18ebu_194 {\n  width: 24px;\n  height: 24px;\n  max-width: 24px;\n  max-height: 24px;\n}";
styleInject(css_248z);

var style0 = {"tag":"_tag_18ebu_1","tag_clickable":"_tag_clickable_18ebu_16","tag_disabled":"_tag_disabled_18ebu_20","tag_primary":"_tag_primary_18ebu_25","tag_pink":"_tag_pink_18ebu_39","tag_secondary":"_tag_secondary_18ebu_53","tag_grey":"_tag_grey_18ebu_67","tag_darkGrey":"_tag_darkGrey_18ebu_81","tag_white":"_tag_white_18ebu_95","tag_delete":"_tag_delete_18ebu_109","tag_deleteFilled":"_tag_deleteFilled_18ebu_123","tag_xxs":"_tag_xxs_18ebu_137","tag_xs":"_tag_xs_18ebu_144","tag_sm":"_tag_sm_18ebu_151","tag_md":"_tag_md_18ebu_158","tag_lg":"_tag_lg_18ebu_165","content":"_content_18ebu_173","content_removable":"_content_removable_18ebu_190","iconContainer":"_iconContainer_18ebu_194","icon":"_icon_18ebu_194"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
