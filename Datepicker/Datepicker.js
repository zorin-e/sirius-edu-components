this.smartmed = this.smartmed || {};
this.smartmed.Datepicker = (function (TempDatepicker, vue) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var TempDatepicker__default = /*#__PURE__*/_interopDefaultLegacy(TempDatepicker);

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

  var css_248z$1 = ".dp__theme_dark {\n  --dp-background-color: var(--smed-base-01);\n  --dp-text-color: var(--smed-base-09);\n  --dp-hover-color: var(--smed-base-02);\n  --dp-hover-text-color: var(--smed-base-09);\n  --dp-hover-icon-color: #959595;\n  --dp-primary-color: var(--smed-info);\n  --dp-primary-text-color: var(--smed-base-09);\n  --dp-secondary-color: var(--smed-base-04);\n  --dp-border-color: #2d2d2d;\n  --dp-border-color-hover: #aaaeb7;\n  --dp-disabled-color: #737373;\n  --dp-disabled-color-text: #d0d0d0;\n  --dp-scroll-bar-background: var(--smed-base-01);\n  --dp-scroll-bar-color: #484848;\n  --dp-success-color: var(--smed-success);\n  --dp-success-color-disabled: #428f59;\n  --dp-icon-color: #959595;\n  --dp-danger-color: var(--smed-error);\n  --dp-marker-color: var(--smed-error);\n  --dp-tooltip-color: #3e3e3e;\n}\n\n.dp__theme_light {\n  --dp-background-color: var(--smed-base-09);\n  --dp-text-color: #212121;\n  --dp-hover-color: rgba(0, 178, 172, 0.15);\n  --dp-hover-text-color: #212121;\n  --dp-hover-icon-color: #959595;\n  --dp-primary-color: var(--smed-primary);\n  --dp-primary-text-color: #f8f5f5;\n  --dp-secondary-color: #c0c4cc;\n  --dp-border-color: #ddd;\n  --dp-border-color-hover: #aaaeb7;\n  --dp-disabled-color: var(--smed-base-08);\n  --dp-scroll-bar-background: #f3f3f3;\n  --dp-scroll-bar-color: #959595;\n  --dp-success-color: #76d275;\n  --dp-success-color-disabled: #a3d9b1;\n  --dp-icon-color: var(--smed-base-01);\n  --dp-danger-color: #ff6f60;\n  --dp-marker-color: #ff6f60;\n  --dp-tooltip-color: #fafafa;\n  --dp-disabled-color-text: #8e8e8e;\n}\n\n.dp__input_wrap {\n  position: relative;\n  width: 100%;\n  box-sizing: unset;\n}\n\n.dp__input_wrap:focus {\n  border-color: var(--dp-border-color-hover);\n  outline: none;\n}\n\n.dp__input {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  background-color: var(--dp-background-color);\n  border-radius: 4px;\n  border: 1px solid var(--dp-border-color);\n  outline: none;\n  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  width: 100%;\n  padding: 6px 12px;\n  color: var(--dp-text-color);\n  box-sizing: border-box;\n}\n\n.dp__input::placeholder {\n  opacity: 0.7;\n}\n\n.dp__input:hover {\n  border-color: var(--dp-border-color-hover);\n}\n\n.dp__input_focus {\n  border-color: var(--dp-border-color-hover);\n}\n\n.dp__disabled {\n  background: var(--dp-disabled-color);\n}\n\n.dp__disabled::placeholder {\n  color: var(--dp-disabled-color-text);\n}\n\n.dp__input_icons {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  stroke-width: 0;\n  padding: 6px 12px;\n  color: var(--dp-icon-color);\n  box-sizing: content-box;\n}\n\n.dp__input_icon {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n  color: var(--dp-icon-color);\n}\n\n.dp__clear_icon {\n  position: absolute;\n  top: 50%;\n  right: 0;\n  transform: translateY(-50%);\n  cursor: pointer;\n  color: var(--dp-icon-color);\n}\n\n.dp__input_icon_pad {\n  padding-left: 32px;\n}\n\n.dp__input_valid {\n  box-shadow: 0 0 4px var(--dp-success-color);\n  border-color: var(--dp-success-color);\n}\n\n.dp__input_valid:hover {\n  border-color: var(--dp-success-color);\n}\n\n.dp__input_invalid {\n  box-shadow: 0 0 4px var(--dp-danger-color);\n  border-color: var(--dp-danger-color);\n}\n\n.dp__input_invalid:hover {\n  border-color: var(--dp-danger-color);\n}\n\n.dp__menu {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  position: absolute;\n  background: var(--dp-background-color);\n  box-shadow: 0px 4px 16px -2px rgba(0, 0, 0, 0.2);\n  padding: 20px;\n  padding-top: 24px;\n  border-radius: 8px;\n  min-width: 260px;\n  user-select: none;\n  z-index: 99999;\n  box-sizing: border-box;\n}\n\n.dp__menu::after {\n  box-sizing: border-box;\n}\n\n.dp__menu::before {\n  box-sizing: border-box;\n}\n\n.dp__menu:focus {\n  outline: none;\n}\n\n.dp__menu_readonly,\n.dp__menu_disabled {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n\n.dp__menu_disabled {\n  background: rgba(255, 255, 255, 0.5);\n  cursor: not-allowed;\n}\n\n.dp__menu_readonly {\n  background: transparent;\n  cursor: default;\n}\n\n.dp__now_wrap {\n  text-align: center;\n  padding: 2px 0;\n}\n\n.dp__now_button {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  font-weight: 700;\n  border: 1px solid var(--dp-primary-color);\n  color: var(--dp-primary-color);\n  padding: 0 4px;\n  border-radius: 4px;\n  cursor: pointer;\n  background: transparent;\n}\n\n.dp__calendar_wrap {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  flex: 0;\n}\n\n.db__calendar_header {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #888;\n  white-space: nowrap;\n  margin-bottom: 4px;\n}\n\n.dp__calendar_header_item {\n  text-align: center;\n  flex-grow: 1;\n  padding: 5px;\n  width: 32px;\n  box-sizing: border-box;\n}\n\n.dp__calendar_row {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.dp__calendar_row:not(:last-child) {\n  margin-bottom: 4px;\n}\n\n.dp__calendar_item {\n  text-align: center;\n  flex-grow: 1;\n  box-sizing: border-box;\n  color: var(--dp-text-color);\n}\n.dp__calendar_item:not(:last-child) {\n  margin-right: 6px;\n}\n\n.dp__calendar {\n  position: relative;\n}\n\n.dp__calendar_content_wrap {\n  position: relative;\n}\n\n.dp__calendar_header_cell {\n  border-bottom: thin solid var(--dp-border-color);\n  padding: 8px;\n}\n\n.dp__cell_inner {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  justify-content: center;\n  border-radius: 100%;\n  height: 32px;\n  padding: 5px;\n  width: 32px;\n  box-sizing: border-box;\n  position: relative;\n}\n\n.dp__today:not(.dp__range_end, .dp__range_start) {\n  position: relative;\n}\n.dp__today:not(.dp__range_end, .dp__range_start)::before {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border-radius: 100%;\n  outline: 1px solid var(--dp-primary-color);\n  background: none;\n}\n\n.dp__today.dp__date_hover_end:hover::before,\n.dp__today.dp__date_hover_start:hover::before {\n  outline: none;\n}\n\n.dp__cell_auto_range_start,\n.dp__date_hover_start:hover,\n.dp__range_start {\n  position: relative;\n}\n.dp__cell_auto_range_start:before,\n.dp__date_hover_start:hover:before,\n.dp__range_start:before {\n  border-radius: 100%;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  background: var(--dp-hover-color);\n}\n\n.dp__cell_auto_range_end,\n.dp__date_hover_end:hover,\n.dp__range_end {\n  position: relative;\n}\n.dp__cell_auto_range_end:before,\n.dp__date_hover_end:hover:before,\n.dp__range_end:before {\n  border-radius: 100%;\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  background: var(--dp-hover-color);\n}\n\n.dp__range_end,\n.dp__range_start,\n.dp__active_date {\n  background: var(--dp-primary-color);\n  color: var(--dp-primary-text-color);\n}\n\n.dp__cell_auto_range_end,\n.dp__cell_auto_range_start {\n  border-top: 1px dashed var(--dp-primary-color);\n  border-bottom: 1px dashed var(--dp-primary-color);\n}\n\n.dp__date_hover_end:hover,\n.dp__date_hover_start:hover,\n.dp__date_hover:hover {\n  background: var(--dp-hover-color);\n  color: var(--dp-hover-text-color);\n}\n\n.dp__cell_offset {\n  color: var(--dp-secondary-color);\n}\n\n.dp__cell_disabled {\n  color: var(--dp-secondary-color);\n  cursor: default;\n}\n.dp__cell_disabled:hover {\n  background: inherit;\n  color: var(--dp-secondary-color);\n}\n.dp__cell_disabled:hover::after, .dp__cell_disabled:hover::before {\n  content: none;\n}\n\n.dp__range_start,\n.dp__date_hover_start:hover {\n  position: relative;\n}\n.dp__range_start::after,\n.dp__date_hover_start:hover::after {\n  content: \"\";\n  position: absolute;\n  height: 100%;\n  width: 6px;\n  background: var(--dp-hover-color);\n  right: -6px;\n}\n\n.dp__range_between {\n  background: var(--dp-hover-color);\n  border-radius: 0;\n  position: relative;\n}\n.dp__range_between::after, .dp__range_between::before {\n  content: \"\";\n  position: absolute;\n  height: 100%;\n  width: 6px;\n  background: var(--dp-hover-color);\n}\n.dp__range_between::before {\n  content: none;\n}\n.dp__range_between::after {\n  right: -6px;\n}\n\n.dp__week_num {\n  color: var(--dp-secondary-color);\n  text-align: center;\n}\n\n.dp__cell_auto_range {\n  border-radius: 0;\n  border-top: 1px dashed var(--dp-primary-color);\n  border-bottom: 1px dashed var(--dp-primary-color);\n}\n\n.dp__cell_auto_range_start {\n  border-left: 1px dashed var(--dp-primary-color);\n}\n\n.dp__cell_auto_range_end {\n  border-right: 1px dashed var(--dp-primary-color);\n}\n\n.dp__calendar_header {\n  display: flex;\n}\n\n.dp__calendar_header_separator {\n  width: 100%;\n  height: 1px;\n  background: var(--dp-border-color);\n}\n\n.dp__calendar_next {\n  margin-left: 10px;\n}\n\n.dp__marker_line,\n.dp__marker_dot {\n  height: 5px;\n  background-color: var(--dp-marker-color);\n  position: absolute;\n  bottom: 0;\n}\n\n.dp__marker_dot {\n  width: 5px;\n  border-radius: 50%;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.dp__marker_line {\n  width: 100%;\n  left: 0;\n}\n\n.dp__marker_tooltip {\n  position: absolute;\n  border-radius: 4px;\n  background-color: var(--dp-tooltip-color);\n  padding: 5px;\n  border: 1px solid var(--dp-border-color);\n  z-index: 99999;\n  box-sizing: border-box;\n  cursor: default;\n}\n\n.dp__tooltip_content {\n  white-space: nowrap;\n}\n\n.dp__tooltip_text {\n  display: flex;\n  align-items: center;\n  flex-flow: row nowrap;\n  color: var(--dp-text-color);\n}\n\n.dp__tooltip_mark {\n  height: 5px;\n  width: 5px;\n  border-radius: 50%;\n  background-color: var(--dp-text-color);\n  color: var(--dp-text-color);\n  margin-right: 5px;\n}\n\n.dp__arrow_bottom_tp {\n  left: 50%;\n  bottom: 0;\n  height: 8px;\n  width: 8px;\n  background-color: var(--dp-tooltip-color);\n  position: absolute;\n  border-right: 1px solid var(--dp-border-color);\n  border-bottom: 1px solid var(--dp-border-color);\n  transform: translate(-50%, 50%) rotate(45deg);\n}\n\n.dp__month_year_row {\n  display: flex;\n  align-items: center;\n  color: var(--dp-text-color);\n  box-sizing: border-box;\n  margin-bottom: 20px;\n}\n\n.dp__inner_nav {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  height: 25px;\n  width: 25px;\n  color: var(--dp-icon-color);\n  text-align: center;\n  border-radius: 50%;\n}\n\n.dp__inner_nav svg {\n  height: 20px;\n  width: 20px;\n}\n\n.dp__inner_nav:hover {\n  background: var(--dp-hover-color);\n  color: var(--dp-hover-icon-color);\n}\n\n.dp__month_year_select {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  font-weight: 700;\n  width: 50%;\n  text-align: center;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  box-sizing: border-box;\n}\n\n.dp__month_year_select:hover {\n  background: var(--dp-hover-color);\n  color: var(--dp-hover-text-color);\n}\n\n.dp__overlay {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  position: absolute;\n  overflow-y: auto;\n  width: 100%;\n  height: 100%;\n  background: var(--dp-background-color);\n  top: 0;\n  left: 0;\n  transition: opacity 1s ease-out;\n  z-index: 99999;\n  color: var(--dp-text-color);\n  box-sizing: border-box;\n}\n\n.dp__overlay::-webkit-scrollbar-track {\n  box-shadow: var(--dp-scroll-bar-background);\n  background-color: var(--dp-scroll-bar-background);\n}\n\n.dp__overlay::-webkit-scrollbar {\n  width: 5px;\n  background-color: var(--dp-scroll-bar-background);\n}\n\n.dp__overlay::-webkit-scrollbar-thumb {\n  background-color: var(--dp-scroll-bar-color);\n  border-radius: 10px;\n}\n\n.dp__overlay:focus {\n  border: none;\n  outline: none;\n}\n\n.dp__overlay_container {\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n}\n\n.dp__overlay_row {\n  padding: 0;\n  box-sizing: border-box;\n  display: flex;\n  margin-left: auto;\n  margin-right: auto;\n  flex-wrap: wrap;\n  max-width: 100%;\n  width: 100%;\n  align-items: center;\n}\n\n.dp__overlay_container > .dp__overlay_row {\n  flex: 1;\n}\n\n.dp__overlay_col {\n  box-sizing: border-box;\n  width: 33%;\n  padding: 3px;\n  white-space: nowrap;\n}\n\n.dp__overlay_cell_pad {\n  padding: 10px 0;\n}\n\n.dp__overlay_cell_active {\n  cursor: pointer;\n  border-radius: 4px;\n  text-align: center;\n  background: var(--dp-primary-color);\n  color: var(--dp-primary-text-color);\n}\n\n.dp__overlay_cell {\n  cursor: pointer;\n  border-radius: 4px;\n  text-align: center;\n}\n\n.dp__overlay_cell:hover {\n  background: var(--dp-hover-color);\n  color: var(--dp-hover-text-color);\n}\n\n.dp__overlay_action {\n  position: sticky;\n  bottom: 0;\n  background: var(--smed-base-09);\n}\n\n.dp__over_action_scroll {\n  right: 5px;\n  box-sizing: border-box;\n}\n\n.dp__overlay_cell_disabled {\n  cursor: not-allowed;\n  background: var(--dp-disabled-color);\n}\n\n.dp__overlay_cell_disabled:hover {\n  background: var(--dp-disabled-color);\n}\n\n.dp__month_picker_header {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: space-between;\n  height: 32px;\n}\n\n.dp__time_input {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n  color: var(--dp-text-color);\n}\n\n.dp__time_col_reg {\n  padding: 0 20px;\n}\n\n.dp__time_col_reg_with_button {\n  padding: 0 15px;\n}\n\n.dp__time_col_sec {\n  padding: 0 10px;\n}\n\n.dp__time_col_sec_with_button {\n  padding: 0 5px;\n}\n\n.dp__time_col {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.dp__time_display {\n  cursor: pointer;\n  color: var(--dp-text-color);\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 3px;\n}\n\n.dp__time_display:hover {\n  background: var(--dp-hover-color);\n  color: var(--dp-hover-text-color);\n}\n\n.dp__inc_dec_button {\n  padding: 5px;\n  margin: 0;\n  height: 32px;\n  width: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border-radius: 50%;\n  color: var(--dp-icon-color);\n  box-sizing: border-box;\n}\n\n.dp__inc_dec_button svg {\n  height: 32px;\n  width: 32px;\n}\n\n.dp__inc_dec_button:hover {\n  background: var(--dp-hover-color);\n  color: var(--dp-primary-color);\n}\n\n.dp__pm_am_button {\n  background: var(--dp-primary-color);\n  color: var(--dp-primary-text-color);\n  border: none;\n  padding: 10px;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.dp__action_row {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: 10px;\n  box-sizing: border-box;\n  color: var(--dp-text-color);\n  background: var(--dp-background-color);\n}\n\n.dp__action_row svg {\n  height: 20px;\n  width: auto;\n}\n\n.dp__selection_preview {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  width: 50%;\n  color: var(--dp-text-color);\n}\n\n.dp__action_buttons {\n  width: 50%;\n  text-align: right;\n}\n\n.dp__action {\n  font-weight: 700;\n  cursor: pointer;\n  padding: 2px 5px;\n  border-radius: 4px;\n  display: inline-flex;\n  align-items: center;\n}\n\n.dp__select {\n  color: var(--dp-success-color);\n}\n\n.dp__action_disabled {\n  color: var(--dp-success-color-disabled);\n  cursor: not-allowed;\n}\n\n.dp__cancel {\n  color: var(--dp-secondary-color);\n}\n\n.dp__main {\n  font-size: 17px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0px;\n  user-select: none;\n  box-sizing: border-box;\n}\n\n.dp__pointer {\n  cursor: pointer;\n}\n\n.dp__icon {\n  stroke: currentColor;\n  fill: currentColor;\n}\n\n.dp__button {\n  width: 100%;\n  text-align: center;\n  color: var(--dp-icon-color);\n  background: var(--dp-background-color);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  align-content: center;\n  justify-content: center;\n  padding: 10px;\n  box-sizing: border-box;\n  height: 32px;\n}\n\n.dp__button:hover {\n  background: var(--dp-hover-color);\n  color: var(--dp-hover-icon-color);\n}\n\n.dp__button svg {\n  height: 20px;\n  width: auto;\n}\n\n.dp__button_bottom {\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n\n.dp__flex_display {\n  display: flex;\n  position: relative;\n}\n\n.dp__relative {\n  position: relative;\n}\n\n.dp-open-enter-active,\n.dp-open-leave-active,\n.dp-close-enter-active,\n.dp-close-leave-active,\n.calendar-next-enter-active,\n.calendar-next-leave-active,\n.calendar-prev-enter-active,\n.calendar-prev-leave-active {\n  transition: all 0.1s cubic-bezier(0.19, 1, 0.22, 1);\n}\n\n.calendar-next-enter-from {\n  opacity: 0;\n  transform: translateX(22px);\n}\n\n.calendar-next-leave-to {\n  opacity: 0;\n  transform: translateX(-22px);\n}\n\n.calendar-prev-enter-from {\n  opacity: 0;\n  transform: translateX(-22px);\n}\n\n.calendar-prev-leave-to {\n  opacity: 0;\n  transform: translateX(22px);\n}\n\n.dp-open-enter-from {\n  opacity: 0;\n  transform: translateY(-22px);\n}\n\n.dp-open-leave-to {\n  opacity: 0;\n  transform: translateY(22px);\n}\n\n.dp-close-enter-from {\n  opacity: 0;\n  transform: translateY(22px);\n}\n\n.dp-close-leave-to {\n  opacity: 0;\n  transform: translateY(-22px);\n}\n\n.dp__month_year_select {\n  width: auto;\n  margin: 0 auto;\n}\n.dp__month_year_select:nth-child(2) {\n  margin-right: 0;\n}\n.dp__month_year_select:nth-child(3) {\n  margin-left: 3px;\n}\n.dp__month_year_select:hover {\n  background: none;\n  color: inherit;\n}\n\n.dp__calendar_header_separator {\n  display: none;\n}\n\n.dp__calendar_row .dp__calendar_item:last-child .dp__range_between {\n  background: inherit;\n}\n.dp__calendar_row .dp__calendar_item:last-child .dp__range_between::after {\n  content: \"\";\n  width: calc(100% + 4px);\n  right: -4px;\n  background: var(--dp-hover-color);\n  height: 100%;\n  border-radius: 0 100% 100% 0;\n  left: 0px;\n}\n\n.dp__calendar_row .dp__calendar_item:first-child .dp__range_between {\n  background: inherit;\n}\n.dp__calendar_row .dp__calendar_item:first-child .dp__range_between::before {\n  content: \"\";\n  width: calc(100% + 4px);\n  left: -4px;\n  background: var(--dp-hover-color);\n  height: 100%;\n  border-radius: 100% 0 0 100%;\n}\n\n.dp__calendar_item .dp__range_start.dp__range_end::before, .dp__calendar_item .dp__range_start.dp__range_end::after {\n  content: none;\n}";
  styleInject(css_248z$1);

  var script = {
      name: "Datepicker",
      props: {
          disableNextDate: Boolean,
          inline: Boolean,
          modelValue: [Date, String, Array, Object],
          position: {
              type: String,
              default: "right",
              validator: (value) => ["left", "center", "right"].includes(value),
          },
          range: Boolean,
          closeOnAutoApply: {
              type: Boolean,
              default: true,
          },
          disabledDates: {
              type: Function,
              default: () => false,
          },
      },
      methods: {
          firstUpperChar(str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
          },
          disableTheFollowingDates(date) {
              return new Date() < date;
          },
      },
      components: {
          TempDatepicker: TempDatepicker__default["default"],
      },
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_temp_datepicker = vue.resolveComponent("temp-datepicker");

    return (vue.openBlock(), vue.createBlock(_component_temp_datepicker, {
      locale: "ru",
      "auto-apply": "",
      "month-name-format": "long",
      range: $props.range,
      inline: $props.inline,
      "close-on-auto-apply": $props.closeOnAutoApply,
      "enable-time-picker": false,
      position: $props.position,
      modelValue: $props.modelValue,
      disabledDates: $props.disabledDates,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', $event)))
    }, {
      trigger: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      month: vue.withCtx(({ text }) => [
        vue.createTextVNode(vue.toDisplayString($options.firstUpperChar(text)), 1)
      ]),
      "calendar-header": vue.withCtx(({ index, day }) => [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(index === 5 || index === 6 ? _ctx.$style.redColor : '')
        }, vue.toDisplayString($options.firstUpperChar(day)), 3)
      ]),
      _: 3
    }, 8, ["range", "inline", "close-on-auto-apply", "position", "modelValue", "disabledDates"]))
  }

  var css_248z = "._redColor_bgfs1_1 {\n  color: var(--smed-support-secondary-01);\n}";
  styleInject(css_248z);

  var style0 = {"redColor":"_redColor_bgfs1_1"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(TempDatepicker, Vue);
