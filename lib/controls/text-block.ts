import { FrameworkElement, FrameworkPropertyMetadataOptions, Size } from '.'
import { DependencyObjectId } from '..';
import { DependencyObject, DependencyProperty } from '../.'

@DependencyObjectId("ovuse.controls.TextBlock")
export class TextBlock extends FrameworkElement {
    // static typeName: string = "layouts.controls.TextBlock";
    // get typeName(): string {
    //     return TextBlock.typeName;
    // }


    private _pElement: HTMLElement | null = null;

    protected createElement(elementContainer: HTMLElement): HTMLElement {
        return document.createElement("p");
    }

    attachVisualOverride(elementContainer: HTMLElement) {

        this._visual = this._pElement = this.createElement(elementContainer);
        this._visual.style.msUserSelect =
            this._visual.style.webkitUserSelect = "none";
        this._pElement.style.whiteSpace = this.whiteSpace;
        var text = this.text;
        var format = this.format;
        text = format != null && text != null && text != "" ? format.format(text) : text;
        this._pElement.innerHTML = text == null ? "" : text;

        super.attachVisualOverride(elementContainer);
    }

    private _measuredSize: Size | null = null;
    protected measureOverride(constraint: Size): Size {
        var pElement = this._pElement;
        if (this._measuredSize == null && pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new Size(pElement.clientWidth, pElement.clientHeight);
        }
        if (this._measuredSize != null)
            return new Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));
        
        return new Size();
    }

    protected arrangeOverride(finalSize: Size): Size {

        var pElement = this._pElement;
        if (pElement != null){
            pElement.style.width = finalSize.width.toString() + "px";
            pElement.style.height = finalSize.height.toString() + "px";
        }

        return finalSize;
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        if (property == TextBlock.textProperty ||
            property == TextBlock.formatProperty) {
            var pElement = this._pElement;
            var text = <string>value;
            var format = this.format;
            text = format != null && text != null && text != "" ? format.format(text) : text;
            if (pElement != null) {
                pElement.innerHTML = text == null ? "" : text;
                this._measuredSize = null;
            }
        }
        else if (property == TextBlock.whiteSpaceProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.style.whiteSpace = <string>value;
                this._measuredSize = null;
            }
        }

        super.onDependencyPropertyChanged(property, value, oldValue);
    }


    static textProperty = DependencyObject.registerProperty(TextBlock, "Text", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => String(v));
    get text(): string {
        return <string>this.getValue(TextBlock.textProperty);
    }
    set text(value: string) {
        this.setValue(TextBlock.textProperty, value);
    }

    static whiteSpaceProperty = DependencyObject.registerProperty(TextBlock, "WhiteSpace", "pre", FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get whiteSpace(): string {
        return <string>this.getValue(TextBlock.whiteSpaceProperty);
    }
    set whiteSpace(value: string) {
        this.setValue(TextBlock.whiteSpaceProperty, value);
    }

    static formatProperty = DependencyObject.registerProperty(TextBlock, "Format", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => String(v));
    get format(): string {
        return <string>this.getValue(TextBlock.formatProperty);
    }
    set format(value: string) {
        this.setValue(TextBlock.formatProperty, value);
    }


}