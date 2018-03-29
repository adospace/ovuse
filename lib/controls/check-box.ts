import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions } from '.'
import { TypeId, DependencyProperty, DependencyObject } from '../.'

@TypeId("ovuse.controls.CheckBox")
export class CheckBox extends FrameworkElement {

    private _pElementInput: HTMLInputElement | null = null;

    attachVisualOverride(elementContainer: HTMLElement) {

        this._visual = this._pElementInput = document.createElement("input");

        this._pElementInput.type = this.type;
        this._pElementInput.checked = this.isChecked;
        this._pElementInput.onclick = (ev) => this.onCheckChanged();

        super.attachVisualOverride(elementContainer);
    }

    onCheckChanged() {
        if (this._pElementInput != null)
            this.isChecked = this._pElementInput.checked;
    }

    private _measuredSize: Size | null = null;

    protected measureOverride(constraint: Size): Size {
        var pElement = this._pElementInput;
        if (this._measuredSize == null &&
            pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new Size(pElement.offsetWidth, pElement.offsetHeight);
        }

        if (this._measuredSize != null)
            return new Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));

        return constraint;
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        if (property == CheckBox.nameProperty) {
            var pElement = this._pElementInput;
            if (pElement != null) {
                pElement.name = <string>value;
                this._measuredSize = null;
            }
        }
        else if (property == CheckBox.typeProperty) {
            var pElement = this._pElementInput;
            if (pElement != null) {
                pElement.type = <string>value;
                this._measuredSize = null;
            }
        }
        else if (property == CheckBox.isCheckedProperty) {
            var pElement = this._pElementInput;
            if (pElement != null) {
                pElement.checked = <boolean>value;
            }
        }


        super.onDependencyPropertyChanged(property, value, oldValue);
    }

    static isCheckedProperty = DependencyObject.registerProperty(
        CheckBox, "IsChecked", false, FrameworkPropertyMetadataOptions.None);
    get isChecked(): boolean {
        return <boolean>this.getValue(CheckBox.isCheckedProperty);
    }
    set isChecked(value: boolean) {
        this.setValue(CheckBox.isCheckedProperty, value);
    }

    static nameProperty = DependencyObject.registerProperty(
        CheckBox, "Name", "", FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get name(): string {
        return <string>this.getValue(CheckBox.nameProperty);
    }
    set placeholder(value: string) {
        this.setValue(CheckBox.nameProperty, value);
    }

    static typeProperty = DependencyObject.registerProperty(
        CheckBox, "Type", "checkbox", FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get type(): string {
        return <string>this.getValue(CheckBox.typeProperty);
    }
    set type(value: string) {
        this.setValue(CheckBox.typeProperty, value);
    }

}