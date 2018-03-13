
import { UIElement, FrameworkElement, XamlReader, Size, Rect,SizeToContent, FrameworkPropertyMetadataOptions, NavigationContext } from '.'
import { DependencyObject, DependencyProperty, typeId, getTypeId, getObjectTypeId } from '..'

@typeId("ovuse.controls.Page")
export class Page extends FrameworkElement {
    // static typeName: string = "layouts.controls.Page";
    // get typeName(): string{
    //     return Page.typeName;
    // }
    
    private tryLoadChildFromServer() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = (ev) => {
            if (req.readyState == 4 && req.status == 200) {
                let loader = new XamlReader();
                this.child = loader.Parse(req.responseText);
            }
        }
        var typeName = getObjectTypeId(this);
        req.open("GET", typeName.replace(/\./gi, '/') + ".xml", true);
        req.send();
    }

    protected _container: HTMLElement | null = null;
    attachVisualOverride(elementContainer: HTMLElement) {

        this._container = elementContainer;

        var child = this.child;
        if (child != null) {
            child.parent = this;
            child.attachVisual(this._container);
        }
        else {
            this.tryLoadChildFromServer();
        }

        super.attachVisualOverride(elementContainer);
    }

    protected layoutOverride() {
        var child = this.child;
        if (child != null)
            child.layout();
    }

    protected measureOverride(constraint: Size): Size {
        var mySize = new Size();

        var child = this.child;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }

        return mySize;
    }

    protected arrangeOverride(finalSize: Size): Size {
        //  arrange child
        var child = this.child;
        if (child != null) {
            child.arrange(new Rect(0, 0, finalSize.width, finalSize.height));
        }

        return finalSize;
    }   

    static childProperty = DependencyObject.registerPropertyByType(Page, "Child", null, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender);
    get child(): UIElement {
        return <UIElement>this.getValue(Page.childProperty);
    }
    set child(value: UIElement) {
        this.setValue(Page.childProperty, value);
    }

    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        if (property == Page.childProperty) {
            var oldChild = <UIElement>oldValue;
            if (oldChild != null && oldChild.parent == this) {
                oldChild.parent = null;
                oldChild.attachVisual(null);
            }

            var newChild = <UIElement>value;
            if (newChild != null) {
                newChild.parent = this;
                if (this._container != null)
                    newChild.attachVisual(this._container);
            }
        }

        super.onDependencyPropertyChanged(property, value, oldValue);
    }


    //SizeToContent property
    static sizeToContentProperty = DependencyObject.registerPropertyByType(Page, "SizeToContent", SizeToContent.None, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => (<any>SizeToContent)[v]);
    get sizeToContent(): SizeToContent {
        return <SizeToContent>this.getValue(Page.sizeToContentProperty);
    }
    set sizeToContent(value: SizeToContent) {
        this.setValue(Page.sizeToContentProperty, value);
    }

    //navigation system

    //if cachePage is true navigation system reuse already loaded page
    public cachePage: boolean = false;

    //onNavigate method is called also for reused/cached pages
    public onNavigate(context: NavigationContext) {

    }


}