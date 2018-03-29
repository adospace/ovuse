import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions } from '.'
import { TypeId, DependencyProperty, DependencyObject, Command } from '../.'

@TypeId("ovuse.controls.Button")
export class Button extends FrameworkElement {

    private _child: UIElement | null = null;
    get child(): UIElement | null {
        return this._child;
    }
    set child(value: UIElement | null) {
        if (this._child != value) {
            if (this._child != null && this._child.parent == this)
                this._child.parent = null;
            this._child = value;
            if (this._child != null) {
                this._child.parent = this;
                if (this._buttonElement != null)
                    this._child.attachVisual(this._buttonElement);
            }
            this.invalidateMeasure();
        }
    }

    protected _buttonElement: HTMLButtonElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {

        this._visual = this._buttonElement = document.createElement("button");
        this._visual.style.msUserSelect =
            this._visual.style.webkitUserSelect = "none";

        if (this._child != null) {
            this._child.attachVisual(this._buttonElement);
        }

        //this._buttonElement.onclick = (ev) => this.onClick(ev);
        this._buttonElement.disabled = !this.isEnabled;

        super.attachVisualOverride(elementContainer);
    }

    protected measureOverride(constraint: Size): Size {
        this.isEnabled = this.popup != null || (this.command != null && this.command.canExecute(this.commandParameter));

        var mySize = new Size();

        // Compute the chrome size added by padding
        var padding = new Size(this.padding.left + this.padding.right, this.padding.top + this.padding.bottom);

        //If we have a child
        if (this._child != null) {

            // Remove size of padding only from child's reference size.
            var childConstraint = new Size(Math.max(0.0, constraint.width - padding.width),
                Math.max(0.0, constraint.height - padding.height));


            this._child.measure(childConstraint);
            var childSize = this._child.desiredSize;
            if (childSize != null){
                // Now use the returned size to drive our size, by adding back the margins, etc.
                mySize.width = childSize.width + padding.width;
                mySize.height = childSize.height + padding.height;
            }
        }
        else if (this.text != null)
        {
            var text = this.text;
            var mySize = new Size();
            var pElement = this._buttonElement;
            if (pElement != null) {
                var txtChanged = (pElement.innerText !== text);

                if (isFinite(constraint.width))
                    pElement.style.maxWidth = constraint.width + "px";
                if (isFinite(constraint.height))
                    pElement.style.maxHeight = constraint.height + "px";

                pElement.style.width = "auto";
                pElement.style.height = "auto";
                pElement.style.whiteSpace = this.whiteSpace;
    
                if (txtChanged) {
                    pElement.innerHTML = this.text;
                }
                mySize = new Size(pElement.offsetWidth, pElement.offsetHeight);

                if (this.renderSize != null) {
                    pElement.style.width = this.renderSize.width.toString() + "px";
                    pElement.style.height = this.renderSize.height.toString() + "px";
                }
            }

            return mySize;
        }
        else {
            // Combine into total decorating size
            mySize = new Size(padding.width, padding.height);
        }


        return mySize;
    }

    protected arrangeOverride(finalSize: Size): Size {
        //  arrange child
        var child = this._child;
        var padding = this.padding;
        if (child != null) {
            var childRect = new Rect(padding.left,
                padding.top,
                Math.max(0.0, finalSize.width - padding.left - padding.right),
                Math.max(0.0, finalSize.height - padding.top - padding.bottom));

            child.arrange(childRect);
        }

        return finalSize;
    }

    protected layoutOverride() {
        super.layoutOverride();
        if (this._child != null)
            this._child.layout();
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        if (property == Button.commandProperty) {
            if (oldValue != null)
                (<Command>oldValue).offCanExecuteChangeNotify(this);
            if (value != null)
                (<Command>value).onCanExecuteChangeNotify(this);
        }
        else if (property == Button.isEnabledProperty) {
            if (this._buttonElement != null)
                this._buttonElement.disabled = !<boolean>value;
        }

        super.onDependencyPropertyChanged(property, value, oldValue);
    }

    onCommandCanExecuteChanged(command: Command) {
        this.isEnabled = this.popup != null || (this.command != null && this.command.canExecute(this.commandParameter));
    }

    //Dependency properties

    static paddingProperty = DependencyObject.registerProperty(
        Button, "Padding", new Thickness(), FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get padding(): Thickness {
        return <Thickness>this.getValue(Button.paddingProperty);
    }
    set padding(value: Thickness) {
        this.setValue(Button.paddingProperty, value);
    }


    static textProperty = DependencyObject.registerProperty(
        Button, "Text", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get text(): string {
        return <string>this.getValue(Button.textProperty);
    }
    set text(value: string) {
        this.setValue(Button.textProperty, value);
    }

    static whiteSpaceProperty = DependencyObject.registerProperty(
        Button, "WhiteSpace", "pre", FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get whiteSpace(): string {
        return <string>this.getValue(Button.whiteSpaceProperty);
    }
    set whiteSpace(value: string) {
        this.setValue(Button.whiteSpaceProperty, value);
    }

    static isEnabledProperty = DependencyObject.registerProperty(
        Button, "IsEnabled", true, FrameworkPropertyMetadataOptions.AffectsRender);
    get isEnabled(): boolean {
        return <boolean>this.getValue(Button.isEnabledProperty);
    }
    set isEnabled(value: boolean) {
        this.setValue(Button.isEnabledProperty, value);
    }

}