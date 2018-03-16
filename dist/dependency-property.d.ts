import { DependencyObject } from '.';
export declare class DependencyProperty {
    name: string;
    typeName: string | undefined;
    options: any;
    converter: ((value: string) => any) | undefined;
    private _defaultValue;
    constructor(name: string, typeName?: string | undefined, defaultValue?: any, options?: any, converter?: ((value: string) => any) | undefined);
    private _defaultValueMap;
    overrideDefaultValue(type: any, defaultValue: any): void;
    getDefaultValue(depObject: DependencyObject): any;
}
