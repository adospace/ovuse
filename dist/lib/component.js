"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function component(name) {
    return function (constructor) {
        constructor["__componentName"] = name;
    };
}
exports.component = component;
function componentName(obj) {
    return obj.constructor["__componentName"];
}
exports.componentName = componentName;
