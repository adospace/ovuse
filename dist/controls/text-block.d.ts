import { FrameworkElement, Size } from '.';
import { DependencyProperty } from '../.';
export declare class TextBlock extends FrameworkElement {
    private _pElement;
    protected createElement(elementContainer: HTMLElement): HTMLElement;
    attachVisualOverride(elementContainer: HTMLElement): void;
    private _measuredSize;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    static textProperty: DependencyProperty;
    text: string;
    static whiteSpaceProperty: DependencyProperty;
    whiteSpace: string;
    static formatProperty: DependencyProperty;
    format: string;
}
