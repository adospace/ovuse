"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var __1 = require("..");
var _2 = require("../.");
var TextBlock = /** @class */ (function (_super) {
    __extends(TextBlock, _super);
    function TextBlock() {
        // static typeName: string = "layouts.controls.TextBlock";
        // get typeName(): string {
        //     return TextBlock.typeName;
        // }
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._pElement = null;
        _this._measuredSize = null;
        return _this;
    }
    TextBlock_1 = TextBlock;
    TextBlock.prototype.createElement = function (elementContainer) {
        return document.createElement("p");
    };
    TextBlock.prototype.attachVisualOverride = function (elementContainer) {
        this._visual = this._pElement = this.createElement(elementContainer);
        this._visual.style.msUserSelect =
            this._visual.style.webkitUserSelect = "none";
        this._pElement.style.whiteSpace = this.whiteSpace;
        var text = this.text;
        var format = this.format;
        text = format != null && text != null && text != "" ? format.format(text) : text;
        this._pElement.innerHTML = text == null ? "" : text;
        _super.prototype.attachVisualOverride.call(this, elementContainer);
    };
    TextBlock.prototype.measureOverride = function (constraint) {
        var pElement = this._pElement;
        if (this._measuredSize == null && pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new _1.Size(pElement.clientWidth, pElement.clientHeight);
        }
        if (this._measuredSize != null)
            return new _1.Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));
        return new _1.Size();
    };
    TextBlock.prototype.arrangeOverride = function (finalSize) {
        var pElement = this._pElement;
        if (pElement != null) {
            pElement.style.width = finalSize.width.toString() + "px";
            pElement.style.height = finalSize.height.toString() + "px";
        }
        return finalSize;
    };
    TextBlock.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
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
        _super.prototype.onDependencyPropertyChanged.call(this, property, value, oldValue);
    };
    Object.defineProperty(TextBlock.prototype, "text", {
        get: function () {
            return this.getValue(TextBlock_1.textProperty);
        },
        set: function (value) {
            this.setValue(TextBlock_1.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBlock.prototype, "whiteSpace", {
        get: function () {
            return this.getValue(TextBlock_1.whiteSpaceProperty);
        },
        set: function (value) {
            this.setValue(TextBlock_1.whiteSpaceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBlock.prototype, "format", {
        get: function () {
            return this.getValue(TextBlock_1.formatProperty);
        },
        set: function (value) {
            this.setValue(TextBlock_1.formatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    TextBlock.textProperty = _2.DependencyObject.registerProperty(TextBlock_1, "Text", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return String(v); });
    TextBlock.whiteSpaceProperty = _2.DependencyObject.registerProperty(TextBlock_1, "WhiteSpace", "pre", _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
    TextBlock.formatProperty = _2.DependencyObject.registerProperty(TextBlock_1, "Format", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return String(v); });
    TextBlock = TextBlock_1 = __decorate([
        __1.DependencyObjectId("ovuse.controls.TextBlock")
    ], TextBlock);
    return TextBlock;
    var TextBlock_1;
}(_1.FrameworkElement));
exports.TextBlock = TextBlock;
