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
let Border = Border_1 = class Border extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._child = null;
        this._divElement = null;
    }
    get child() {
        return this._child;
    }
    set child(value) {
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
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._divElement = document.createElement("div");
        this.updateVisualProperties();
        if (this._child != null) {
            this._child.attachVisual(this._divElement);
        }
        super.attachVisualOverride(elementContainer);
    }
    measureOverride(constraint) {
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
    }
    arrangeOverride(finalSize) {
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
    }
    layoutOverride() {
        super.layoutOverride();
        var borderThickness = this.borderThickness;
        if (borderThickness == null)
            borderThickness = new _1.Thickness();
        if (this._visual != null && this.renderSize != null) {
            this._visual.style.width = (this.renderSize.width - (borderThickness.left + borderThickness.right)).toString() + "px";
            this._visual.style.height = (this.renderSize.height - (borderThickness.top + borderThickness.bottom)).toString() + "px";
        }
        if (this._child != null)
            this._child.layout();
    }
    updateVisualProperties() {
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
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == Border_1.borderThicknessProperty ||
            property == Border_1.backgroundProperty ||
            property == Border_1.borderBrushProperty)
            this.updateVisualProperties();
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    get borderThickness() {
        return this.getValue(Border_1.borderThicknessProperty);
    }
    set borderThickness(value) {
        this.setValue(Border_1.borderThicknessProperty, value);
    }
    get padding() {
        return this.getValue(Border_1.paddingProperty);
    }
    set padding(value) {
        this.setValue(Border_1.paddingProperty, value);
    }
    get background() {
        return this.getValue(Border_1.backgroundProperty);
    }
    set background(value) {
        this.setValue(Border_1.backgroundProperty, value);
    }
    get borderBrush() {
        return this.getValue(Border_1.borderBrushProperty);
    }
    set borderBrush(value) {
        this.setValue(Border_1.borderBrushProperty, value);
    }
    get borderStyle() {
        return this.getValue(Border_1.borderStyleProperty);
    }
    set borderStyle(value) {
        this.setValue(Border_1.borderStyleProperty, value);
    }
};
Border.borderThicknessProperty = _2.DependencyObject.registerProperty(Border_1, "BorderThickness", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => _1.Thickness.fromString(v));
Border.paddingProperty = _2.DependencyObject.registerProperty(Border_1, "Padding", new _1.Thickness(), _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => _1.Thickness.fromString(v));
Border.backgroundProperty = _2.DependencyObject.registerProperty(Border_1, "Background", null, _1.FrameworkPropertyMetadataOptions.AffectsRender);
Border.borderBrushProperty = _2.DependencyObject.registerProperty(Border_1, "BorderBrush", null, _1.FrameworkPropertyMetadataOptions.AffectsRender);
Border.borderStyleProperty = _2.DependencyObject.registerProperty(Border_1, "BorderStyle", null, _1.FrameworkPropertyMetadataOptions.AffectsRender);
Border = Border_1 = __decorate([
    _2.TypeId("ovuse.controls.Border")
], Border);
exports.Border = Border;
var Border_1;
