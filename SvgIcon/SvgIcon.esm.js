import { defineComponent, toRefs, computed, defineAsyncComponent, openBlock, createElementBlock, normalizeClass, createBlock, resolveDynamicComponent, createCommentVNode } from 'vue';

var script = defineComponent({
    props: {
        name: String,
        size: {
            type: String,
            default: "lg",
            validators: (value) => ["sm", "md", "lg", "xl", "xxl"].includes(value),
        },
    },
    setup(props) {
        const { name } = toRefs(props);
        const iconComponent = computed(() => {
            return (name.value &&
                defineAsyncComponent(() => import(`@smartmed/webpatient-vue-components/assets/svg/${name.value}.svg`)));
        });
        return {
            iconComponent,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("span", {
    class: normalizeClass([_ctx.$style.icon, _ctx.$style['icon_' + _ctx.size]])
  }, [
    (_ctx.name)
      ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent), {
          key: 0,
          width: "100%",
          height: "100%"
        }))
      : createCommentVNode("", true)
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

var css_248z = "._icon_16zl4_1 {\n  display: inline-block;\n  vertical-align: middle;\n}\n._icon_xxl_16zl4_5 {\n  min-width: 52px;\n  min-height: 52px;\n  width: 52px;\n  height: 52px;\n  max-width: 52px;\n  max-height: 52px;\n}\n._icon_xl_16zl4_13 {\n  min-width: 32px;\n  min-height: 32px;\n  width: 32px;\n  height: 32px;\n  max-width: 32px;\n  max-height: 32px;\n}\n._icon_lg_16zl4_21 {\n  min-width: 24px;\n  min-height: 24px;\n  width: 24px;\n  height: 24px;\n  max-width: 24px;\n  max-height: 24px;\n}\n._icon_md_16zl4_29 {\n  min-width: 20px;\n  min-height: 20px;\n  width: 20px;\n  height: 20px;\n  max-width: 20px;\n  max-height: 20px;\n}\n._icon_sm_16zl4_37 {\n  min-width: 16px;\n  min-height: 16px;\n  width: 16px;\n  height: 16px;\n  max-width: 16px;\n  max-height: 16px;\n}";
styleInject(css_248z);

var style0 = {"icon":"_icon_16zl4_1","icon_xxl":"_icon_xxl_16zl4_5","icon_xl":"_icon_xl_16zl4_13","icon_lg":"_icon_lg_16zl4_21","icon_md":"_icon_md_16zl4_29","icon_sm":"_icon_sm_16zl4_37"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
