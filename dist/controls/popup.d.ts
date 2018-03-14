import { FrameworkElement, UIElement, Size, SizeToContent, PopupPosition } from '.';
import { DependencyProperty } from '..';
export declare class Popup extends FrameworkElement {
    static typeName: string;
    readonly typeName: string;
    private static initProperties();
    private static _init;
    constructor();
    private tryLoadChildFromServer();
    private _popupContainer;
    private _child;
    child: UIElement | null;
    onShow(): void;
    private setupChild();
    onClose(): void;
    protected initializeComponent(): UIElement | null;
    protected layoutOverride(): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    static sizeToContentProperty: DependencyProperty;
    sizeToContent: SizeToContent;
    static positionProperty: DependencyProperty;
    position: PopupPosition;
}
