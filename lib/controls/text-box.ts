import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, XamlReader } from '.'
import { TypeId, DependencyProperty, DependencyObject, ObservableCollection } from '../.'
import { ISupportCollectionChanged } from '../contracts'

@TypeId("ovuse.controls.TextBox")
export class TextBox extends FrameworkElement {

    private _pElement: HTMLInputElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {

        this._visual = this._pElement = document.createElement("input");

        this._pElement.value = this.text;
        this._pElement.type = this.type;
        this._pElement.readOnly = this.isReadonly;
        this._pElement.placeholder = this.placeholder;
        this._pElement.oninput = (ev) => this.onTextChanged();
        this._pElement.onchange = (ev) => this.onTextChanged();
        this._pElement.onkeypress = (ev) => this.onTextChanged();
        this._pElement.onpaste = (ev) => this.onTextChanged();
        super.attachVisualOverride(elementContainer);
    }

    onTextChanged() {
        if (this._pElement != null)
            this.text = this._pElement.value;
    }

    private _measuredSize: Size | null = null;

    protected measureOverride(constraint: Size): Size {
        var pElement = this._pElement;
        if (this._measuredSize == null && pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new Size(pElement.offsetWidth, pElement.offsetHeight);
        }
        if (this._measuredSize != null)
            return new Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));

        return  constraint;
    }

    protected layoutOverride() {
        super.layoutOverride();

        //layoutOverride above set style.width and styl.height
        //at that point browser compute new offsetWidth and offetHeight
        //we need to reset style.width/height so that textbox don't exceed space
        //that out parent has reserved for this control
        var pElement = this._pElement;
        if (this.renderSize != null && pElement != null) {
            pElement.style.width = (this.renderSize.width - (pElement.offsetWidth - this.renderSize.width) ) + "px";
            pElement.style.height = (this.renderSize.height - (pElement.offsetHeight - this.renderSize.height) ) + "px";
        }
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        if (property == TextBox.textProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.value = <string>value;
            }
        }
        else if (property == TextBox.placeholderProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.placeholder = <string>value;
            }
        }
        else if (property == TextBox.typeProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.type = <string>value;
            }
        }
        else if (property == TextBox.isReadonlyProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.readOnly = <boolean>value;
            }
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }

    static textProperty = DependencyObject.registerProperty(
        TextBox, "Text", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get text(): string {
        return <string>this.getValue(TextBox.textProperty);
    }
    set text(value: string) {
        this.setValue(TextBox.textProperty, value);
    }

    static placeholderProperty = DependencyObject.registerProperty(
        TextBox, "Placeholder", "", FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get placeholder(): string {
        return <string>this.getValue(TextBox.placeholderProperty);
    }
    set placeholder(value: string) {
        this.setValue(TextBox.placeholderProperty, value);
    }

    static typeProperty = DependencyObject.registerProperty(
        TextBox, "Type", "text", FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get type(): string {
        return <string>this.getValue(TextBox.typeProperty);
    }
    set type(value: string) {
        this.setValue(TextBox.typeProperty, value);
    }

    static isReadonlyProperty = DependencyObject.registerProperty(
        TextBox, "IsReadonly", false);
    get isReadonly(): boolean {
        return <boolean>this.getValue(TextBox.isReadonlyProperty);
    }
    set isReadonly(value: boolean) {
        this.setValue(TextBox.isReadonlyProperty, value);
    }

}