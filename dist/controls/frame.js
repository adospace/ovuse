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
let Frame = Frame_1 = class Frame extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._frameElement = null;
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._frameElement = document.createElement("frame");
        super.attachVisualOverride(elementContainer);
    }
    measureOverride(constraint) {
        var src = this.Source;
        var mySize = new _1.Size();
        var pElement = this._frameElement;
        if (pElement != null) {
            var srcChanged = (pElement.src != src);
            if (isFinite(constraint.width))
                pElement.style.maxWidth = constraint.width + "px";
            if (isFinite(constraint.height))
                pElement.style.maxHeight = constraint.height + "px";
            pElement.style.width = "auto";
            pElement.style.height = "auto";
            if (srcChanged) {
                pElement.src = src;
            }
            mySize = new _1.Size(pElement.clientWidth, pElement.clientHeight);
            if (srcChanged && this.renderSize != null) {
                pElement.style.width = this.renderSize.width.toString() + "px";
                pElement.style.height = this.renderSize.height.toString() + "px";
            }
        }
        return mySize;
    }
    get Source() {
        return this.getValue(Frame_1.sourceProperty);
    }
    set Source(value) {
        this.setValue(Frame_1.sourceProperty, value);
    }
};
Frame.sourceProperty = _2.DependencyObject.registerProperty(Frame_1, "Source", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
Frame = Frame_1 = __decorate([
    _2.TypeId("ovuse.controls.Frame")
], Frame);
exports.Frame = Frame;
var Frame_1;
