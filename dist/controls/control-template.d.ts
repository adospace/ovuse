import { FrameworkElement, UIElement, Size } from '.';
import { DependencyProperty } from '../.';
export declare class ControlTemplate extends FrameworkElement {
    protected _container: HTMLElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected layoutOverride(): void;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    static contentProperty: DependencyProperty;
    content: UIElement;
}
