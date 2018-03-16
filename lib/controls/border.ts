import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions } from '.'
import { DependencyObjectId, DependencyProperty, DependencyObject } from '../.'

@DependencyObjectId("ovuse.Border")
export class Border extends FrameworkElement {
    // static typeName: string = "layouts.controls.Border";
    // get typeName(): string {
    //     return Border.typeName;
    // }

    private _child: UIElement | null = null;
    get child(): UIElement | null{
        return this._child;
    }
    set child(value: UIElement | null) {
        if (this._child != value) {
            if (this._child != null && this._child.parent == this) {
                this._child.parent = null;
                this._child.attachVisual(null);
            }
            this._child = value;
            if (this._child != null) {
                this._child.parent = this;
                if (this._divElement != null)
                    this._child.attachVisual(this._divElement);
            }
            this.invalidateMeasure();
        }
    }

    protected _divElement: HTMLDivElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {

        this._visual = this._divElement = document.createElement("div");
        this.updateVisualProperties();

        if (this._child != null) {
            this._child.attachVisual(this._divElement);
        }

        super.attachVisualOverride(elementContainer);
    }

    protected measureOverride(constraint: Size) : Size {
        var mySize = new Size();

        // Compute the chrome size added by the various elements
        var borderThickness = this.borderThickness;
        if (borderThickness == null)
            borderThickness = new Thickness();

        var border = new Size(borderThickness.left + borderThickness.right, borderThickness.top + borderThickness.bottom);
        var padding = new Size(this.padding.left + this.padding.right, this.padding.top + this.padding.bottom);

        //If we have a child
        if (this._child != null) {
            // Combine into total decorating size
            var combined = new Size(border.width + padding.width, border.height + padding.height);

            // Remove size of border only from child's reference size.
            var childConstraint = new Size(Math.max(0.0, constraint.width - combined.width),
                Math.max(0.0, constraint.height - combined.height));


            this._child.measure(childConstraint);
            var childSize = this._child.desiredSize;

            if (childSize != null) {
                // Now use the returned size to drive our size, by adding back the margins, etc.
                mySize.width = childSize.width + combined.width;
                mySize.height = childSize.height + combined.height;
            }
        }
        else {
            // Combine into total decorating size
            mySize = new Size(border.width + padding.width, border.height + padding.height);
        }

        return mySize;
    }    

    protected arrangeOverride(finalSize: Size): Size {
        var borderThickness = this.borderThickness;
        if (borderThickness == null)
            borderThickness = new Thickness();
        var boundRect = new Rect(0,0,finalSize.width, finalSize.height);
        var innerRect = new Rect(boundRect.x + borderThickness.left,
            boundRect.y + borderThickness.top,
            Math.max(0.0, boundRect.width - borderThickness.left - borderThickness.right),
            Math.max(0.0, boundRect.height - borderThickness.top - borderThickness.bottom));

        //  arrange child
        var child = this._child;
        var padding = this.padding;
        if (child != null) {
            var childRect = new Rect(innerRect.x + padding.left,
                innerRect.y + padding.top,
                Math.max(0.0, innerRect.width - padding.left - padding.right),
                Math.max(0.0, innerRect.height - padding.top - padding.bottom));

            child.arrange(childRect);
        }

        return finalSize;
    }   

    protected layoutOverride() {
        super.layoutOverride();
        var borderThickness = this.borderThickness;
        if (borderThickness == null)
            borderThickness = new Thickness();
        if (this._visual != null && this.renderSize != null) { //renderSize == null if it's hidden
            this._visual.style.width = (this.renderSize.width - (borderThickness.left + borderThickness.right)).toString() + "px";
            this._visual.style.height = (this.renderSize.height - (borderThickness.top + borderThickness.bottom)).toString() + "px";
        }

        if (this._child != null)
            this._child.layout();
    }

    updateVisualProperties() {
        if (this._visual == null)
            return;
        this._visual.style.background = this.background;
        if (this.borderBrush != null)
            this._visual.style.borderColor = this.borderBrush;
        if (this.borderStyle != null)
            this._visual.style.borderStyle = this.borderStyle;
        var borderThickness = this.borderThickness;
        if (borderThickness != null) {
            if (borderThickness.isSameWidth)
                this._visual.style.borderWidth = borderThickness.left.toString() + "px";
            else {
                this._visual.style.borderLeft = borderThickness.left.toString() + "px";
                this._visual.style.borderTop = borderThickness.top.toString() + "px";
                this._visual.style.borderRight = borderThickness.right.toString() + "px";
                this._visual.style.borderBottom = borderThickness.bottom.toString() + "px";
            }
        }
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {

        if (property == Border.borderThicknessProperty ||
            property == Border.backgroundProperty ||
            property == Border.borderBrushProperty)
            this.updateVisualProperties();

        super.onDependencyPropertyChanged(property, value, oldValue);
    }

    static borderThicknessProperty = DependencyObject.registerProperty(Border, "BorderThickness", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => Thickness.fromString(v));
    get borderThickness(): Thickness {
        return <Thickness>this.getValue(Border.borderThicknessProperty);
    }
    set borderThickness(value: Thickness) {
        this.setValue(Border.borderThicknessProperty, value);
    }

    static paddingProperty = DependencyObject.registerProperty(Border, "Padding", new Thickness(), FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => Thickness.fromString(v));
    get padding(): Thickness {
        return <Thickness>this.getValue(Border.paddingProperty);
    }
    set padding(value: Thickness) {
        this.setValue(Border.paddingProperty, value);
    }

    static backgroundProperty = DependencyObject.registerProperty(Border, "Background", null, FrameworkPropertyMetadataOptions.AffectsRender);
    get background(): string {
        return <string>this.getValue(Border.backgroundProperty);
    }
    set background(value: string) {
        this.setValue(Border.backgroundProperty, value);
    }

    static borderBrushProperty = DependencyObject.registerProperty(Border, "BorderBrush", null, FrameworkPropertyMetadataOptions.AffectsRender);
    get borderBrush(): string {
        return <string>this.getValue(Border.borderBrushProperty);
    }
    set borderBrush(value: string) {
        this.setValue(Border.borderBrushProperty, value);
    }

    static borderStyleProperty = DependencyObject.registerProperty(Border, "BorderStyle", null, FrameworkPropertyMetadataOptions.AffectsRender);
    get borderStyle(): string {
        return <string>this.getValue(Border.borderStyleProperty);
    }
    set borderStyle(value: string) {
        this.setValue(Border.borderStyleProperty, value);
    }
}