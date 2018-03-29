import { UIElement, FrameworkElement, Size, DataTemplate, Panel } from '.';
import { DependencyProperty, ObservableCollection } from '..';
import { ISupportCollectionChanged } from '../contracts';
export declare class ItemsControl extends FrameworkElement implements ISupportCollectionChanged {
    static typeName: string;
    readonly typeName: string;
    private static initProperties();
    private static _init;
    protected _elements: Array<UIElement> | null;
    protected _divElement: HTMLDivElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected layoutOverride(): void;
    private _templates;
    templates: ObservableCollection<DataTemplate>;
    onCollectionChanged(collection: any, added: Object[], removed: Object[], startRemoveIndex: number): void;
    static itemsSourceProperty: DependencyProperty;
    itemsSource: any;
    static itemsPanelProperty: DependencyProperty;
    itemsPanel: Panel;
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    private setupItems();
}
