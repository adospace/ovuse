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
let TextBox = TextBox_1 = class TextBox extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._pElement = null;
        this._measuredSize = null;
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._pElement = document.createElement("input");
        this._pElement.value = this.text;
        this._pElement.type = this.type;
        this._pElement.readOnly = this.isReadonly;
        this._pElement.placeholder = this.placeholder;
        this._pElement.oninput = (ev) => this.onTextChanged();
        this._pElement.onchange = (ev) => this.onTextChanged();
        this._pElement.onkeypress = (ev) => this.onTextChanged();
        this._pElement.onpaste = (ev) => this.onTextChanged();
        super.attachVisualOverride(elementContainer);
    }
    onTextChanged() {
        if (this._pElement != null)
            this.text = this._pElement.value;
    }
    measureOverride(constraint) {
        var pElement = this._pElement;
        if (this._measuredSize == null && pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new _1.Size(pElement.offsetWidth, pElement.offsetHeight);
        }
        if (this._measuredSize != null)
            return new _1.Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));
        return constraint;
    }
    layoutOverride() {
        super.layoutOverride();
        //layoutOverride above set style.width and styl.height
        //at that point browser compute new offsetWidth and offetHeight
        //we need to reset style.width/height so that textbox don't exceed space
        //that out parent has reserved for this control
        var pElement = this._pElement;
        if (this.renderSize != null && pElement != null) {
            pElement.style.width = (this.renderSize.width - (pElement.offsetWidth - this.renderSize.width)) + "px";
            pElement.style.height = (this.renderSize.height - (pElement.offsetHeight - this.renderSize.height)) + "px";
        }
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == TextBox_1.textProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.value = value;
            }
        }
        else if (property == TextBox_1.placeholderProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.placeholder = value;
            }
        }
        else if (property == TextBox_1.typeProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.type = value;
            }
        }
        else if (property == TextBox_1.isReadonlyProperty) {
            var pElement = this._pElement;
            if (pElement != null) {
                pElement.readOnly = value;
            }
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    get text() {
        return this.getValue(TextBox_1.textProperty);
    }
    set text(value) {
        this.setValue(TextBox_1.textProperty, value);
    }
    get placeholder() {
        return this.getValue(TextBox_1.placeholderProperty);
    }
    set placeholder(value) {
        this.setValue(TextBox_1.placeholderProperty, value);
    }
    get type() {
        return this.getValue(TextBox_1.typeProperty);
    }
    set type(value) {
        this.setValue(TextBox_1.typeProperty, value);
    }
    get isReadonly() {
        return this.getValue(TextBox_1.isReadonlyProperty);
    }
    set isReadonly(value) {
        this.setValue(TextBox_1.isReadonlyProperty, value);
    }
};
TextBox.textProperty = _2.DependencyObject.registerProperty(TextBox_1, "Text", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
TextBox.placeholderProperty = _2.DependencyObject.registerProperty(TextBox_1, "Placeholder", "", _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
TextBox.typeProperty = _2.DependencyObject.registerProperty(TextBox_1, "Type", "text", _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
TextBox.isReadonlyProperty = _2.DependencyObject.registerProperty(TextBox_1, "IsReadonly", false);
TextBox = TextBox_1 = __decorate([
    _2.TypeId("ovuse.controls.TextBox")
], TextBox);
exports.TextBox = TextBox;
var TextBox_1;
