this.smartmed = this.smartmed || {};
this.smartmed.FieldError = (function (vue, tokens) {
  'use strict';

  var script = vue.defineComponent({
      name: "FieldError",
      props: {
          error: {
              type: [String, Object, null],
              required: true,
          },
      },
      setup(props) {
          const { error } = vue.toRefs(props);
          const validationErrors = vue.inject(tokens.VALIDATION_ERRORS_TOKEN, null);
          const errorComputed = vue.computed(() => {
              const value = error.value;
              if (typeof value === "string" || value === null) {
                  return value;
              }
              const keys = Object.keys(value);
              if (keys.length === 0) {
                  return null;
              }
              const firstKey = keys[0];
              if (!validationErrors) {
                  return value[firstKey];
              }
              return validationErrors[firstKey] || value[firstKey];
          });
          return {
              errorComputed,
          };
      },
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.Transition, { name: "fade-height16" }, {
      default: vue.withCtx(() => [
        (_ctx.errorComputed)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(['smed-text_body-xs', _ctx.$style.error])
            }, vue.toDisplayString(_ctx.errorComputed), 3))
          : vue.createCommentVNode("", true)
      ]),
      _: 1
    }))
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

  var css_248z = "._error_1cllb_1 {\n  color: var(--smed-error);\n}";
  styleInject(css_248z);

  var style0 = {"error":"_error_1cllb_1"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(Vue, smartmed.tokens);
