import { TextBlock } from '.';
import { DependencyProperty } from '../.';
export declare class Label extends TextBlock {
    static typeName: string;
    readonly typeName: string;
    private _label;
    protected createElement(elementContainer: HTMLElement): HTMLElement;
    static htmlForProperty: DependencyProperty;
    htmlFor: string;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
}
