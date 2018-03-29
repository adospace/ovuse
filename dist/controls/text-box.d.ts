import { FrameworkElement, Size } from '.';
import { DependencyProperty } from '../.';
export declare class TextBox extends FrameworkElement {
    private _pElement;
    attachVisualOverride(elementContainer: HTMLElement): void;
    onTextChanged(): void;
    private _measuredSize;
    protected measureOverride(constraint: Size): Size;
    protected layoutOverride(): void;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    static textProperty: DependencyProperty;
    text: string;
    static placeholderProperty: DependencyProperty;
    placeholder: string;
    static typeProperty: DependencyProperty;
    type: string;
    static isReadonlyProperty: DependencyProperty;
    isReadonly: boolean;
}
