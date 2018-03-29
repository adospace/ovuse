import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, XamlReader } from '.'
import { TypeId, DependencyProperty, DependencyObject, ObservableCollection } from '../.'
import { ISupportCollectionChanged } from '../contracts'

@TypeId("ovuse.controls.Frame")
export class Frame extends FrameworkElement {

    _frameElement: HTMLFrameElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {
        this._visual = this._frameElement = document.createElement("frame");
        super.attachVisualOverride(elementContainer);
    }

    protected measureOverride(constraint: Size): Size {
        var src = this.Source;
        var mySize = new Size();
        var pElement = this._frameElement;
        if (pElement != null) {
            var srcChanged = (pElement.src != src);

            if (isFinite(constraint.width))
                pElement.style.maxWidth = constraint.width + "px";
            if (isFinite(constraint.height))
                pElement.style.maxHeight = constraint.height + "px";
            pElement.style.width = "auto";
            pElement.style.height = "auto";
            if (srcChanged) {
                pElement.src = src;
            }
            mySize = new Size(pElement.clientWidth, pElement.clientHeight);

            if (srcChanged && this.renderSize != null) {
                pElement.style.width = this.renderSize.width.toString() + "px";
                pElement.style.height = this.renderSize.height.toString() + "px";
            }
        }

        return mySize;
    }

    static sourceProperty = DependencyObject.registerProperty(
        Frame, "Source", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get Source(): string {
        return <string>this.getValue(Frame.sourceProperty);
    }
    set Source(value: string) {
        this.setValue(Frame.sourceProperty, value);
    }

}