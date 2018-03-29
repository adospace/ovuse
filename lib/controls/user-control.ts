import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, XamlReader, TextBlock, DataTemplate } from '.'
import { TypeId, DependencyProperty, DependencyObject, ObservableCollection, getTypeId, getObjectTypeId } from '../.'
import { ISupportCollectionChanged } from '../contracts'

@TypeId("ovuse.controls.UserControl")
export class UserControl extends FrameworkElement {
    private _content: UIElement | null = null;
    protected initializeComponent(): UIElement | null {
        return null;
    }

    private tryLoadChildFromServer() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = (ev) => {
            if (req.readyState == 4 && req.status == 200) {
                let loader = new XamlReader();
                this.setupChild(loader.Parse(req.responseText));
            }
        }
        //req.open("GET", "data/records.txt", true);
        //app.views.CustomView
        req.open("GET", getObjectTypeId(this).replace(/\./gi, '/') + ".xml", true);
        req.send();
    }

    protected _container: HTMLElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {

        this._container = elementContainer;

        this.setupChild(this.initializeComponent());

        super.attachVisualOverride(elementContainer);
    }

    private setupChild(content: UIElement | null) {
        var child = this._content;
        if (child == null) {
            this._content = child = content;

            if (child != null)
                child.parent = this;
        }

        child = this._content;
        if (child != null) {
            child.attachVisual(this._container);
        }
        else {
            this.tryLoadChildFromServer();
        }
    }

    invalidateMeasure(): void {
        super.invalidateMeasure();
        var child = this._content;
        if (child != null) {
            child.invalidateMeasure();
        }
    }

    invalidateArrange(): void {
        super.invalidateArrange();
        var child = this._content;
        if (child != null) {
            child.invalidateArrange();
        }
    }

    invalidateLayout(): void {
        super.invalidateLayout();
        var child = this._content;
        if (child != null) {
            child.invalidateLayout();
        }
    }

    protected measureOverride(constraint: Size): Size {

        var child = this._content;
        if (child != null &&
            child.desiredSize != null) {
            child.measure(constraint);
            return child.desiredSize;
        }

        return new Size();
    }

    protected arrangeOverride(finalSize: Size): Size {
        var child = this._content;
        if (child != null) {
            child.arrange(finalSize.toRect());
        }

        this.invalidateLayout();

        return finalSize;
    }

    protected layoutOverride() {
        super.layoutOverride();
        var child = this._content;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);

            child.layout(childOffset);
        }
        
    }
}