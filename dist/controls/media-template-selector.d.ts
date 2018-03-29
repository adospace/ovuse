import { FrameworkElement, Size, DataTemplate } from '.';
import { ObservableCollection } from '../.';
export declare class MediaTemplateSelector extends FrameworkElement {
    protected _container: HTMLElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    private _element;
    private setupItem();
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    protected layoutOverride(): void;
    private _templates;
    templates: ObservableCollection<DataTemplate>;
}
