this.smartmed = this.smartmed || {};
this.smartmed.BaseButton = (function (vue, Spinner, domain) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Spinner__default = /*#__PURE__*/_interopDefaultLegacy(Spinner);

  var script = vue.defineComponent({
      name: "BaseButton",
      components: {
          Spinner: Spinner__default["default"],
      },
      props: {
          title: {
              type: String,
              default: "Button",
          },
          color: {
              type: String,
              default: "primary",
              validator: (value) => {
                  return [
                      "primary",
                      "secondary",
                      "grey",
                      "white",
                      "delete",
                      "deleteFilled",
                  ].includes(value);
              },
          },
          disabled: {
              type: Boolean,
              default: false,
          },
          size: {
              type: String,
              default: "md",
              validator: (value) => {
                  return ["lg", "md", "sm"].includes(value);
              },
          },
          type: {
              type: String,
              default: "button",
          },
          isLoading: Boolean,
          wide: Boolean,
          rounded: Boolean,
          iconButton: Boolean,
      },
      setup(props, { slots }) {
          const { color, size, iconButton, wide, rounded, isLoading } = vue.toRefs(props);
          const native = vue.ref(null);
          const styles = vue.useCssModule();
          const blur = () => {
              if (native.value) {
                  native.value.blur();
              }
          };
          const buttonClass = vue.computed(() => {
              return [
                  styles.native,
                  styles[`native_${color.value}`],
                  styles[size.value],
                  styles[iconButton.value ? "iconButton" : "button"],
                  wide.value && styles.wide,
                  rounded.value && styles.rounded,
                  isLoading.value && styles.native_loading,
              ];
          });
          const hasLeftIcon = vue.computed(() => domain.hasSlotContent(slots["left-icon"]));
          const hasRightIcon = vue.computed(() => domain.hasSlotContent(slots["right-icon"]));
          return {
              native,
              blur,
              buttonClass,
              hasLeftIcon,
              hasRightIcon,
          };
      },
  });

  const _hoisted_1 = ["type", "disabled", "tabindex"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_spinner = vue.resolveComponent("spinner");

    return (vue.openBlock(), vue.createElementBlock("button", {
      ref: "native",
      type: _ctx.type,
      class: vue.normalizeClass(_ctx.buttonClass),
      disabled: _ctx.disabled,
      tabindex: _ctx.disabled || _ctx.isLoading ? '-1' : '0'
    }, [
      (_ctx.hasLeftIcon)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass([_ctx.$style.icon, _ctx.$style.element])
          }, [
            vue.renderSlot(_ctx.$slots, "left-icon")
          ], 2))
        : vue.createCommentVNode("", true),
      ((_ctx.$slots.default || _ctx.title) && !_ctx.iconButton)
        ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            class: vue.normalizeClass([_ctx.$style.content, _ctx.$style.element])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
            ])
          ], 2))
        : vue.createCommentVNode("", true),
      (_ctx.hasRightIcon)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 2,
            class: vue.normalizeClass([_ctx.$style.icon, _ctx.$style.element])
          }, [
            vue.renderSlot(_ctx.$slots, "right-icon")
          ], 2))
        : vue.createCommentVNode("", true),
      (_ctx.isLoading)
        ? (vue.openBlock(), vue.createBlock(_component_spinner, {
            key: 3,
            class: vue.normalizeClass(_ctx.$style.spinner)
          }, null, 8, ["class"]))
        : vue.createCommentVNode("", true)
    ], 10, _hoisted_1))
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

  var css_248z = "._native_1rd6j_1 {\n  appearance: none;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: inherit;\n  line-height: inherit;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n._native_1rd6j_1:focus, ._native_1rd6j_1:active {\n  outline: none;\n}\n._native_1rd6j_1:disabled {\n  background-color: var(--smed-base-06);\n  pointer-events: none;\n  cursor: default;\n}\n._native_primary_1rd6j_22 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-primary);\n  color: var(--smed-base-09);\n}\n._native_primary_1rd6j_22:hover:enabled {\n  background-color: var(--smed-primary-hover);\n}\n._native_primary_1rd6j_22:active:enabled {\n  background-color: var(--smed-primary-active);\n}\n._native_primary_1rd6j_22:focus {\n  background-color: var(--smed-primary-active);\n}\n._native_secondary_1rd6j_36 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-secondary);\n  color: var(--smed-base-09);\n}\n._native_secondary_1rd6j_36:hover:enabled {\n  background-color: var(--smed-secondary-hover);\n}\n._native_secondary_1rd6j_36:active:enabled {\n  background-color: var(--smed-secondary-active);\n}\n._native_secondary_1rd6j_36:focus {\n  background-color: var(--smed-secondary-active);\n}\n._native_grey_1rd6j_50 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-base-08);\n  color: var(--smed-base-02);\n}\n._native_grey_1rd6j_50:hover:enabled {\n  background-color: var(--smed-base-07);\n}\n._native_grey_1rd6j_50:active:enabled {\n  background-color: var(--smed-base-06);\n}\n._native_grey_1rd6j_50:focus {\n  background-color: var(--smed-base-06);\n}\n._native_white_1rd6j_64 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-base-09);\n  color: var(--smed-primary);\n}\n._native_white_1rd6j_64:hover:enabled {\n  background-color: var(--smed-base-08);\n}\n._native_white_1rd6j_64:active:enabled {\n  background-color: var(--smed-base-07);\n}\n._native_white_1rd6j_64:focus {\n  background-color: var(--smed-base-07);\n}\n._native_delete_1rd6j_78 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-base-09);\n  color: var(--smed-error);\n}\n._native_delete_1rd6j_78:hover:enabled {\n  background-color: var(--smed-base-08);\n}\n._native_delete_1rd6j_78:active:enabled {\n  background-color: var(--smed-base-07);\n}\n._native_delete_1rd6j_78:focus {\n  background-color: var(--smed-base-07);\n}\n._native_deleteFilled_1rd6j_92 {\n  transition: background-color 0.2s linear;\n  background-color: var(--smed-error);\n  color: var(--smed-base-09);\n}\n._native_deleteFilled_1rd6j_92:hover:enabled {\n  background-color: var(--smed-error-hover);\n}\n._native_deleteFilled_1rd6j_92:active:enabled {\n  background-color: var(--smed-error-active);\n}\n._native_deleteFilled_1rd6j_92:focus {\n  background-color: var(--smed-error-active);\n}\n._native_loading_1rd6j_106 {\n  pointer-events: none;\n}\n._sm_1rd6j_110 {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: 0px;\n  font-weight: 500;\n  height: 32px;\n  border-radius: 4px;\n}\n._md_1rd6j_120 {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  font-weight: 500;\n  height: 44px;\n  border-radius: 6px;\n}\n._lg_1rd6j_130 {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  font-weight: 500;\n  height: 56px;\n  border-radius: 8px;\n}\n._button_1rd6j_140 {\n  min-width: 120px;\n}\n._button_1rd6j_140._sm_1rd6j_110 {\n  padding: 6px 24px;\n}\n._button_1rd6j_140._md_1rd6j_120 {\n  padding: 10px 24px;\n}\n._button_1rd6j_140._lg_1rd6j_130 {\n  padding: 16px 24px;\n}\n._button_1rd6j_140._wide_1rd6j_152 {\n  width: 100%;\n}\n._rounded_1rd6j_156._sm_1rd6j_110 {\n  border-radius: 16px;\n}\n._rounded_1rd6j_156._md_1rd6j_120 {\n  border-radius: 22px;\n}\n._rounded_1rd6j_156._lg_1rd6j_130 {\n  border-radius: 28px;\n}\n._iconButton_1rd6j_166._sm_1rd6j_110 {\n  width: 32px;\n  padding: 6px;\n}\n._iconButton_1rd6j_166._md_1rd6j_120 {\n  width: 44px;\n  padding: 10px;\n}\n._iconButton_1rd6j_166._lg_1rd6j_130 {\n  width: 56px;\n  padding: 16px;\n}\n._iconButton_1rd6j_166._rounded_1rd6j_156 {\n  border-radius: 100%;\n}\n._native_loading_1rd6j_106 ._content_1rd6j_182 {\n  opacity: 0;\n}\n._icon_1rd6j_166 {\n  display: flex;\n  align-items: center;\n}\n._element_1rd6j_191 {\n  color: inherit;\n}\n._element_1rd6j_191 + ._element_1rd6j_191 {\n  margin-left: 10px;\n}\n._native_loading_1rd6j_106._iconButton_1rd6j_166 ._element_1rd6j_191 {\n  opacity: 0;\n}\n._spinner_1rd6j_201 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-radius: inherit;\n  background-color: rgba(224, 224, 224, 0.6117647059);\n}";
  styleInject(css_248z);

  var style0 = {"native":"_native_1rd6j_1","native_primary":"_native_primary_1rd6j_22","native_secondary":"_native_secondary_1rd6j_36","native_grey":"_native_grey_1rd6j_50","native_white":"_native_white_1rd6j_64","native_delete":"_native_delete_1rd6j_78","native_deleteFilled":"_native_deleteFilled_1rd6j_92","native_loading":"_native_loading_1rd6j_106","sm":"_sm_1rd6j_110","md":"_md_1rd6j_120","lg":"_lg_1rd6j_130","button":"_button_1rd6j_140","wide":"_wide_1rd6j_152","rounded":"_rounded_1rd6j_156","iconButton":"_iconButton_1rd6j_166","content":"_content_1rd6j_182","icon":"_icon_1rd6j_166","element":"_element_1rd6j_191","spinner":"_spinner_1rd6j_201"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(Vue, Spinner, smartmed.domain);
