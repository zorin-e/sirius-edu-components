'use strict';

var vue = require('vue');
var SearchInput = require('@smartmed/webpatient-vue-components/SearchInput');
var Datepicker = require('@smartmed/webpatient-vue-components/Datepicker');
var directives = require('@smartmed/webpatient-vue-components/directives');
var SvgIcon = require('@smartmed/webpatient-vue-components/SvgIcon');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SearchInput__default = /*#__PURE__*/_interopDefaultLegacy(SearchInput);
var Datepicker__default = /*#__PURE__*/_interopDefaultLegacy(Datepicker);
var SvgIcon__default = /*#__PURE__*/_interopDefaultLegacy(SvgIcon);

const INTL_DAY_AND_MONTH = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
});
const BASE_SEPARATOR = " \u2014 ";
var script = vue.defineComponent({
    emits: ["update:modelValue", "update:date", "clear-search"],
    directives: {
        "click-outside": directives.ClickOutsideDirective,
    },
    name: "SearchInputDate",
    props: {
        disableNextDate: Boolean,
        modelValue: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "md",
            validator: (value) => ["lg", "md", "sm"].includes(value),
        },
        date: {
            type: [Date, String, Array, Object],
        },
        placeholder: String,
    },
    data() {
        return {
            isShowCalendar: false,
        };
    },
    computed: {
        formattedDate() {
            if (Array.isArray(this.date)) {
                return this.date
                    .map((item) => {
                    return INTL_DAY_AND_MONTH.format(item);
                })
                    .join(BASE_SEPARATOR);
            }
            if (this.date instanceof Date) {
                return INTL_DAY_AND_MONTH.format(this.date);
            }
            return "";
        },
        disabledDates() {
            return this.disableNextDate
                ? (date) => new Date() < date
                : () => false;
        },
        iconSize() {
            return this.size === "sm" ? "md" : "lg";
        },
    },
    methods: {
        closeCalendar() {
            this.isShowCalendar = false;
        },
        selectDate(date) {
            this.isShowCalendar = false;
            this.$emit("update:date", date);
        },
    },
    components: {
        SearchInput: SearchInput__default["default"],
        Datepicker: Datepicker__default["default"],
        SvgIcon: SvgIcon__default["default"],
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = vue.resolveComponent("svg-icon");
  const _component_search_input = vue.resolveComponent("search-input");
  const _component_datepicker = vue.resolveComponent("datepicker");
  const _directive_click_outside = vue.resolveDirective("click-outside");

  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.$style.wrapper),
    onKeydown: _cache[5] || (_cache[5] = vue.withKeys((...args) => (_ctx.closeCalendar && _ctx.closeCalendar(...args)), ["esc"]))
  }, [
    vue.createVNode(_component_search_input, {
      modelValue: _ctx.modelValue,
      size: _ctx.size,
      placeholder: _ctx.placeholder,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.$emit('update:modelValue', $event))),
      onSearchClear: _cache[4] || (_cache[4] = $event => (_ctx.$emit('clear-search', $event)))
    }, {
      right: vue.withCtx(() => [
        (!_ctx.date)
          ? (vue.openBlock(), vue.createBlock(_component_svg_icon, {
              key: 0,
              name: "calendar",
              class: vue.normalizeClass([_ctx.$style.calendarIcon, _ctx.isShowCalendar && _ctx.$style.active]),
              size: _ctx.iconSize,
              onClick: _cache[0] || (_cache[0] = vue.withModifiers($event => (_ctx.isShowCalendar = !_ctx.isShowCalendar), ["prevent"]))
            }, null, 8, ["class", "size"]))
          : (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass([_ctx.$style.dateTag, _ctx.size === 'sm' && _ctx.$style.small])
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(_ctx.$style.showDate),
                onClick: _cache[1] || (_cache[1] = vue.withModifiers($event => (_ctx.isShowCalendar = true), ["prevent"]))
              }, vue.toDisplayString(_ctx.formattedDate), 3),
              vue.createVNode(_component_svg_icon, {
                name: "close",
                class: vue.normalizeClass(_ctx.$style.closeTag),
                size: _ctx.iconSize,
                onClick: _cache[2] || (_cache[2] = vue.withModifiers($event => (_ctx.$emit('update:date', null)), ["prevent"]))
              }, null, 8, ["class", "size"])
            ], 2))
      ]),
      _: 1
    }, 8, ["modelValue", "size", "placeholder"]),
    (_ctx.isShowCalendar)
      ? (vue.openBlock(), vue.createBlock(_component_datepicker, {
          key: 0,
          inline: "",
          range: "",
          modelValue: _ctx.date,
          class: vue.normalizeClass(_ctx.$style.datePicker),
          "disabled-dates": _ctx.disabledDates,
          "onUpdate:modelValue": _ctx.selectDate
        }, null, 8, ["modelValue", "class", "disabled-dates", "onUpdate:modelValue"]))
      : vue.createCommentVNode("", true)
  ], 34)), [
    [_directive_click_outside, _ctx.closeCalendar]
  ])
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

var css_248z = "._wrapper_1lvgy_1 {\n  position: relative;\n}\n._datePicker_1lvgy_5 {\n  position: absolute;\n  right: 0;\n  top: calc(100% + 16px);\n}\n._calendarIcon_1lvgy_11 {\n  color: var(--smed-base-05);\n  cursor: pointer;\n}\n._calendarIcon_1lvgy_11._active_1lvgy_15, ._calendarIcon_1lvgy_11:hover {\n  color: var(--smed-primary);\n}\n._dateTag_1lvgy_19 {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: 0px;\n  background-color: var(--smed-primary);\n  border-radius: 4px;\n  color: var(--smed-base-09);\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  cursor: pointer;\n}\n._dateTag_1lvgy_19._small_1lvgy_32 {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  letter-spacing: 0px;\n}\n._dateTag_1lvgy_19._small_1lvgy_32 ._showDate_1lvgy_38 {\n  padding: 2px 6px;\n}\n._closeTag_1lvgy_42 {\n  color: var(--smed-base-09);\n  border-left: 1px solid var(--smed-base-09);\n}\n._showDate_1lvgy_38 {\n  padding: 4px 8px;\n}\n._showDate_1lvgy_38:hover,\n._closeTag_1lvgy_42:hover {\n  color: var(--smed-base-06);\n}";
styleInject(css_248z);

var style0 = {"wrapper":"_wrapper_1lvgy_1","datePicker":"_datePicker_1lvgy_5","calendarIcon":"_calendarIcon_1lvgy_11","active":"_active_1lvgy_15","dateTag":"_dateTag_1lvgy_19","small":"_small_1lvgy_32","showDate":"_showDate_1lvgy_38","closeTag":"_closeTag_1lvgy_42"};

const cssModules = script.__cssModules = {};
cssModules["$style"] = style0;

script.render = render;

module.exports = script;
