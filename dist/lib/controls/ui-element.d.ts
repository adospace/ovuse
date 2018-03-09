import { DependencyObject, DependencyProperty, Command, EventAction } from '../.';
import { ISupportCommandCanExecuteChanged } from '../contracts';
import { Size, Rect, Vector, ExtendedProperty } from '.';
export declare class UIElement extends DependencyObject implements ISupportCommandCanExecuteChanged {
    static typeName: string;
    readonly typeName: string;
    desiredSize: Size | null;
    renderSize: Size | null;
    private previousAvailableSize;
    measure(availableSize: Size): void;
    protected measureCore(availableSize: Size): Size;
    private finalRect;
    private previousFinalRect;
    arrange(finalRect: Rect): void;
    protected arrangeCore(finalRect: Rect): void;
    protected relativeOffset: Vector | null;
    layout(relativeOffset?: Vector | null): void;
    protected layoutOverride(): void;
    protected animateSize(desiredSize: Size): Size;
    protected _visual: HTMLElement | null;
    attachVisual(elementContainer: HTMLElement | null, showImmediately?: boolean): HTMLElement | null;
    readonly visual: HTMLElement | null;
    protected attachVisualOverride(elementContainer: HTMLElement | null): void;
    protected onMouseDown(ev: MouseEvent): void;
    protected onMouseUp(ev: MouseEvent): void;
    getBoundingClientRect(): ClientRect;
    protected visualConnected(elementContainer: HTMLElement): void;
    protected parentVisualConnected(parent: UIElement, elementContainer: HTMLElement): void;
    protected visualDisconnected(elementContainer: HTMLElement): void;
    protected parentVisualDisconnected(parent: UIElement, elementContainer: HTMLElement): void;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    onCommandCanExecuteChanged(command: Command): void;
    getValue(property: DependencyProperty): any;
    private measureDirty;
    invalidateMeasure(): void;
    private arrangeDirty;
    invalidateArrange(): void;
    private layoutInvalid;
    invalidateLayout(): void;
    private _logicalChildren;
    findElementByName(name: string): UIElement | null;
    private _parent;
    parent: UIElement | null;
    private notifyInheritsPropertiesChange();
    private onParentDependencyPropertyChanged(property);
    protected onParentChanged(oldParent: DependencyObject | null, newParent: DependencyObject | null): void;
    protected _extendedProperties: ExtendedProperty[];
    addExtentedProperty(name: string, value: string): void;
    static isVisibleProperty: DependencyProperty;
    isVisible: boolean;
    static classProperty: DependencyProperty;
    cssClass: string;
    static idProperty: DependencyProperty;
    id: string;
    static commandProperty: DependencyProperty;
    command: Command;
    static commandParameterProperty: DependencyProperty;
    commandParameter: any;
    static popupProperty: DependencyProperty;
    popup: any;
    static autoClosePopupProperty: DependencyProperty;
    autoClosePopup: boolean;
    static layoutUpdatedProperty: DependencyProperty;
    layoutUpdated: EventAction;
}