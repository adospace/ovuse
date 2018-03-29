import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, XamlReader } from '.'
import { TypeId, DependencyProperty, DependencyObject, ObservableCollection } from '../.'
import { ISupportCollectionChanged } from '../contracts'

@TypeId("ovuse.controls.ControlTemplate")
export class ControlTemplate extends FrameworkElement {

    protected _container: HTMLElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {

        this._container = elementContainer;

        var child = this.content;
        if (child != null) {
            child.parent = this;
            child.attachVisual(this._container);
        }

        super.attachVisualOverride(elementContainer);
    }

    protected measureOverride(constraint: Size): Size {

        var child = this.content;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }

        return new Size();
    }

    protected arrangeOverride(finalSize: Size): Size {
        var child = this.content;
        if (child != null) 
            child.arrange(finalSize.toRect());

        return finalSize;
    }

    protected layoutOverride() {
        super.layoutOverride();
        var child = this.content;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);

            child.layout(childOffset);
        }
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        if (property == ControlTemplate.contentProperty) {
            var oldChild = <UIElement>oldValue;
            if (oldChild != null && oldChild.parent == this) {
                oldChild.attachVisual(null);
                oldChild.parent = null;
            }

            var newChild = <UIElement>value;
            if (newChild != null) {
                //NOTE: change parent AFTER attachVisual because changing parent will raise
                //notifications to binding to DataContext
                if (this._container != null)
                    newChild.attachVisual(this._container);
                newChild.parent = this;
            }
        }


        super.onDependencyPropertyChanged(property, value, oldValue);
    }

    static contentProperty = DependencyObject.registerProperty(
        ControlTemplate, "Content", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get content(): UIElement {
        return <UIElement>this.getValue(ControlTemplate.contentProperty);
    }
    set content(value: UIElement) {
        this.setValue(ControlTemplate.contentProperty, value);
    }

}