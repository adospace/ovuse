import { DependencyObject, DependencyProperty, PropertyPath } from '.';
import { ISupportDependencyPropertyChange, IConverter } from './contracts';
export declare class Binding implements ISupportDependencyPropertyChange {
    target: DependencyObject;
    targetProperty: DependencyProperty;
    path: PropertyPath;
    twoWay: boolean;
    converter: IConverter | undefined;
    converterParameter: any | undefined;
    format: string | undefined;
    private source;
    private sourceProperty;
    constructor(target: DependencyObject, targetProperty: DependencyProperty, propertyPath: string, source: DependencyObject, twoWay?: boolean, converter?: IConverter, converterParameter?: any, format?: string);
    updateTarget(): void;
    onDependencyPropertyChanged(DependencyObject: DependencyObject, DependencyProperty: DependencyProperty): void;
}
