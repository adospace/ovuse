import { FrameworkElement, UIElement, Size } from '.';
export declare class UserControl extends FrameworkElement {
    static typeName: string;
    readonly typeName: string;
    private _content;
    protected initializeComponent(): UIElement | null;
    private tryLoadChildFromServer();
    protected _container: HTMLElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    private setupChild(content);
    invalidateMeasure(): void;
    invalidateArrange(): void;
    invalidateLayout(): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected layoutOverride(): void;
}
