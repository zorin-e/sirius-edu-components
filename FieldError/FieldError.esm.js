import { defineComponent, toRefs, inject, computed, openBlock, createBlock, Transition, withCtx, createElementBlock, normalizeClass, toDisplayString, createCommentVNode } from 'vue';
import { VALIDATION_ERRORS_TOKEN } from '@smartmed/webpatient-vue-components/tokens';

var script = defineComponent({
    name: "FieldError",
    props: {
        error: {
            type: [String, Object, null],
            required: true,
        },
    },
    setup(props) {
        const { error } = toRefs(props);
        const validationErrors = inject(VALIDATION_ERRORS_TOKEN, null);
        const errorComputed = computed(() => {
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
  return (openBlock(), createBlock(Transition, { name: "fade-height16" }, {
    default: withCtx(() => [
      (_ctx.errorComputed)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(['smed-text_body-xs', _ctx.$style.error])
          }, toDisplayString(_ctx.errorComputed), 3))
        : createCommentVNode("", true)
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

export { script as default };
