import { FrameworkElement, Size, XamlReader } from '.';
import { DependencyProperty } from '../.';
export declare class ContentTemplate extends FrameworkElement {
    private _innerXaml;
    setInnerXaml(value: string): void;
    private _xamlLoader;
    setXamlLoader(loader: XamlReader): void;
    protected _container: HTMLElement | null;
    private _child;
    private setupChild();
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected layoutOverride(): void;
    static contentProperty: DependencyProperty;
    content: any;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
}
