import { defineComponent, provide, reactive, resolveComponent, openBlock, createElementBlock, renderSlot, createBlock, normalizeClass, createCommentVNode } from 'vue';
import FieldError from '@smartmed/webpatient-vue-components/FieldError';
import { CONTROL_ACCESSOR_TOKEN, VALIDATION_ERRORS_TOKEN } from '@smartmed/webpatient-vue-components/tokens';

var script = defineComponent({
    components: {
        FieldError,
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
        provide(CONTROL_ACCESSOR_TOKEN, {
            markAsTouch: props.control.markAsTouch,
        });
        if (props.validationErrors) {
            provide(VALIDATION_ERRORS_TOKEN, props.validationErrors);
        }
        return {
            model: reactive({
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
  const _component_field_error = resolveComponent("field-error");

  return (openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default", {
      invalid: _ctx.invalid,
      model: _ctx.model,
      disabled: _ctx.disabled,
      valid: _ctx.valid
    }),
    (_ctx.showErrors)
      ? (openBlock(), createBlock(_component_field_error, {
          key: 0,
          class: normalizeClass(_ctx.$style.error),
          error: _ctx.error
        }, null, 8, ["class", "error"]))
      : createCommentVNode("", true)
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

export { script as default };
