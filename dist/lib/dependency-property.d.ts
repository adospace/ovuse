import { DependencyObject } from '.';
export declare class DependencyProperty {
    name: string;
    typeName: string;
    options: any;
    converter: ((value: string) => any) | undefined;
    private _defaultValue;
    constructor(name: string, typeName: string, defaultValue?: any, options?: any, converter?: ((value: string) => any) | undefined);
    private _defaultValueMap;
    overrideDefaultValue(typeName: string, defaultValue: any): void;
    getDefaultValue(depObject: DependencyObject): any;
}
