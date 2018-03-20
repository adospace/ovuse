"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConverterContext {
    constructor(target, targetProperty, source, sourceProperty, parameter) {
        this.target = target;
        this.targetProperty = targetProperty;
        this.source = source;
        this.sourceProperty = sourceProperty;
        this.parameter = parameter;
    }
}
exports.ConverterContext = ConverterContext;
