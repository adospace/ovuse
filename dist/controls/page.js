"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
let Page = Page_1 = class Page extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._container = null;
        //navigation system
        //if cachePage is true navigation system reuse already loaded page
        this.cachePage = false;
    }
    tryLoadChildFromServer() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = (ev) => {
            if (req.readyState == 4 && req.status == 200) {
                let loader = new _1.XamlReader();
                this.child = loader.Parse(req.responseText);
            }
        };
        var typeName = __1.getObjectTypeId(this);
        req.open("GET", typeName.replace(/\./gi, '/') + ".xml", true);
        req.send();
    }
    attachVisualOverride(elementContainer) {
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
    layoutOverride() {
        var child = this.child;
        if (child != null)
            child.layout();
    }
    measureOverride(constraint) {
        var mySize = new _1.Size();
        var child = this.child;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }
        return mySize;
    }
    arrangeOverride(finalSize) {
        //  arrange child
        var child = this.child;
        if (child != null) {
            child.arrange(new _1.Rect(0, 0, finalSize.width, finalSize.height));
        }
        return finalSize;
    }
    get child() {
        return this.getValue(Page_1.childProperty);
    }
    set child(value) {
        this.setValue(Page_1.childProperty, value);
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == Page_1.childProperty) {
            var oldChild = oldValue;
            if (oldChild != null && oldChild.parent == this) {
                oldChild.parent = null;
                oldChild.attachVisual(null);
            }
            var newChild = value;
            if (newChild != null) {
                newChild.parent = this;
                if (this._container != null)
                    newChild.attachVisual(this._container);
            }
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    get sizeToContent() {
        return this.getValue(Page_1.sizeToContentProperty);
    }
    set sizeToContent(value) {
        this.setValue(Page_1.sizeToContentProperty, value);
    }
    //onNavigate method is called also for reused/cached pages
    onNavigate(context) {
    }
};
Page.childProperty = __1.DependencyObject.registerProperty(Page_1, "Child", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
//SizeToContent property
Page.sizeToContentProperty = __1.DependencyObject.registerProperty(Page_1, "SizeToContent", _1.SizeToContent.None, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => _1.SizeToContent[v]);
Page = Page_1 = __decorate([
    __1.DependencyObjectId("ovuse.controls.Page")
], Page);
exports.Page = Page;
var Page_1;
