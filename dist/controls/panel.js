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
let Panel = Panel_1 = class Panel extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._divElement = null;
        this._children = new __1.ObservableCollection();
        //virtual items
        this.virtualItemCount = 0;
        this.virtualOffset = null;
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._divElement = document.createElement("div");
        if (this.children != null)
            this.children.forEach(child => child.attachVisual(this._divElement));
        super.attachVisualOverride(elementContainer);
    }
    get children() {
        return this._children;
    }
    set children(value) {
        if (value == this._children)
            return;
        if (value == null)
            throw new Error("value can't be null");
        //reset parent on all children
        this._children.forEach(el => {
            if (el.parent == this) {
                el.parent = null;
                el.attachVisual(null);
            }
        });
        //remove handler so that resource can be disposed
        this._children.offChangeNotify(this);
        this._children = value;
        //attach new children here
        this._children.forEach(el => {
            if (el.parent != null) {
                //if already child of a different parent throw error
                //in future investigate if it can be removed from container automatically
                throw new Error("Element already child of another element, please remove it first from previous container");
            }
            el.parent = this;
            if (this._visual != null)
                el.attachVisual(this._visual);
        });
        this._children.onChangeNotify(this);
        this.invalidateMeasure();
    }
    onCollectionChanged(collection, added, removed, startRemoveIndex) {
        removed.forEach(el => {
            let element = el;
            if (element.parent == this) {
                element.parent = null;
                element.attachVisual(null);
            }
        });
        added.forEach(el => {
            let element = el;
            element.parent = this;
            if (this._visual != null)
                element.attachVisual(this._visual);
        });
        this.invalidateMeasure();
    }
    layoutOverride() {
        super.layoutOverride();
        var background = this.background;
        if (this._visual != null &&
            this._visual.style.background != background)
            this._visual.style.background = background;
        this._children.forEach(child => child.layout());
    }
    get background() {
        return this.getValue(Panel_1.backgroundProperty);
    }
    set background(value) {
        this.setValue(Panel_1.backgroundProperty, value);
    }
};
Panel.backgroundProperty = __1.DependencyObject.registerProperty(Panel_1, "Background", null, _1.FrameworkPropertyMetadataOptions.AffectsRender);
Panel = Panel_1 = __decorate([
    __1.TypeId("ovuse.controls.Panel")
], Panel);
exports.Panel = Panel;
var Panel_1;
