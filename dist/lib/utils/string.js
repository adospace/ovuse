"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function format(input) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return input.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
}
exports.format = format;
function toUpperFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
exports.toUpperFirstLetter = toUpperFirstLetter;
function toLowerFirstLetter(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
}
exports.toLowerFirstLetter = toLowerFirstLetter;
function startsWith(input, startsWith) {
    return input.lastIndexOf(startsWith, 0) == 0;
}
exports.startsWith = startsWith;
