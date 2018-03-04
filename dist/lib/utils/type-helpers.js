"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasProperty(obj, propertyName) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    if (proto == "")
        return false;
    return (propertyName in obj) || (propertyName in proto);
}
exports.hasProperty = hasProperty;
function isString(obj) {
    return (typeof obj == "string" || obj instanceof String);
}
exports.isString = isString;
function getTypeName(obj) {
    return obj.constructor.Name;
}
exports.getTypeName = getTypeName;
function getFirstAnchestor(obj) {
    return obj["__proto__"];
}
exports.getFirstAnchestor = getFirstAnchestor;
function getPropertyValue(obj, propertyName) {
    return obj[propertyName];
}
exports.getPropertyValue = getPropertyValue;
function setPropertyValue(obj, propertyName, value) {
    obj[propertyName] = value;
}
exports.setPropertyValue = setPropertyValue;
