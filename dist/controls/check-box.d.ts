import { FrameworkElement, Size } from '.';
import { DependencyProperty } from '../.';
export declare class CheckBox extends FrameworkElement {
    private _pElementInput;
    attachVisualOverride(elementContainer: HTMLElement): void;
    onCheckChanged(): void;
    private _measuredSize;
    protected measureOverride(constraint: Size): Size;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    static isCheckedProperty: DependencyProperty;
    isChecked: boolean;
    static nameProperty: DependencyProperty;
    readonly name: string;
    placeholder: string;
    static typeProperty: DependencyProperty;
    type: string;
}
