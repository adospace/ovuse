import { DependencyObject, DependencyProperty } from '..';
export declare class ConverterContext {
    target: DependencyObject;
    targetProperty: DependencyProperty;
    source: DependencyObject | undefined;
    sourceProperty: DependencyProperty | undefined;
    parameter: any;
    constructor(target: DependencyObject, targetProperty: DependencyProperty, source?: DependencyObject | undefined, sourceProperty?: DependencyProperty | undefined, parameter?: any);
}
