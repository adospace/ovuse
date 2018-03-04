"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var utils_1 = require("./utils");
var Binding = /** @class */ (function () {
    function Binding(target, targetProperty, propertyPath, source, twoWay, converter, converterParameter, format) {
        if (twoWay === void 0) { twoWay = false; }
        this.twoWay = false;
        this.target = target;
        this.targetProperty = targetProperty;
        this.path = new _1.PropertyPath(this, propertyPath, source);
        this.twoWay = twoWay;
        this.converter = converter;
        this.converterParameter = converterParameter;
        this.format = format;
        this.updateTarget();
        if (this.twoWay)
            this.target.subscribeDependencyPropertyChanges(this);
    }
    Binding.prototype.updateTarget = function () {
        var retValue = this.path.getValue();
        if (retValue.success) {
            this.source = retValue.source;
            this.sourceProperty = retValue.sourceProperty;
            var valueToSet = this.converter != undefined ? this.converter.convert(retValue.value, {
                source: this.source,
                sourceProperty: this.sourceProperty,
                target: this.target,
                targetProperty: this.targetProperty,
                parameter: this.converterParameter
            }) : retValue.value;
            this.target.setValue(this.targetProperty, this.format != undefined ? utils_1.format(valueToSet) : valueToSet); //update target
        }
        else if (this.source != undefined) {
            //if source is not undefined and retValue.success is false
            //means that something in binding to original source has broken
            //I need to reset the source and update target property to its default value
            this.target.resetValue(this.targetProperty);
            this.source = undefined;
            this.sourceProperty = undefined;
        }
    };
    Binding.prototype.onDependencyPropertyChanged = function (DependencyObject, DependencyProperty) {
        if (DependencyObject == this.target &&
            DependencyProperty == this.targetProperty &&
            this.twoWay) {
            //if target property value is changed than update source
            //(twoway mode on)
            var value = DependencyObject.getValue(DependencyProperty);
            this.path.setValue(this.converter != undefined ? this.converter.convertBack(value, {
                source: this.source,
                sourceProperty: this.sourceProperty,
                target: this.target,
                targetProperty: this.targetProperty,
                parameter: this.converterParameter
            }) : value);
        }
    };
    return Binding;
}());
exports.Binding = Binding;
