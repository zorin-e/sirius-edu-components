import { defineComponent, toRefs, ref, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot } from 'vue';

var script = defineComponent({
    name: "LineClamp",
    props: {
        lineHeight: {
            type: Number,
            required: true,
        },
        linesLimit: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const { lineHeight, linesLimit } = toRefs(props);
        const rootElement = ref(null);
        const rootStyles = computed(() => {
            if (!rootElement.value) {
                return {};
            }
            return {
                height: `${rootElement.value.scrollHeight + 4}px`,
                "max-height": `${lineHeight.value * linesLimit.value}px`,
            };
        });
        const contentStyles = computed(() => {
            return {
                "-webkit-line-clamp": linesLimit.value,
            };
        });
        return {
            rootElement,
            rootStyles,
            contentStyles,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    ref: "rootElement",
    class: normalizeClass(_ctx.$style.root),
    style: normalizeStyle(_ctx.rootStyles)
  }, [
    createElementVNode("div", {
      class: normalizeClass([_ctx.$style.content, _ctx.linesLimit === 1 && _ctx.$style.content_ellipsis]),
      style: normalizeStyle(_ctx.contentStyles)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 6)
  ], 6))
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

var css_248z = "._root_qrom1_1 {\n  position: relative;\n  display: block;\n  overflow: hidden;\n}\n._content_qrom1_7 {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n._content_ellipsis_qrom1_12 {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}";
styleInject(css_248z);

var style0 = {"root":"_root_qrom1_1","content":"_content_qrom1_7","content_ellipsis":"_content_ellipsis_qrom1_12"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

export { script as default };
