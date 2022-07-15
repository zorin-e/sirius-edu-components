import useVuelidate from '@vuelidate/core';
import { ref, computed } from 'vue';
import { helpers, required as required$1, email as email$1, minValue as minValue$1, maxValue as maxValue$1, minLength as minLength$1, maxLength as maxLength$1 } from '@vuelidate/validators';
import lodashthrottle from 'lodash.throttle';

function createControl(key, value, $vuelidate) {
    const initialValue = value.value;
    const disabled = ref(false);
    const customErrors = ref({});
    const errorsComputed = computed(() => {
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
    const customFirstError = computed(() => {
        const keys = Object.keys(customErrors.value);
        if (keys.length === 0) {
            return null;
        }
        return { [keys[0]]: customErrors.value[keys[0]] };
    });
    const error = computed(() => {
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
    const invalid = computed(() => (disabled.value ? false : !!error.value));
    const valid = computed(() => !invalid.value);
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
            [key]: ref(value),
        };
    }, {});
    const $vuelidate = useVuelidate(validators, state);
    const controls = Object.keys(state).reduce((result, key) => {
        return {
            ...result,
            [key]: createControl(key, state[key], $vuelidate),
        };
    }, {});
    const invalid = computed(() => Object.keys(controls).some((key) => controls[key].invalid.value));
    const valid = computed(() => !invalid.value);
    const errors = computed(() => invalid.value
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

const required = helpers.withMessage("Заполните поле", required$1);
const requiredTrue = helpers.withMessage("Заполните поле", (value) => value === true);
const email = helpers.withMessage("Введите корректный адрес электронной почты", email$1);
const minValue = (value) => helpers.withMessage(`Значение должно быть не меньше ${value}`, minValue$1(value));
const maxValue = (value) => helpers.withMessage(`Значение должно быть не больше ${value}`, maxValue$1(value));
const minLength = (length) => helpers.withMessage(`Длина должна быть не меньше ${length}`, minLength$1(length));
const maxLength = (length) => helpers.withMessage(`Длина должна быть не больше ${length}`, maxLength$1(length));
const phone = helpers.withMessage("Некорректный номер мобильного телефона", (value) => /^[+]*7\d{10}$/.test(getPhoneNumber(value)));
const not = (obj) => helpers.withMessage("Заполните поле", (value) => value !== obj);
const pattern = (reg) => helpers.withMessage("Невалидное поле", (value) => {
    const regexp = typeof reg === "string" ? new RegExp(reg) : reg;
    return regexp.test(value);
});

function throttle(func, waitms) {
    return lodashthrottle(func, waitms, { leading: true, trailing: false });
}

export { createForm, email, maxLength, maxValue, minLength, minValue, not, pattern, phone, required, requiredTrue, throttle };
