"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var typeIdKey = "__typeId";
function typeId(name) {
    return function (constructor) {
        constructor.prototype[typeIdKey] = name;
        _1.DependencyObject.finalizePropertyRegistrations(constructor);
    };
}
exports.typeId = typeId;
function getObjectTypeId(obj) {
    return obj[typeIdKey];
}
exports.getObjectTypeId = getObjectTypeId;
function getTypeId(type) {
    return type.prototype[typeIdKey];
}
exports.getTypeId = getTypeId;
