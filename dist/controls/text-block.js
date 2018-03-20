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
const _2 = require("../.");
let TextBlock = TextBlock_1 = class TextBlock extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._pElement = null;
        this._measuredSize = null;
    }
    createElement(elementContainer) {
        return document.createElement("p");
    }
    attachVisualOverride(elementContainer) {
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
    measureOverride(constraint) {
        var pElement = this._pElement;
        if (this._measuredSize == null && pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new _1.Size(pElement.clientWidth, pElement.clientHeight);
        }
        if (this._measuredSize != null)
            return new _1.Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        var pElement = this._pElement;
        if (pElement != null) {
            pElement.style.width = finalSize.width.toString() + "px";
            pElement.style.height = finalSize.height.toString() + "px";
        }
        return finalSize;
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == TextBlock_1.textProperty ||
            property == TextBlock_1.formatProperty) {
            var pElement = this._pElement;
            var text = value;
            var format = this.format;
            text = format != null && text != null && text != "" ? format.format(text) : text;
            if (pElement != null) {
                pElement.innerHTML = text == null ? "" : text;
                this._measuredSize = null;
            }
        }
        else if (property == TextBlock_1.whiteSpaceProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.style.whiteSpace = value;
                this._measuredSize = null;
            }
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    get text() {
        return this.getValue(TextBlock_1.textProperty);
    }
    set text(value) {
        this.setValue(TextBlock_1.textProperty, value);
    }
    get whiteSpace() {
        return this.getValue(TextBlock_1.whiteSpaceProperty);
    }
    set whiteSpace(value) {
        this.setValue(TextBlock_1.whiteSpaceProperty, value);
    }
    get format() {
        return this.getValue(TextBlock_1.formatProperty);
    }
    set format(value) {
        this.setValue(TextBlock_1.formatProperty, value);
    }
};
TextBlock.textProperty = _2.DependencyObject.registerProperty(TextBlock_1, "Text", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => String(v));
TextBlock.whiteSpaceProperty = _2.DependencyObject.registerProperty(TextBlock_1, "WhiteSpace", "pre", _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
TextBlock.formatProperty = _2.DependencyObject.registerProperty(TextBlock_1, "Format", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => String(v));
TextBlock = TextBlock_1 = __decorate([
    __1.DependencyObjectId("ovuse.controls.TextBlock")
], TextBlock);
exports.TextBlock = TextBlock;
var TextBlock_1;
