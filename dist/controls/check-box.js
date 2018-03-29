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
let CheckBox = CheckBox_1 = class CheckBox extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._pElementInput = null;
        this._measuredSize = null;
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._pElementInput = document.createElement("input");
        this._pElementInput.type = this.type;
        this._pElementInput.checked = this.isChecked;
        this._pElementInput.onclick = (ev) => this.onCheckChanged();
        super.attachVisualOverride(elementContainer);
    }
    onCheckChanged() {
        if (this._pElementInput != null)
            this.isChecked = this._pElementInput.checked;
    }
    measureOverride(constraint) {
        var pElement = this._pElementInput;
        if (this._measuredSize == null &&
            pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new _1.Size(pElement.offsetWidth, pElement.offsetHeight);
        }
        if (this._measuredSize != null)
            return new _1.Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));
        return constraint;
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == CheckBox_1.nameProperty) {
            var pElement = this._pElementInput;
            if (pElement != null) {
                pElement.name = value;
                this._measuredSize = null;
            }
        }
        else if (property == CheckBox_1.typeProperty) {
            var pElement = this._pElementInput;
            if (pElement != null) {
                pElement.type = value;
                this._measuredSize = null;
            }
        }
        else if (property == CheckBox_1.isCheckedProperty) {
            var pElement = this._pElementInput;
            if (pElement != null) {
                pElement.checked = value;
            }
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    get isChecked() {
        return this.getValue(CheckBox_1.isCheckedProperty);
    }
    set isChecked(value) {
        this.setValue(CheckBox_1.isCheckedProperty, value);
    }
    get name() {
        return this.getValue(CheckBox_1.nameProperty);
    }
    set placeholder(value) {
        this.setValue(CheckBox_1.nameProperty, value);
    }
    get type() {
        return this.getValue(CheckBox_1.typeProperty);
    }
    set type(value) {
        this.setValue(CheckBox_1.typeProperty, value);
    }
};
CheckBox.isCheckedProperty = _2.DependencyObject.registerProperty(CheckBox_1, "IsChecked", false, _1.FrameworkPropertyMetadataOptions.None);
CheckBox.nameProperty = _2.DependencyObject.registerProperty(CheckBox_1, "Name", "", _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
CheckBox.typeProperty = _2.DependencyObject.registerProperty(CheckBox_1, "Type", "checkbox", _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
CheckBox = CheckBox_1 = __decorate([
    _2.TypeId("ovuse.controls.CheckBox")
], CheckBox);
exports.CheckBox = CheckBox;
var CheckBox_1;
