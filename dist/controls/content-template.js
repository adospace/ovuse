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
let ContentTemplate = ContentTemplate_1 = class ContentTemplate extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._innerXaml = null;
        this._xamlLoader = null;
        this._container = null;
        this._child = null;
    }
    setInnerXaml(value) {
        this._innerXaml = value;
    }
    setXamlLoader(loader) {
        this._xamlLoader = loader;
    }
    setupChild() {
        if (this._container == null)
            return; //not yet ready to create content element
        var content = this.content;
        var child = this._child;
        if (content == null &&
            child == null)
            return;
        if (content != null &&
            child == null) {
            if (this._innerXaml != null &&
                this._xamlLoader != null) {
                this._child = child = this._xamlLoader.Parse(this._innerXaml);
            }
        }
        if (content != null &&
            child != null) {
            child.setValue(_1.FrameworkElement.dataContextProperty, content);
            //NOTE: Set datacontext before attach element to DOM
            //If it's attached without datacontext, bindings will target parent datacontext (ie my datacontext)
            //and when the correct datacontext is attached again to content, bindings will re-target to 
            //new context
            child.parent = this;
            child.attachVisual(this._container);
        }
        if (content == null &&
            child != null) {
            if (child.parent == this) {
                child.parent = null;
                child.attachVisual(null);
            }
        }
    }
    attachVisualOverride(elementContainer) {
        this._container = elementContainer;
        this.setupChild();
        super.attachVisualOverride(elementContainer);
    }
    measureOverride(constraint) {
        var child = this._child;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        var child = this._child;
        if (child != null)
            child.arrange(finalSize.toRect());
        return finalSize;
    }
    layoutOverride() {
        super.layoutOverride();
        var child = this._child;
        if (child != null)
            child.layout(this.visualOffset);
    }
    get content() {
        return this.getValue(ContentTemplate_1.contentProperty);
    }
    set content(value) {
        this.setValue(ContentTemplate_1.contentProperty, value);
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == ContentTemplate_1.contentProperty) {
            this.setupChild();
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
};
ContentTemplate.contentProperty = _2.DependencyObject.registerProperty(ContentTemplate_1, "Content", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
ContentTemplate = ContentTemplate_1 = __decorate([
    _2.TypeId("ovuse.controls.ContentTemplate")
], ContentTemplate);
exports.ContentTemplate = ContentTemplate;
var ContentTemplate_1;
