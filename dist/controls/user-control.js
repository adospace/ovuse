"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _2 = require("../.");
let UserControl = UserControl_1 = class UserControl extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._content = null;
        this._container = null;
    }
    get typeName() {
        return UserControl_1.typeName;
    }
    initializeComponent() {
        return null;
    }
    tryLoadChildFromServer() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = (ev) => {
            if (req.readyState == 4 && req.status == 200) {
                let loader = new _1.XamlReader();
                this.setupChild(loader.Parse(req.responseText));
            }
        };
        //req.open("GET", "data/records.txt", true);
        //app.views.CustomView
        req.open("GET", this.typeName.replace(/\./gi, '/') + ".xml", true);
        req.send();
    }
    attachVisualOverride(elementContainer) {
        this._container = elementContainer;
        this.setupChild(this.initializeComponent());
        super.attachVisualOverride(elementContainer);
    }
    setupChild(content) {
        var child = this._content;
        if (child == null) {
            this._content = child = content;
            if (child != null)
                child.parent = this;
        }
        child = this._content;
        if (child != null) {
            child.attachVisual(this._container);
        }
        else {
            this.tryLoadChildFromServer();
        }
    }
    invalidateMeasure() {
        super.invalidateMeasure();
        var child = this._content;
        if (child != null) {
            child.invalidateMeasure();
        }
    }
    invalidateArrange() {
        super.invalidateArrange();
        var child = this._content;
        if (child != null) {
            child.invalidateArrange();
        }
    }
    invalidateLayout() {
        super.invalidateLayout();
        var child = this._content;
        if (child != null) {
            child.invalidateLayout();
        }
    }
    measureOverride(constraint) {
        var child = this._content;
        if (child != null &&
            child.desiredSize != null) {
            child.measure(constraint);
            return child.desiredSize;
        }
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        var child = this._content;
        if (child != null) {
            child.arrange(finalSize.toRect());
        }
        this.invalidateLayout();
        return finalSize;
    }
    layoutOverride() {
        super.layoutOverride();
        var child = this._content;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);
            child.layout(childOffset);
        }
    }
};
UserControl.typeName = "layouts.controls.UserControl";
UserControl = UserControl_1 = __decorate([
    _2.TypeId("ovuse.controls.UserControl")
], UserControl);
exports.UserControl = UserControl;
var UserControl_1;
