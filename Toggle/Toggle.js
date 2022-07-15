this.smartmed = this.smartmed || {};
this.smartmed.Toggle = (function (vue, application, LockIcon) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var LockIcon__default = /*#__PURE__*/_interopDefaultLegacy(LockIcon);

  var script = vue.defineComponent({
      components: {
          LockIcon: LockIcon__default["default"],
      },
      name: "Toggle",
      props: {
          modelValue: {
              type: Boolean,
              required: true,
          },
          size: {
              type: String,
              default: "md",
              validator: (value) => ["sm", "md", "lg"].includes(value),
          },
          disabled: Boolean,
          id: String,
      },
      setup(_, { emit }) {
          const interactive = application.useInteractive();
          const updateValue = ({ checked }) => {
              emit("update:modelValue", checked);
          };
          return {
              updateValue,
              native: interactive.native,
              focused: interactive.focused,
              focus: interactive.focus,
              blur: interactive.blur,
          };
      },
  });

  const _hoisted_1 = ["id", "checked", "disabled"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_lock_icon = vue.resolveComponent("lock-icon");

    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([
        _ctx.$style.host,
        _ctx.$style[`host_${_ctx.size}`],
        _ctx.modelValue && _ctx.$style.host_checked,
        _ctx.disabled && _ctx.$style.host_disabled,
        _ctx.focused && _ctx.$style.host_focused,
      ])
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.$style.toggle)
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(_ctx.$style.circle)
        }, [
          (_ctx.disabled)
            ? (vue.openBlock(), vue.createBlock(_component_lock_icon, {
                key: 0,
                width: "100%",
                height: "100%"
              }))
            : vue.createCommentVNode("", true)
        ], 2)
      ], 2),
      vue.createElementVNode("input", {
        type: "checkbox",
        role: "switch",
        ref: "native",
        id: _ctx.id,
        class: vue.normalizeClass(_ctx.$style.checkbox),
        checked: _ctx.modelValue,
        disabled: _ctx.disabled,
        onChange: _cache[0] || (_cache[0] = $event => (_ctx.updateValue($event.target)))
      }, null, 42, _hoisted_1)
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

  var css_248z = "._host_1u28e_1 {\n  transition: background-color 0.2s linear;\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  overflow: hidden;\n  background-color: var(--smed-base-06);\n}\n._host_checked_1u28e_9 {\n  background-color: var(--smed-primary);\n}\n._host_checked_1u28e_9:hover:not(._host_disabled_1u28e_12), ._host_checked_1u28e_9._host_focused_1u28e_12:not(._host_disabled_1u28e_12) {\n  background-color: var(--smed-primary-hover);\n}\n._host_checked_1u28e_9._host_disabled_1u28e_12 {\n  background-color: var(--smed-base-05);\n  color: var(--smed-base-05);\n}\n._host_sm_1u28e_19 {\n  width: 28px;\n  height: 16px;\n  border-radius: 10px;\n}\n._host_md_1u28e_24 {\n  width: 42px;\n  height: 24px;\n  border-radius: 12px;\n}\n._host_lg_1u28e_29 {\n  width: 56px;\n  height: 32px;\n  border-radius: 16px;\n}\n._host_1u28e_1:hover:not(._host_checked_1u28e_9):not(._host_disabled_1u28e_12), ._host_focused_1u28e_12:not(._host_checked_1u28e_9):not(._host_disabled_1u28e_12) {\n  background-color: var(--smed-base-05);\n}\n._host_disabled_1u28e_12:not(._host_checked_1u28e_9) {\n  background-color: var(--smed-base-06);\n  color: var(--smed-base-06);\n}\n._checkbox_1u28e_42 {\n  padding: 0;\n  border: 0;\n  border-radius: inherit;\n  background: none;\n  font-size: inherit;\n  line-height: inherit;\n  font-weight: inherit;\n  color: inherit;\n  caret-color: currentColor;\n  outline: none;\n  appearance: none;\n  word-break: keep-all;\n  -webkit-text-fill-color: currentColor;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n._checkbox_1u28e_42:-webkit-autofill, ._checkbox_1u28e_42:-webkit-autofill:hover, ._checkbox_1u28e_42:-webkit-autofill:focus {\n  border-radius: inherit;\n  -webkit-text-fill-color: inherit !important;\n  color: inherit !important;\n  background-color: transparent !important;\n  -webkit-box-shadow: 0 0 0 1000px var(--smed-base-09) 5c0 inset !important;\n}\n._host_disabled_1u28e_12 ._checkbox_1u28e_42 {\n  pointer-events: none;\n  cursor: default;\n}\n._toggle_1u28e_76 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  transition: 0.4s transform ease;\n}\n._host_sm_1u28e_19 ._toggle_1u28e_76 {\n  transform: translateX(-5px);\n}\n._host_checked_1u28e_9._host_sm_1u28e_19 ._toggle_1u28e_76 {\n  transform: translateX(5px);\n}\n._host_md_1u28e_24 ._toggle_1u28e_76 {\n  transform: translateX(-8px);\n}\n._host_checked_1u28e_9._host_md_1u28e_24 ._toggle_1u28e_76 {\n  transform: translateX(8px);\n}\n._host_lg_1u28e_29 ._toggle_1u28e_76 {\n  transform: translateX(-10px);\n}\n._host_checked_1u28e_9._host_lg_1u28e_29 ._toggle_1u28e_76 {\n  transform: translateX(10px);\n}\n._circle_1u28e_102 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background-color: var(--smed-base-09);\n  border-radius: 100%;\n  box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.32);\n  border: 0.5px solid var(--smed-base-07);\n}\n._host_sm_1u28e_19 ._circle_1u28e_102 {\n  width: 12px;\n  height: 12px;\n  padding: 2px;\n}\n._host_md_1u28e_24 ._circle_1u28e_102 {\n  width: 18px;\n  height: 18px;\n  padding: 3px;\n}\n._host_lg_1u28e_29 ._circle_1u28e_102 {\n  width: 24px;\n  height: 24px;\n  padding: 4px;\n}";
  styleInject(css_248z);

  var style0 = {"host":"_host_1u28e_1","host_checked":"_host_checked_1u28e_9","host_disabled":"_host_disabled_1u28e_12","host_focused":"_host_focused_1u28e_12","host_sm":"_host_sm_1u28e_19","host_md":"_host_md_1u28e_24","host_lg":"_host_lg_1u28e_29","checkbox":"_checkbox_1u28e_42","toggle":"_toggle_1u28e_76","circle":"_circle_1u28e_102"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(Vue, smartmed.application, LockIcon);
