import { FrameworkElement, Size } from '.';
import { DependencyProperty } from '../.';
import { ISupportCollectionChanged } from '../contracts';
export declare class ComboBox extends FrameworkElement implements ISupportCollectionChanged {
    private _selectElement;
    private _elements;
    attachVisualOverride(elementContainer: HTMLElement): void;
    onSelectionChanged(): void;
    protected arrangeOverride(finalSize: Size): Size;
    private selectItem(item);
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any): void;
    private setupItems();
    onCollectionChanged(collection: any, added: Object[], removed: Object[], startRemoveIndex: number): void;
    static itemsSourceProperty: DependencyProperty;
    itemsSource: any;
    static selectedItemProperty: DependencyProperty;
    selectedItem: any;
    static displayMemberProperty: DependencyProperty;
    displayMember: string;
    static selectedValueProperty: DependencyProperty;
    selectedValue: any;
    static selectMemberProperty: DependencyProperty;
    selectMember: string;
}
