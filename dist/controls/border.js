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
var _2 = require("../.");
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        // static typeName: string = "layouts.controls.Border";
        // get typeName(): string {
        //     return Border.typeName;
        // }
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._child = null;
        _this._divElement = null;
        return _this;
    }
    Border_1 = Border;
    Object.defineProperty(Border.prototype, "child", {
        get: function () {
            return this._child;
        },
        set: function (value) {
            if (this._child != value) {
                if (this._child != null && this._child.parent == this) {
                    this._child.parent = null;
                    this._child.attachVisual(null);
                }
                this._child = value;
                if (this._child != null) {
                    this._child.parent = this;
                    if (this._divElement != null)
                        this._child.attachVisual(this._divElement);
                }
                this.invalidateMeasure();
            }
        },
        enumerable: true,
        configurable: true
    });
    Border.prototype.attachVisualOverride = function (elementContainer) {
        this._visual = this._divElement = document.createElement("div");
        this.updateVisualProperties();
        if (this._child != null) {
            this._child.attachVisual(this._divElement);
        }
        _super.prototype.attachVisualOverride.call(this, elementContainer);
    };
    Border.prototype.measureOverride = function (constraint) {
        var mySize = new _1.Size();
        // Compute the chrome size added by the various elements
        var borderThickness = this.borderThickness;
        if (borderThickness == null)
            borderThickness = new _1.Thickness();
        var border = new _1.Size(borderThickness.left + borderThickness.right, borderThickness.top + borderThickness.bottom);
        var padding = new _1.Size(this.padding.left + this.padding.right, this.padding.top + this.padding.bottom);
        //If we have a child
        if (this._child != null) {
            // Combine into total decorating size
            var combined = new _1.Size(border.width + padding.width, border.height + padding.height);
            // Remove size of border only from child's reference size.
            var childConstraint = new _1.Size(Math.max(0.0, constraint.width - combined.width), Math.max(0.0, constraint.height - combined.height));
            this._child.measure(childConstraint);
            var childSize = this._child.desiredSize;
            if (childSize != null) {
                // Now use the returned size to drive our size, by adding back the margins, etc.
                mySize.width = childSize.width + combined.width;
                mySize.height = childSize.height + combined.height;
            }
        }
        else {
            // Combine into total decorating size
            mySize = new _1.Size(border.width + padding.width, border.height + padding.height);
        }
        return mySize;
    };
    Border.prototype.arrangeOverride = function (finalSize) {
        var borderThickness = this.borderThickness;
        if (borderThickness == null)
            borderThickness = new _1.Thickness();
        var boundRect = new _1.Rect(0, 0, finalSize.width, finalSize.height);
        var innerRect = new _1.Rect(boundRect.x + borderThickness.left, boundRect.y + borderThickness.top, Math.max(0.0, boundRect.width - borderThickness.left - borderThickness.right), Math.max(0.0, boundRect.height - borderThickness.top - borderThickness.bottom));
        //  arrange child
        var child = this._child;
        var padding = this.padding;
        if (child != null) {
            var childRect = new _1.Rect(innerRect.x + padding.left, innerRect.y + padding.top, Math.max(0.0, innerRect.width - padding.left - padding.right), Math.max(0.0, innerRect.height - padding.top - padding.bottom));
            child.arrange(childRect);
        }
        return finalSize;
    };
    Border.prototype.layoutOverride = function () {
        _super.prototype.layoutOverride.call(this);
        var borderThickness = this.borderThickness;
        if (borderThickness == null)
            borderThickness = new _1.Thickness();
        if (this._visual != null && this.renderSize != null) {
            this._visual.style.width = (this.renderSize.width - (borderThickness.left + borderThickness.right)).toString() + "px";
            this._visual.style.height = (this.renderSize.height - (borderThickness.top + borderThickness.bottom)).toString() + "px";
        }
        if (this._child != null)
            this._child.layout();
    };
    Border.prototype.updateVisualProperties = function () {
        if (this._visual == null)
            return;
        this._visual.style.background = this.background;
        if (this.borderBrush != null)
            this._visual.style.borderColor = this.borderBrush;
        if (this.borderStyle != null)
            this._visual.style.borderStyle = this.borderStyle;
        var borderThickness = this.borderThickness;
        if (borderThickness != null) {
            if (borderThickness.isSameWidth)
                this._visual.style.borderWidth = borderThickness.left.toString() + "px";
            else {
                this._visual.style.borderLeft = borderThickness.left.toString() + "px";
                this._visual.style.borderTop = borderThickness.top.toString() + "px";
                this._visual.style.borderRight = borderThickness.right.toString() + "px";
                this._visual.style.borderBottom = borderThickness.bottom.toString() + "px";
            }
        }
    };
    Border.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
        if (property == Border_1.borderThicknessProperty ||
            property == Border_1.backgroundProperty ||
            property == Border_1.borderBrushProperty)
            this.updateVisualProperties();
        _super.prototype.onDependencyPropertyChanged.call(this, property, value, oldValue);
    };
    Object.defineProperty(Border.prototype, "borderThickness", {
        get: function () {
            return this.getValue(Border_1.borderThicknessProperty);
        },
        set: function (value) {
            this.setValue(Border_1.borderThicknessProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Border.prototype, "padding", {
        get: function () {
            return this.getValue(Border_1.paddingProperty);
        },
        set: function (value) {
            this.setValue(Border_1.paddingProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Border.prototype, "background", {
        get: function () {
            return this.getValue(Border_1.backgroundProperty);
        },
        set: function (value) {
            this.setValue(Border_1.backgroundProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Border.prototype, "borderBrush", {
        get: function () {
            return this.getValue(Border_1.borderBrushProperty);
        },
        set: function (value) {
            this.setValue(Border_1.borderBrushProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Border.prototype, "borderStyle", {
        get: function () {
            return this.getValue(Border_1.borderStyleProperty);
        },
        set: function (value) {
            this.setValue(Border_1.borderStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Border.borderThicknessProperty = _2.DependencyObject.registerProperty(Border_1, "BorderThickness", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.Thickness.fromString(v); });
    Border.paddingProperty = _2.DependencyObject.registerProperty(Border_1, "Padding", new _1.Thickness(), _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.Thickness.fromString(v); });
    Border.backgroundProperty = _2.DependencyObject.registerProperty(Border_1, "Background", null, _1.FrameworkPropertyMetadataOptions.AffectsRender);
    Border.borderBrushProperty = _2.DependencyObject.registerProperty(Border_1, "BorderBrush", null, _1.FrameworkPropertyMetadataOptions.AffectsRender);
    Border.borderStyleProperty = _2.DependencyObject.registerProperty(Border_1, "BorderStyle", null, _1.FrameworkPropertyMetadataOptions.AffectsRender);
    Border = Border_1 = __decorate([
        _2.DependencyObjectId("ovuse.Border")
    ], Border);
    return Border;
    var Border_1;
}(_1.FrameworkElement));
exports.Border = Border;
