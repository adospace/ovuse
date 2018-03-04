import { DependencyProperty } from '.';
import { ISupportDependencyPropertyChange, ISupportPropertyChange, IConverter } from './contracts';
export declare class DependencyObject {
    private static globalPropertyMap;
    static registerProperty(typeName: string, name: string, defaultValue?: any, options?: any, converter?: {
        (value: string): any;
    }): DependencyProperty;
    static getProperty(typeName: string, name: string): DependencyProperty | undefined;
    static getProperties(typeName: string): DependencyProperty[] | undefined;
    static forAllProperties(obj: DependencyObject, callback: (DependencyProperty: DependencyProperty) => void): void;
    static lookupProperty(obj: DependencyObject, name: string): DependencyProperty | undefined;
    protected localPropertyValueMap: {
        [propertyName: string]: any;
    };
    getValue(property: DependencyProperty): any;
    setValue(property: DependencyProperty, value: any): void;
    resetValue(property: DependencyProperty): void;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    private dpcHandlers;
    subscribeDependencyPropertyChanges(observer: ISupportDependencyPropertyChange): void;
    unsubscribeDependencyPropertyChanges(observer: ISupportDependencyPropertyChange): void;
    protected onPropertyChanged(propertyName: string, value: any, oldValue: any): void;
    private pcHandlers;
    subscribePropertyChanges(observer: ISupportPropertyChange): void;
    unsubscribePropertyChanges(observer: ISupportPropertyChange): void;
    private bindings;
    bind(property: DependencyProperty, propertyPath: string, twoway: boolean, source: DependencyObject, converter?: IConverter, converterParameter?: any, format?: string): void;
    static logBindingTraceToConsole: boolean;
}
