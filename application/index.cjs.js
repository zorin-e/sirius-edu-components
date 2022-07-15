'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tokens = require('@smartmed/webpatient-vue-components/tokens');
var vue = require('vue');

let autoId = 0;
function useInteractive() {
    const native = vue.ref(null);
    const focused = vue.ref(false);
    const controlAccessor = vue.inject(tokens.CONTROL_ACCESSOR_TOKEN, null);
    const onFocus = () => {
        focused.value = true;
    };
    const onBlur = () => {
        focused.value = false;
        if (controlAccessor) {
            controlAccessor.markAsTouch();
        }
    };
    const nativeElement = vue.computed(() => {
        if (!native.value) {
            return null;
        }
        return native.value instanceof HTMLElement
            ? native.value
            : native.value.$refs.native;
    });
    vue.onMounted(() => {
        const element = nativeElement.value;
        if (element && typeof element.addEventListener === "function") {
            element.addEventListener("focus", onFocus);
            element.addEventListener("blur", onBlur);
        }
    });
    vue.onBeforeUnmount(() => {
        const element = nativeElement.value;
        if (element && typeof element.removeEventListener === "function") {
            element.removeEventListener("focus", onFocus);
            element.removeEventListener("blur", onBlur);
        }
    });
    const focus = () => {
        if (nativeElement.value) {
            nativeElement.value.focus();
        }
    };
    const blur = () => {
        if (nativeElement.value) {
            nativeElement.value.blur();
        }
    };
    return {
        native,
        focused,
        id: `sm-interactive_${autoId++}_${Date.now()}`,
        focus,
        blur,
    };
}

const defaultModifiers = {
    trim: (value) => (typeof value === "string" ? value.trim() : value),
    capitalize: (value) => typeof value === "string"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value,
    uppercase: (value) => typeof value === "string" ? value.toUpperCase() : value,
    lowercase: (value) => typeof value === "string" ? value.toLowerCase() : value,
};
function useModelModifiers(activeModifiers) {
    const modelModifiers = vue.inject(tokens.MODEL_MODIFIERS_TOKEN, defaultModifiers);
    const noopModifier = (v) => v;
    const toModify = Object.keys(activeModifiers)
        .filter((key) => activeModifiers[key])
        .map((key) => modelModifiers[key] || defaultModifiers[key] || noopModifier);
    const modify = (value) => {
        let modifiedValue = value;
        toModify.forEach((modifyFn) => {
            modifiedValue = modifyFn(modifiedValue);
        });
        return modifiedValue;
    };
    return {
        modify,
    };
}

exports.useInteractive = useInteractive;
exports.useModelModifiers = useModelModifiers;
