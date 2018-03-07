

import { DependencyObject, DependencyProperty, PropertyPath } from '.'
import { ISupportDependencyPropertyChange, IConverter } from './contracts'

export class Binding implements ISupportDependencyPropertyChange {
    target: DependencyObject;
    targetProperty: DependencyProperty;
    path: PropertyPath;
    twoWay: boolean = false;
    converter: IConverter | undefined;
    converterParameter: any | undefined;
    format: string | undefined;

    private source: DependencyObject | undefined;
    private sourceProperty: DependencyProperty | undefined;

    constructor(target: DependencyObject, 
        targetProperty: DependencyProperty, 
        propertyPath: string, 
        source: DependencyObject, 
        twoWay: boolean = false, 
        converter?: IConverter, 
        converterParameter?: any, 
        format?: string) {

        this.target = target;
        this.targetProperty = targetProperty;
        this.path = new PropertyPath(this, propertyPath, source);
        this.twoWay = twoWay;
        this.converter = converter;
        this.converterParameter = converterParameter;
        this.format = format;

        this.updateTarget();

        if (this.twoWay)
            this.target.subscribeDependencyPropertyChanges(this);
    }

    updateTarget(): void {
        var retValue = this.path.getValue();

        if (retValue.success) {
            this.source = retValue.source;
            this.sourceProperty = retValue.sourceProperty;

            var valueToSet = this.converter != undefined ? this.converter.convert(retValue.value,
                {
                    source: this.source,
                    sourceProperty: this.sourceProperty,
                    target: this.target,
                    targetProperty: this.targetProperty,
                    parameter: this.converterParameter
                }) : retValue.value;
            this.target.setValue(this.targetProperty, this.format != undefined ? this.format.format(valueToSet) : valueToSet);//update target
        }
        else if (this.source != undefined) {
            //if source is not undefined and retValue.success is false
            //means that something in binding to original source has broken
            //I need to reset the source and update target property to its default value
            this.target.resetValue(this.targetProperty)
            this.source = undefined;
            this.sourceProperty = undefined;
        }
    }

    onDependencyPropertyChanged(DependencyObject: DependencyObject, DependencyProperty: DependencyProperty) {
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