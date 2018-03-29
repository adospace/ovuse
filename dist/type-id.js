"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const utils_1 = require("./utils");
const typeIdKey = "__ovuseDependencyObjectId";
function TypeId(name) {
    return (constructor) => {
        var typeName = (constructor['name']);
        constructor.prototype[typeIdKey + "_" + typeName] = name;
        _1.DependencyObject.finalizePropertyRegistrations(constructor);
        _1.InstanceLoader.registerType(constructor);
    };
}
exports.TypeId = TypeId;
function getObjectTypeId(obj) {
    var typeName = (obj.constructor['name']);
    return obj[typeIdKey + "_" + typeName];
}
exports.getObjectTypeId = getObjectTypeId;
function getTypeId(type) {
    var typeName = (type['name']);
    return type.prototype[typeIdKey + "_" + typeName];
}
exports.getTypeId = getTypeId;
function hasTypeId(type) {
    var typeName = (type['name']);
    return utils_1.hasProperty(type.prototype, typeIdKey + "_" + typeName);
}
exports.hasTypeId = hasTypeId;
