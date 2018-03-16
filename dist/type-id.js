"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var typeIdKey = "__DependencyObjectId";
function DependencyObjectId(name) {
    return function (constructor) {
        var typeName = (constructor['name']);
        constructor.prototype[typeIdKey + "_" + typeName] = name;
        _1.DependencyObject.finalizePropertyRegistrations(constructor);
    };
}
exports.DependencyObjectId = DependencyObjectId;
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
