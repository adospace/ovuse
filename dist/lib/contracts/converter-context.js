"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConverterContext = /** @class */ (function () {
    function ConverterContext(target, targetProperty, source, sourceProperty, parameter) {
        this.target = target;
        this.targetProperty = targetProperty;
        this.source = source;
        this.sourceProperty = sourceProperty;
        this.parameter = parameter;
    }
    return ConverterContext;
}());
exports.ConverterContext = ConverterContext;
