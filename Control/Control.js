this.smartmed = this.smartmed || {};
this.smartmed.Control = (function (vue, FieldError, tokens) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var FieldError__default = /*#__PURE__*/_interopDefaultLegacy(FieldError);

  var script = vue.defineComponent({
      components: {
          FieldError: FieldError__default["default"],
      },
      name: "Control",
      props: {
          control: {
              type: Object,
              required: true,
          },
          showErrors: {
              type: Boolean,
              default: true,
          },
          validationErrors: {
              type: Object,
              default: null,
          },
      },
      setup(props) {
          vue.provide(tokens.CONTROL_ACCESSOR_TOKEN, {
              markAsTouch: props.control.markAsTouch,
          });
          if (props.validationErrors) {
              vue.provide(tokens.VALIDATION_ERRORS_TOKEN, props.validationErrors);
          }
          return {
              model: vue.reactive({
                  value: props.control.value,
              }),
              invalid: props.control.invalid,
              error: props.control.error,
              disabled: props.control.disabled,
              valid: props.control.valid,
          };
      },
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_field_error = vue.resolveComponent("field-error");

    return (vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default", {
        invalid: _ctx.invalid,
        model: _ctx.model,
        disabled: _ctx.disabled,
        valid: _ctx.valid
      }),
      (_ctx.showErrors)
        ? (vue.openBlock(), vue.createBlock(_component_field_error, {
            key: 0,
            class: vue.normalizeClass(_ctx.$style.error),
            error: _ctx.error
          }, null, 8, ["class", "error"]))
        : vue.createCommentVNode("", true)
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

  var css_248z = "._error_dnfat_1 {\n  margin-top: 4px;\n}";
  styleInject(css_248z);

  var style0 = {"error":"_error_dnfat_1"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(Vue, FieldError, smartmed.tokens);
