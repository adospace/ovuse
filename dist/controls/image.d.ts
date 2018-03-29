import { FrameworkElement, Size } from '.';
import { DependencyProperty } from '..';
export declare enum Stretch {
    None = 0,
    Fill = 1,
    Uniform = 2,
    UniformToFill = 3,
}
export declare enum StretchDirection {
    UpOnly = 0,
    DownOnly = 1,
    Both = 2,
}
export declare class Image extends FrameworkElement {
    private _imgElement;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    static computeScaleFactor(availableSize: Size, contentSize: Size, stretch: Stretch, stretchDirection: StretchDirection): Size;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    static srcProperty: DependencyProperty;
    source: string;
    static stretchProperty: DependencyProperty;
    stretch: Stretch;
    static stretchDirectionProperty: DependencyProperty;
    stretchDirection: StretchDirection;
}
