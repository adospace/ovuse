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
let MediaTemplateSelector = class MediaTemplateSelector extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._container = null;
        this._element = null;
        //Templates collection
        this._templates = new _2.ObservableCollection();
    }
    attachVisualOverride(elementContainer) {
        this._container = elementContainer;
        this.setupItem();
        super.attachVisualOverride(elementContainer);
    }
    setupItem() {
        if (this._container == null)
            return;
        if (this._element != null) {
            this._element.attachVisual(null);
            this._element.parent = null;
        }
        if (this._templates == null ||
            this._templates.count == 0)
            return;
        var templateForItem = _1.DataTemplate.getTemplateForMedia(this._templates.toArray());
        if (templateForItem == null) {
            throw new Error("Unable to find a valid template for this media");
        }
        this._element = templateForItem.createElement();
        if (this._element != null) {
            this._element.attachVisual(this._container);
            this._element.parent = this;
        }
        this.invalidateMeasure();
    }
    measureOverride(constraint) {
        var child = this._element;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        var child = this._element;
        if (child != null)
            child.arrange(finalSize.toRect());
        return finalSize;
    }
    layoutOverride() {
        super.layoutOverride();
        var child = this._element;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);
            child.layout(childOffset);
        }
    }
    get templates() {
        return this._templates;
    }
    set templates(value) {
        this._templates = value;
    }
};
MediaTemplateSelector = __decorate([
    _2.TypeId("ovuse.controls.MediaTemplateSelector")
], MediaTemplateSelector);
exports.MediaTemplateSelector = MediaTemplateSelector;
