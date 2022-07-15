this.smartmed = this.smartmed || {};
this.smartmed.MaskedInput = (function (vue, textMaskCore) {
  'use strict';

  var script = vue.defineComponent({
      name: "MaskedInput",
      props: {
          modelValue: {
              type: [String, Number, Object, null],
              required: true,
          },
          maskOptions: {
              type: [Object, null],
              default: null,
          },
          disabled: Boolean,
          stringify: {
              type: Function,
              default: (item) => item,
          },
      },
      mounted() {
          if (this.maskOptions) {
              this.initMask();
          }
      },
      data() {
          return {
              textMaskInputElement: null,
          };
      },
      methods: {
          initMask() {
              vue.nextTick(() => {
                  this.setTextMaskInputElement();
                  this.textMaskInputElement.update(this.modelValue);
              });
          },
          createTextMaskInputElement: textMaskCore.createTextMaskInputElement,
          setTextMaskInputElement() {
              this.textMaskInputElement = this.createTextMaskInputElement({
                  inputElement: this.$refs.native,
                  mask: this.maskOptions.mask,
                  value: this.modelValue,
                  showMask: false,
                  guide: this.maskOptions.guide || false,
                  pipe: this.maskOptions.pipe || ((v) => v),
              });
          },
          updateValue(value) {
              if (this.disabled) {
                  return;
              }
              if (this.maskOptions) {
                  this.textMaskInputElement.update(value);
              }
              this.$emit("update:modelValue", this.$refs.native.value);
          },
          bind() {
              this.setTextMaskInputElement();
              this.updateValue(this.modelValue);
          },
      },
      watch: {
          maskOptions(newMask, oldMask) {
              if (this.maskOptions !== oldMask) {
                  this.bind();
              }
          },
      },
  });

  const _hoisted_1 = ["value", "disabled"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({ ref: "native" }, _ctx.$attrs, {
      value: _ctx.stringify(_ctx.modelValue),
      disabled: _ctx.disabled,
      onInput: _cache[0] || (_cache[0] = $event => (_ctx.updateValue($event.target.value)))
    }), null, 16, _hoisted_1))
  }

  script.render = render;

  return script;

})(Vue, textMaskCore);
