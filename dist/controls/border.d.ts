import { FrameworkElement, UIElement, Size, Thickness } from '.';
import { DependencyProperty } from '../.';
export declare class Border extends FrameworkElement {
    private _child;
    child: UIElement | null;
    protected _divElement: HTMLDivElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected layoutOverride(): void;
    updateVisualProperties(): void;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    static borderThicknessProperty: DependencyProperty;
    borderThickness: Thickness;
    static paddingProperty: DependencyProperty;
    padding: Thickness;
    static backgroundProperty: DependencyProperty;
    background: string;
    static borderBrushProperty: DependencyProperty;
    borderBrush: string;
    static borderStyleProperty: DependencyProperty;
    borderStyle: string;
}
