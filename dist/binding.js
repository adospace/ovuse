"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Binding {
    constructor(target, targetProperty, propertyPath, source, twoWay = false, converter, converterParameter, format) {
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
    updateTarget() {
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
            this.target.setValue(this.targetProperty, this.format != undefined ? this.format.format(valueToSet) : valueToSet); //update target
        }
        else if (this.source != undefined) {
            //if source is not undefined and retValue.success is false
            //means that something in binding to original source has broken
            //I need to reset the source and update target property to its default value
            this.target.resetValue(this.targetProperty);
            this.source = undefined;
            this.sourceProperty = undefined;
        }
    }
    onDependencyPropertyChanged(DependencyObject, DependencyProperty) {
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
    }
}
exports.Binding = Binding;
