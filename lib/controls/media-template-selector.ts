import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, XamlReader, TextBlock, DataTemplate } from '.'
import { TypeId, DependencyProperty, DependencyObject, ObservableCollection } from '../.'
import { ISupportCollectionChanged } from '../contracts'

@TypeId("ovuse.controls.MediaTemplateSelector")
export class MediaTemplateSelector extends FrameworkElement {

    protected _container: HTMLElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {

        this._container = elementContainer;

        this.setupItem();

        super.attachVisualOverride(elementContainer);
    }

    private _element: UIElement | null = null;

    private setupItem() {
        if (this._container == null)
            return;

        if (this._element != null) {
            this._element.attachVisual(null);
            this._element.parent = null;
        }

        if (this._templates == null ||
            this._templates.count == 0)
            return;

        var templateForItem = DataTemplate.getTemplateForMedia(this._templates.toArray());
        if (templateForItem == null) {
            throw new Error("Unable to find a valid template for this media");
        }

        this._element = templateForItem.createElement();

        if (this._element != null) {
            this._element.attachVisual(this._container);
            this._element.parent = this;
        }

        this.invalidateMeasure();
    }

    protected measureOverride(constraint: Size): Size {

        var child = this._element;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }

        return new Size();
    }

    protected arrangeOverride(finalSize: Size): Size {
        var child = this._element;
        if (child != null)
            child.arrange(finalSize.toRect());

        return finalSize;
    }

    protected layoutOverride() {
        super.layoutOverride();
        var child = this._element;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);

            child.layout(childOffset);
        }
    }

    //Templates collection
    private _templates: ObservableCollection<DataTemplate> = new ObservableCollection<DataTemplate>();
    get templates(): ObservableCollection<DataTemplate> {
        return this._templates;
    }
    set templates(value: ObservableCollection<DataTemplate>) {
        this._templates = value;
    }

}