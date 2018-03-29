import { FrameworkElement, UIElement, Size } from '.';
import { DependencyProperty } from '../.';
export declare class NativeElement extends FrameworkElement {
    elementType: string;
    constructor(elementType: string);
    private _child;
    child: UIElement | null;
    invalidateMeasure(): void;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    private _measuredSize;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    static textProperty: DependencyProperty;
    text: string;
    static arrangeChildProperty: DependencyProperty;
    arrangeChild: boolean;
}
export declare class div extends NativeElement {
    constructor();
}
export declare class a extends NativeElement {
    constructor();
}
export declare class img extends NativeElement {
    constructor();
}
export declare class i extends NativeElement {
    constructor();
}
export declare class ul extends NativeElement {
    constructor();
}
export declare class li extends NativeElement {
    constructor();
}
export declare class nav extends NativeElement {
    constructor();
}
export declare class span extends NativeElement {
    constructor();
}
export declare class h1 extends NativeElement {
    static typeName: string;
    readonly typeName: string;
    constructor();
}
export declare class h2 extends NativeElement {
    static typeName: string;
    readonly typeName: string;
    constructor();
}
export declare class h3 extends NativeElement {
    static typeName: string;
    readonly typeName: string;
    constructor();
}
export declare class h4 extends NativeElement {
    static typeName: string;
    readonly typeName: string;
    constructor();
}
export declare class h5 extends NativeElement {
    static typeName: string;
    readonly typeName: string;
    constructor();
}
