import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, XamlReader, TextBlock, DataTemplate } from '.'
import { TypeId, DependencyProperty, DependencyObject, ObservableCollection } from '../.'
import { ISupportCollectionChanged } from '../contracts'

@TypeId("ovuse.controls.NativeElement")
export class NativeElement extends FrameworkElement {

    public constructor(public elementType: string) {
        super();
    }

    private _child: UIElement | null = null;
    get child(): UIElement | null {
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
                if (this._visual != null)
                    this._child.attachVisual(this._visual, true);
            }
            this.invalidateMeasure();
        }
    }

    invalidateMeasure(): void {
        this._measuredSize = null;
        super.invalidateMeasure();
    }

    attachVisualOverride(elementContainer: HTMLElement) {
        this._visual = document.createElement(this.elementType);
        var text = this.text;
        if (text != null)
            this._visual.innerHTML = text;

        if (this._child != null) {
            var childVisual = this._child.attachVisual(this._visual, true);
            if (childVisual != null && !this.arrangeChild)
                childVisual.style.position = "";                
        }


        super.attachVisualOverride(elementContainer);
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {

        if (property == NativeElement.textProperty && this._visual != null) {
            this._visual.innerHTML = value;
        }

        super.onDependencyPropertyChanged(property, value, oldValue);
    }

    private _measuredSize: Size | null = null;
    protected measureOverride(constraint: Size): Size {
        if (this.arrangeChild) {
            if (this._child != null)
                this._child.measure(constraint);
        }
        var pElement = this._visual;;
        if (this._measuredSize == null && pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new Size(pElement.clientWidth, pElement.clientHeight);
        }
        if (this._measuredSize != null)
            return new Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));

        return constraint;
    }

    protected arrangeOverride(finalSize: Size): Size {

        var pElement = this._visual;
        if (pElement != null){
            pElement.style.width = finalSize.width.toString() + "px";
            pElement.style.height = finalSize.height.toString() + "px";
        }

        if (this.arrangeChild) {
            var child = this.child;
            if (child != null) {
                child.arrange(new Rect(0, 0, finalSize.width, finalSize.height));
            }
        }

        return finalSize;
    }

    static textProperty = DependencyObject.registerProperty(
        NativeElement, "Text", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => String(v));
    get text(): string {
        return <string>this.getValue(NativeElement.textProperty);
    }
    set text(value: string) {
        this.setValue(NativeElement.textProperty, value);
    }

    static arrangeChildProperty = DependencyObject.registerProperty(
        NativeElement, "ArrangeChild", true, FrameworkPropertyMetadataOptions.None, (v) => v != null && v.trim().toLowerCase() == "true");
    get arrangeChild(): boolean {
        return <boolean>this.getValue(NativeElement.arrangeChildProperty);
    }
    set arrangeChild(value: boolean) {
        this.setValue(NativeElement.arrangeChildProperty, value);
    }

}

@TypeId("ovuse.controls.div")
export class div extends NativeElement {
    constructor() {
        super("div");
    }
}

@TypeId("ovuse.controls.a")
export class a extends NativeElement {
    constructor() {
        super("a");
    }
}

@TypeId("ovuse.controls.img")
export class img extends NativeElement {
    constructor() {
        super("img");
    }
}

@TypeId("ovuse.controls.i")
export class i extends NativeElement {
    constructor() {
        super("i");
    }
}

@TypeId("ovuse.controls.ul")
export class ul extends NativeElement {
    constructor() {
        super("ul");
    }
}

@TypeId("ovuse.controls.li")
export class li extends NativeElement {
    constructor() {
        super("li");
    }
}

@TypeId("ovuse.controls.nav")
export class nav extends NativeElement {
    constructor() {
        super("nav");
    }
}

@TypeId("ovuse.controls.span")
export class span extends NativeElement {

    constructor() {
        super("span");
    }
}

@TypeId("ovuse.controls.h1")
export class h1 extends NativeElement {
    static typeName: string = "layouts.controls.h1";
    get typeName(): string {
        return h1.typeName;
    }

    constructor() {
        super("h1");
    }
}

@TypeId("ovuse.controls.h2")
export class h2 extends NativeElement {
    static typeName: string = "layouts.controls.h2";
    get typeName(): string {
        return h2.typeName;
    }

    constructor() {
        super("h2");
    }
}

@TypeId("ovuse.controls.h3")
export class h3 extends NativeElement {
    static typeName: string = "layouts.controls.h3";
    get typeName(): string {
        return h3.typeName;
    }

    constructor() {
        super("h3");
    }
}

@TypeId("ovuse.controls.h4")
export class h4 extends NativeElement {
    static typeName: string = "layouts.controls.h4";
    get typeName(): string {
        return h4.typeName;
    }

    constructor() {
        super("h4");
    }
}

@TypeId("ovuse.controls.h5")
export class h5 extends NativeElement {
    static typeName: string = "layouts.controls.h5";
    get typeName(): string {
        return h5.typeName;
    }

    constructor() {
        super("h5");
    }
}
