"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
let Popup = Popup_1 = class Popup extends _1.FrameworkElement {
    constructor() {
        super();
        this._popupContainer = null;
        this._child = null;
    }
    static initProperties() {
        _1.FrameworkElement.horizontalAlignmentProperty.overrideDefaultValue(Popup_1, "Center");
        _1.FrameworkElement.verticalAlignmentProperty.overrideDefaultValue(Popup_1, "Center");
    }
    tryLoadChildFromServer() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = (ev) => {
            if (req.readyState == 4 && req.status == 200) {
                let loader = new _1.XamlReader();
                this._child = loader.Parse(req.responseText);
                if (this._child != null)
                    this.setupChild();
            }
        };
        var typeName = __1.getObjectTypeId(this);
        if (typeName != undefined) {
            req.open("GET", typeName.replace(/\./gi, '/') + ".xml", true);
            req.send();
        }
    }
    get child() {
        return this._child;
    }
    set child(value) {
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
    setupChild() {
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
                this.removeEventListener("mousedown", arguments.callee);
                _1.LayoutManager.closePopup(currentThis);
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
    initializeComponent() {
        return null;
    }
    layoutOverride() {
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
    measureOverride(constraint) {
        var mySize = new _1.Size();
        if (this._child != null) {
            this._child.measure(constraint);
            if (this._child.desiredSize != null)
                return this._child.desiredSize;
        }
        return mySize;
    }
    arrangeOverride(finalSize) {
        //  arrange child
        var child = this._child;
        if (child != null) {
            child.arrange(new _1.Rect(0, 0, finalSize.width, finalSize.height));
        }
        return finalSize;
    }
    get sizeToContent() {
        return this.getValue(Popup_1.sizeToContentProperty);
    }
    set sizeToContent(value) {
        this.setValue(Popup_1.sizeToContentProperty, value);
    }
    get position() {
        return this.getValue(Popup_1.positionProperty);
    }
    set position(value) {
        this.setValue(Popup_1.positionProperty, value);
    }
};
Popup._init = Popup_1.initProperties();
//SizeToContent property
Popup.sizeToContentProperty = __1.DependencyObject.registerProperty(Popup_1, "SizeToContent", _1.SizeToContent.Both, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => _1.SizeToContent[v]);
Popup.positionProperty = __1.DependencyObject.registerProperty(Popup_1, "Position", _1.PopupPosition.Center, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => _1.PopupPosition[v]);
Popup = Popup_1 = __decorate([
    __1.DependencyObjectId("ovuse.Controls.Popup"),
    __metadata("design:paramtypes", [])
], Popup);
exports.Popup = Popup;
var Popup_1;
