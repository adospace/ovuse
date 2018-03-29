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
let ControlTemplate = ControlTemplate_1 = class ControlTemplate extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._container = null;
    }
    attachVisualOverride(elementContainer) {
        this._container = elementContainer;
        var child = this.content;
        if (child != null) {
            child.parent = this;
            child.attachVisual(this._container);
        }
        super.attachVisualOverride(elementContainer);
    }
    measureOverride(constraint) {
        var child = this.content;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        var child = this.content;
        if (child != null)
            child.arrange(finalSize.toRect());
        return finalSize;
    }
    layoutOverride() {
        super.layoutOverride();
        var child = this.content;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);
            child.layout(childOffset);
        }
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == ControlTemplate_1.contentProperty) {
            var oldChild = oldValue;
            if (oldChild != null && oldChild.parent == this) {
                oldChild.attachVisual(null);
                oldChild.parent = null;
            }
            var newChild = value;
            if (newChild != null) {
                //NOTE: change parent AFTER attachVisual because changing parent will raise
                //notifications to binding to DataContext
                if (this._container != null)
                    newChild.attachVisual(this._container);
                newChild.parent = this;
            }
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    get content() {
        return this.getValue(ControlTemplate_1.contentProperty);
    }
    set content(value) {
        this.setValue(ControlTemplate_1.contentProperty, value);
    }
};
ControlTemplate.contentProperty = _2.DependencyObject.registerProperty(ControlTemplate_1, "Content", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
ControlTemplate = ControlTemplate_1 = __decorate([
    _2.TypeId("ovuse.controls.ControlTemplate")
], ControlTemplate);
exports.ControlTemplate = ControlTemplate;
var ControlTemplate_1;
