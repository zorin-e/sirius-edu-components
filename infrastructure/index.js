this.smartmed = this.smartmed || {};
this.smartmed.infrastructure = (function (exports, useVuelidate, vue, validators, lodashthrottle) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var useVuelidate__default = /*#__PURE__*/_interopDefaultLegacy(useVuelidate);
  var lodashthrottle__default = /*#__PURE__*/_interopDefaultLegacy(lodashthrottle);

  function createControl(key, value, $vuelidate) {
      const initialValue = value.value;
      const disabled = vue.ref(false);
      const customErrors = vue.ref({});
      const errorsComputed = vue.computed(() => {
          const errorsList = $vuelidate.value[key].$errors;
          if (disabled.value || errorsList.length === 0) {
              return {};
          }
          return errorsList.reduce((result, error) => {
              return {
                  ...result,
                  [error.$validator]: typeof error.$message === "string"
                      ? error.$message
                      : error.$message.value,
              };
          }, { ...customErrors.value });
      });
      const customFirstError = vue.computed(() => {
          const keys = Object.keys(customErrors.value);
          if (keys.length === 0) {
              return null;
          }
          return { [keys[0]]: customErrors.value[keys[0]] };
      });
      const error = vue.computed(() => {
          const customError = customFirstError.value;
          const firstError = $vuelidate.value[key].$errors[0];
          if (disabled.value || (!firstError && !customError)) {
              return null;
          }
          return firstError
              ? {
                  [firstError.$validator]: typeof firstError.$message === "string"
                      ? firstError.$message
                      : firstError.$message.value,
              }
              : customError;
      });
      const invalid = vue.computed(() => (disabled.value ? false : !!error.value));
      const valid = vue.computed(() => !invalid.value);
      const setValue = (val) => {
          value.value = val;
      };
      const markAsTouch = () => {
          if (disabled.value) {
              return;
          }
          $vuelidate.value[key].$touch();
      };
      const disable = () => {
          disabled.value = true;
      };
      const enable = () => {
          disabled.value = false;
      };
      const reset = () => {
          setValue(initialValue);
          $vuelidate.value[key].$reset();
      };
      const setErrors = (errors) => {
          customErrors.value = errors;
      };
      const removeErrors = (errorsKeys) => {
          customErrors.value = Object.keys(customErrors.value).reduce((result, key) => {
              if (errorsKeys.includes(key)) {
                  return result;
              }
              return {
                  ...result,
                  [key]: customErrors.value[key],
              };
          }, {});
      };
      return {
          error,
          errors: errorsComputed,
          value,
          setValue,
          invalid,
          valid,
          reset,
          disabled,
          disable,
          enable,
          markAsTouch,
          setErrors,
          removeErrors,
      };
  }
  function createForm(form) {
      const validators = Object.keys(form).reduce((result, key) => {
          const [_, validators] = form[key];
          return {
              ...result,
              [key]: validators || {},
          };
      }, {});
      const state = Object.keys(form).reduce((result, key) => {
          const [value] = form[key];
          return {
              ...result,
              [key]: vue.ref(value),
          };
      }, {});
      const $vuelidate = useVuelidate__default["default"](validators, state);
      const controls = Object.keys(state).reduce((result, key) => {
          return {
              ...result,
              [key]: createControl(key, state[key], $vuelidate),
          };
      }, {});
      const invalid = vue.computed(() => Object.keys(controls).some((key) => controls[key].invalid.value));
      const valid = vue.computed(() => !invalid.value);
      const errors = vue.computed(() => invalid.value
          ? Object.keys(controls)
              .filter((key) => controls[key].invalid.value)
              .reduce((result, key) => {
              return {
                  ...result,
                  [key]: controls[key].errors.value,
              };
          }, {})
          : {});
      const markAsTouch = () => {
          Object.keys(controls).forEach((key) => controls[key].markAsTouch());
      };
      const validate = () => {
          markAsTouch();
      };
      const getCurrentValue = () => {
          return Object.keys(state).reduce((result, key) => {
              return {
                  ...result,
                  [key]: state[key].value,
              };
          }, {});
      };
      return {
          invalid,
          valid,
          markAsTouch,
          errors,
          validate,
          value: state,
          getCurrentValue,
          ...controls,
      };
  }

  function getPhoneNumber(dirtyPhoneNumber) {
      return dirtyPhoneNumber.replace(/[+ \-_]/g, "");
  }

  const required = validators.helpers.withMessage("?????????????????? ????????", validators.required);
  const requiredTrue = validators.helpers.withMessage("?????????????????? ????????", (value) => value === true);
  const email = validators.helpers.withMessage("?????????????? ???????????????????? ?????????? ?????????????????????? ??????????", validators.email);
  const minValue = (value) => validators.helpers.withMessage(`???????????????? ???????????? ???????? ???? ???????????? ${value}`, validators.minValue(value));
  const maxValue = (value) => validators.helpers.withMessage(`???????????????? ???????????? ???????? ???? ???????????? ${value}`, validators.maxValue(value));
  const minLength = (length) => validators.helpers.withMessage(`?????????? ???????????? ???????? ???? ???????????? ${length}`, validators.minLength(length));
  const maxLength = (length) => validators.helpers.withMessage(`?????????? ???????????? ???????? ???? ???????????? ${length}`, validators.maxLength(length));
  const phone = validators.helpers.withMessage("???????????????????????? ?????????? ???????????????????? ????????????????", (value) => /^[+]*7\d{10}$/.test(getPhoneNumber(value)));
  const not = (obj) => validators.helpers.withMessage("?????????????????? ????????", (value) => value !== obj);
  const pattern = (reg) => validators.helpers.withMessage("???????????????????? ????????", (value) => {
      const regexp = typeof reg === "string" ? new RegExp(reg) : reg;
      return regexp.test(value);
  });

  function throttle(func, waitms) {
      return lodashthrottle__default["default"](func, waitms, { leading: true, trailing: false });
  }

  exports.createForm = createForm;
  exports.email = email;
  exports.maxLength = maxLength;
  exports.maxValue = maxValue;
  exports.minLength = minLength;
  exports.minValue = minValue;
  exports.not = not;
  exports.pattern = pattern;
  exports.phone = phone;
  exports.required = required;
  exports.requiredTrue = requiredTrue;
  exports.throttle = throttle;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, useVuelidate, Vue, validators, lodashthrottle);
