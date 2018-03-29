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
let Button = Button_1 = class Button extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._child = null;
        this._buttonElement = null;
    }
    get child() {
        return this._child;
    }
    set child(value) {
        if (this._child != value) {
            if (this._child != null && this._child.parent == this)
                this._child.parent = null;
            this._child = value;
            if (this._child != null) {
                this._child.parent = this;
                if (this._buttonElement != null)
                    this._child.attachVisual(this._buttonElement);
            }
            this.invalidateMeasure();
        }
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._buttonElement = document.createElement("button");
        this._visual.style.msUserSelect =
            this._visual.style.webkitUserSelect = "none";
        if (this._child != null) {
            this._child.attachVisual(this._buttonElement);
        }
        //this._buttonElement.onclick = (ev) => this.onClick(ev);
        this._buttonElement.disabled = !this.isEnabled;
        super.attachVisualOverride(elementContainer);
    }
    measureOverride(constraint) {
        this.isEnabled = this.popup != null || (this.command != null && this.command.canExecute(this.commandParameter));
        var mySize = new _1.Size();
        // Compute the chrome size added by padding
        var padding = new _1.Size(this.padding.left + this.padding.right, this.padding.top + this.padding.bottom);
        //If we have a child
        if (this._child != null) {
            // Remove size of padding only from child's reference size.
            var childConstraint = new _1.Size(Math.max(0.0, constraint.width - padding.width), Math.max(0.0, constraint.height - padding.height));
            this._child.measure(childConstraint);
            var childSize = this._child.desiredSize;
            if (childSize != null) {
                // Now use the returned size to drive our size, by adding back the margins, etc.
                mySize.width = childSize.width + padding.width;
                mySize.height = childSize.height + padding.height;
            }
        }
        else if (this.text != null) {
            var text = this.text;
            var mySize = new _1.Size();
            var pElement = this._buttonElement;
            if (pElement != null) {
                var txtChanged = (pElement.innerText !== text);
                if (isFinite(constraint.width))
                    pElement.style.maxWidth = constraint.width + "px";
                if (isFinite(constraint.height))
                    pElement.style.maxHeight = constraint.height + "px";
                pElement.style.width = "auto";
                pElement.style.height = "auto";
                pElement.style.whiteSpace = this.whiteSpace;
                if (txtChanged) {
                    pElement.innerHTML = this.text;
                }
                mySize = new _1.Size(pElement.offsetWidth, pElement.offsetHeight);
                if (this.renderSize != null) {
                    pElement.style.width = this.renderSize.width.toString() + "px";
                    pElement.style.height = this.renderSize.height.toString() + "px";
                }
            }
            return mySize;
        }
        else {
            // Combine into total decorating size
            mySize = new _1.Size(padding.width, padding.height);
        }
        return mySize;
    }
    arrangeOverride(finalSize) {
        //  arrange child
        var child = this._child;
        var padding = this.padding;
        if (child != null) {
            var childRect = new _1.Rect(padding.left, padding.top, Math.max(0.0, finalSize.width - padding.left - padding.right), Math.max(0.0, finalSize.height - padding.top - padding.bottom));
            child.arrange(childRect);
        }
        return finalSize;
    }
    layoutOverride() {
        super.layoutOverride();
        if (this._child != null)
            this._child.layout();
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == Button_1.commandProperty) {
            if (oldValue != null)
                oldValue.offCanExecuteChangeNotify(this);
            if (value != null)
                value.onCanExecuteChangeNotify(this);
        }
        else if (property == Button_1.isEnabledProperty) {
            if (this._buttonElement != null)
                this._buttonElement.disabled = !value;
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    onCommandCanExecuteChanged(command) {
        this.isEnabled = this.popup != null || (this.command != null && this.command.canExecute(this.commandParameter));
    }
    get padding() {
        return this.getValue(Button_1.paddingProperty);
    }
    set padding(value) {
        this.setValue(Button_1.paddingProperty, value);
    }
    get text() {
        return this.getValue(Button_1.textProperty);
    }
    set text(value) {
        this.setValue(Button_1.textProperty, value);
    }
    get whiteSpace() {
        return this.getValue(Button_1.whiteSpaceProperty);
    }
    set whiteSpace(value) {
        this.setValue(Button_1.whiteSpaceProperty, value);
    }
    get isEnabled() {
        return this.getValue(Button_1.isEnabledProperty);
    }
    set isEnabled(value) {
        this.setValue(Button_1.isEnabledProperty, value);
    }
};
//Dependency properties
Button.paddingProperty = _2.DependencyObject.registerProperty(Button_1, "Padding", new _1.Thickness(), _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
Button.textProperty = _2.DependencyObject.registerProperty(Button_1, "Text", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
Button.whiteSpaceProperty = _2.DependencyObject.registerProperty(Button_1, "WhiteSpace", "pre", _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
Button.isEnabledProperty = _2.DependencyObject.registerProperty(Button_1, "IsEnabled", true, _1.FrameworkPropertyMetadataOptions.AffectsRender);
Button = Button_1 = __decorate([
    _2.TypeId("ovuse.controls.Button")
], Button);
exports.Button = Button;
var Button_1;
