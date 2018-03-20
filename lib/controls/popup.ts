import { 
    FrameworkElement, XamlReader, UIElement, LayoutManager, Size, SizeToContent, 
    Rect, PopupPosition, FrameworkPropertyMetadataOptions 
} from '.'
import { DependencyObject, DependencyProperty, DependencyObjectId, getObjectTypeId } from '..' 

@DependencyObjectId("ovuse.Controls.Popup")
export class Popup extends FrameworkElement {

    private static initProperties() {
        FrameworkElement.horizontalAlignmentProperty.overrideDefaultValue(Popup, "Center");
        FrameworkElement.verticalAlignmentProperty.overrideDefaultValue(Popup, "Center");
    }
    private static _init = Popup.initProperties();

    constructor() {
        super();
    }

    private tryLoadChildFromServer() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = (ev) => {
            if (req.readyState == 4 && req.status == 200) {
                let loader = new XamlReader();
                this._child = loader.Parse(req.responseText);
                if (this._child != null)
                    this.setupChild();
            }
        }
        req.open("GET", getObjectTypeId(this).replace(/\./gi, '/') + ".xml", true);
        req.send();
    }

    private _popupContainer: HTMLDivElement | null = null;
    private _child: UIElement | null = null;
    get child(): UIElement | null {
        return this._child;
    }
    set child(value: UIElement |null) {
        if (this._child != value) {
            this._child = value;
            this.invalidateMeasure();
        }
    }

    onShow() {
        if (this._child == null)
            this._child = this.initializeComponent();
        if (this._child != null) 
            this.setupChild();
        else
            this.tryLoadChildFromServer();
    }

    private setupChild() {
        if (this._child == null)
            return;
        this._child.parent = this;
        this._popupContainer = document.createElement("div");
        this._popupContainer.style.width = this._popupContainer.style.height = "100%";
        this._popupContainer.style.position = "fixed";
        this._popupContainer.className = "layoutsPopupContainer"; //default popup container style
        if (this.cssClass != null)
            this._popupContainer.className = this.cssClass;
        document.body.appendChild(this._popupContainer);
        this._child.attachVisual(this._popupContainer);

        var currentThis = this;
        this._popupContainer.addEventListener("mousedown", function (event) {
            if (event.target == currentThis._popupContainer) {
                this.removeEventListener("mousedown", <EventListenerOrEventListenerObject>arguments.callee);
                LayoutManager.closePopup(currentThis);
            }
        });
    }

    onClose() {
        if (this._child != null && this._child.parent == this) {
            this._child.attachVisual(null);
            this._child.parent = null;
            if (this._popupContainer != null)
                document.body.removeChild(this._popupContainer);
            this._popupContainer = null;
        }
    }

    protected initializeComponent(): UIElement | null {
        return null;
    }

    protected layoutOverride() {
        super.layoutOverride();
        var child = this.child;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);

            child.layout(childOffset);
        }
    }

    protected measureOverride(constraint: Size): Size {
        var mySize = new Size();

        if (this._child != null) {
            this._child.measure(constraint);
            if (this._child.desiredSize != null)
                return this._child.desiredSize;
        }

        return mySize;
    }

    protected arrangeOverride(finalSize: Size): Size {
        //  arrange child
        var child = this._child;
        if (child != null) {
            child.arrange(new Rect(0, 0, finalSize.width, finalSize.height));
        }

        return finalSize;
    }   


    //SizeToContent property
    static sizeToContentProperty = DependencyObject.registerProperty(Popup, "SizeToContent", SizeToContent.Both, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => (<any>SizeToContent)[v]);
    get sizeToContent(): SizeToContent {
        return <SizeToContent>this.getValue(Popup.sizeToContentProperty);
    }
    set sizeToContent(value: SizeToContent) {
        this.setValue(Popup.sizeToContentProperty, value);
    }        

    static positionProperty = DependencyObject.registerProperty(Popup, "Position", PopupPosition.Center, FrameworkPropertyMetadataOptions.AffectsMeasure | FrameworkPropertyMetadataOptions.AffectsRender, (v) => (<any>PopupPosition)[v]);
    get position(): PopupPosition {
        return <PopupPosition>this.getValue(Popup.positionProperty);
    }
    set position(value: PopupPosition) {
        this.setValue(Popup.positionProperty, value);
    }
}