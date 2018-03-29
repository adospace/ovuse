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
let Label = Label_1 = class Label extends _1.TextBlock {
    constructor() {
        super(...arguments);
        this._label = null;
    }
    get typeName() {
        return Label_1.typeName;
    }
    createElement(elementContainer) {
        this._label = document.createElement("label");
        this._label.htmlFor = this.htmlFor;
        return this._label;
    }
    get htmlFor() {
        return this.getValue(Label_1.htmlForProperty);
    }
    set htmlFor(value) {
        this.setValue(Label_1.htmlForProperty, value);
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == Label_1.htmlForProperty) {
            if (this._label != null)
                this._label.htmlFor = this.htmlFor;
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
};
Label.typeName = "layouts.controls.Label";
Label.htmlForProperty = _2.DependencyObject.registerProperty(Label_1, "For", null, _1.FrameworkPropertyMetadataOptions.None, (v) => String(v));
Label = Label_1 = __decorate([
    _2.TypeId("ovuse.controls.Label")
], Label);
exports.Label = Label;
var Label_1;
