import { FrameworkElement, UIElement, Size, Thickness } from '.';
import { DependencyProperty, Command } from '../.';
export declare class Button extends FrameworkElement {
    private _child;
    child: UIElement | null;
    protected _buttonElement: HTMLButtonElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected layoutOverride(): void;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    onCommandCanExecuteChanged(command: Command): void;
    static paddingProperty: DependencyProperty;
    padding: Thickness;
    static textProperty: DependencyProperty;
    text: string;
    static whiteSpaceProperty: DependencyProperty;
    whiteSpace: string;
    static isEnabledProperty: DependencyProperty;
    isEnabled: boolean;
}
