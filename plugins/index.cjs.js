'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const ACTIVE_ELEMENT_TOKEN = "__SmartMed_ACTIVE_ELEMENT_TOKEN";

function getTarget(event) {
    return event.target;
}
function getDocumentOrShadowRoot(node) {
    return "getRootNode" in node && node.isConnected
        ? node.getRootNode()
        : node.ownerDocument;
}
function isValidFocusOut(target) {
    return (getDocumentOrShadowRoot(target).activeElement !== target &&
        !target.disabled);
}
const ActiveElementPlugin = {
    install(app) {
        const activeElement = vue.ref(null);
        const focusoutCallback = (event) => {
            const target = getTarget(event);
            const isValid = isValidFocusOut(target);
            if (isValid) {
                activeElement.value = event.relatedTarget;
            }
        };
        const mousedownCallback = (event) => {
            window.removeEventListener("focusout", focusoutCallback);
            if (!document.activeElement || document.activeElement === document.body) {
                activeElement.value = getTarget(event);
            }
            else {
                let timeout = null;
                const focusEventsAfterMousedown = () => {
                    activeElement.value = getTarget(event);
                    window.removeEventListener("focusout", focusEventsAfterMousedown);
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                };
                window.addEventListener("focusout", focusEventsAfterMousedown);
                timeout = setTimeout(() => {
                    timeout = null;
                    window.removeEventListener("focusout", focusEventsAfterMousedown);
                });
            }
        };
        window.addEventListener("mousedown", mousedownCallback);
        window.addEventListener("mouseup", () => {
            window.addEventListener("focusout", focusoutCallback);
        });
        let prevRoot = null;
        const focusinOnDocumentOrShadowRoot = (event) => {
            activeElement.value = event.target;
        };
        const focusoutOnDocumentOrShadowRoot = (event) => {
            if (!!event.relatedTarget && !isValidFocusOut(event.target)) {
                activeElement.value = event.relatedTarget;
            }
        };
        window.addEventListener("focusin", (event) => {
            const target = getTarget(event);
            const root = getDocumentOrShadowRoot(target);
            if (prevRoot) {
                prevRoot.removeEventListener("focusin", focusinOnDocumentOrShadowRoot);
                prevRoot.removeEventListener("focusout", focusoutOnDocumentOrShadowRoot);
            }
            if (root === document) {
                if (target.getAttribute("tabIndex") === "-1") {
                    return;
                }
                activeElement.value = target;
                return;
            }
            prevRoot = root;
            prevRoot.addEventListener("focusin", focusinOnDocumentOrShadowRoot);
            prevRoot.addEventListener("focusout", focusoutOnDocumentOrShadowRoot);
        });
        window.addEventListener("focusout", focusoutCallback);
        window.addEventListener("blur", () => {
            const element = document.activeElement;
            if (element && element.matches("iframe")) {
                activeElement.value = element;
            }
        });
        app.provide(ACTIVE_ELEMENT_TOKEN, vue.readonly(activeElement));
    },
};

const SELECTION_CHANGE_TOKEN = "__SmartMed_SELECTION_CHANGE_TOKEN";

const SelectionChangePlugin = {
    install(app) {
        const selectionEvent = vue.ref(null);
        const selectionChange = (event) => {
            selectionEvent.value = event;
        };
        document.addEventListener("selectionchange", selectionChange);
        app.provide(SELECTION_CHANGE_TOKEN, vue.readonly(selectionEvent));
    },
};

exports.ActiveElementPlugin = ActiveElementPlugin;
exports.SelectionChangePlugin = SelectionChangePlugin;
