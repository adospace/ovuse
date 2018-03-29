import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, XamlReader, TextBlock } from '.'
import { TypeId, DependencyProperty, DependencyObject, ObservableCollection } from '../.'
import { ISupportCollectionChanged } from '../contracts'

@TypeId("ovuse.controls.Label")
export class Label extends TextBlock {
    static typeName: string = "layouts.controls.Label";
    get typeName(): string {
        return Label.typeName;
    }

    private _label: HTMLLabelElement | null = null;

    protected createElement(elementContainer: HTMLElement): HTMLElement {
        this._label = document.createElement("label");
        this._label.htmlFor = this.htmlFor;
        return this._label;
    }


    static htmlForProperty = DependencyObject.registerProperty(
        Label, "For", null, FrameworkPropertyMetadataOptions.None, (v) => String(v));
    get htmlFor(): string {
        return <string>this.getValue(Label.htmlForProperty);
    }
    set htmlFor(value: string) {
        this.setValue(Label.htmlForProperty, value);
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        if (property == Label.htmlForProperty) {
            if (this._label != null)
                this._label.htmlFor = this.htmlFor;
        }

        super.onDependencyPropertyChanged(property, value, oldValue);
    }
}