import { UIElement, FrameworkElement, Size, SizeToContent, NavigationContext } from '.';
import { DependencyProperty } from '..';
export declare class Page extends FrameworkElement {
    private tryLoadChildFromServer();
    protected _container: HTMLElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected layoutOverride(): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    static childProperty: DependencyProperty;
    child: UIElement;
    static sizeToContentProperty: DependencyProperty;
    sizeToContent: SizeToContent;
    cachePage: boolean;
    onNavigate(context: NavigationContext): void;
}
