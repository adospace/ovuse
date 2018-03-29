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
let ComboBox = ComboBox_1 = class ComboBox extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._selectElement = null;
        this._elements = null;
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._selectElement = document.createElement("select");
        this._selectElement.onchange = (ev) => this.onSelectionChanged();
        this.setupItems();
        super.attachVisualOverride(elementContainer);
    }
    onSelectionChanged() {
        if (this._selectElement == null)
            return;
        if (this._selectElement.selectedIndex == -1) {
            this.selectItem(null);
        }
        else if (this._elements != null) {
            this.selectItem(this._elements[this._selectElement.selectedIndex]);
        }
    }
    arrangeOverride(finalSize) {
        if (this._visual != null) {
            this._visual.style.width = finalSize.width + "px";
            this._visual.style.height = finalSize.height + "px";
        }
        return finalSize;
    }
    selectItem(item) {
        this.selectedItem = item;
        if (this.selectMember != null)
            this.selectedValue = item[this.selectMember];
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == ComboBox_1.itemsSourceProperty) {
            if (oldValue != null && oldValue["offChangeNotify"] != null) {
                var oldItmesSource = oldValue;
                oldItmesSource.offChangeNotify(this);
            }
            this.setupItems();
            if (value != null && value["onChangeNotify"] != null) {
                var newItemsSource = value;
                newItemsSource.onChangeNotify(this);
            }
        }
        else if (property == ComboBox_1.selectedItemProperty) {
            if (this._selectElement != null && this._elements != null)
                this._selectElement.selectedIndex = value == null ? -1 : this._elements.indexOf(value);
        }
        else if (property == ComboBox_1.selectedValueProperty) {
            if (this._selectElement != null && this.selectMember != null && this._elements != null)
                this.selectedItem = this._elements.firstOrDefault(_ => _[this.selectMember] == value, null);
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    setupItems() {
        var selectElement = this._selectElement;
        if (selectElement == null)
            return;
        while (selectElement.firstElementChild != null)
            selectElement.removeChild(selectElement.firstElementChild);
        var displayMember = this.displayMember;
        var itemsSource = this.itemsSource;
        if (itemsSource != null) {
            var elements = null;
            if (Object.prototype.toString.call(itemsSource) == '[object Array]')
                elements = itemsSource;
            else
                elements = itemsSource["elements"];
            if (elements == null)
                throw new Error("Unable to get list of elements from itemsSource");
            elements.forEach(el => {
                var option = document.createElement("option");
                option.innerHTML = (displayMember != null) ? el[displayMember] : el;
                if (selectElement != null)
                    selectElement.appendChild(option);
            });
            //point local _elements variable to itemsource cast
            this._elements = elements;
            var selectedItem = this.selectedItem;
            if (this.selectMember != null) {
                var selectedValue = this.selectedValue;
                selectedItem = this._elements.firstOrDefault(_ => _[this.selectMember] == selectedValue, null);
            }
            selectElement.selectedIndex = selectedItem == null ? -1 : this._elements.indexOf(selectedItem);
        }
        this.invalidateMeasure();
    }
    onCollectionChanged(collection, added, removed, startRemoveIndex) {
        var selectElement = this._selectElement;
        if (selectElement == null)
            return;
        var displayMember = this.displayMember;
        if (collection == this.itemsSource) {
            //some items were added/removed from itemssouurce
            added.forEach(item => {
                var option = document.createElement("option");
                option.innerHTML = (displayMember != null) ? item[displayMember] : item;
                if (selectElement != null)
                    selectElement.appendChild(option);
            });
            removed.forEach(item => {
                if (selectElement == null)
                    return;
                var elementToRemove = selectElement.children[startRemoveIndex];
                var noneWasSelected = selectElement.selectedIndex == -1;
                selectElement.removeChild(elementToRemove);
                if (noneWasSelected)
                    //removeChild reset selected index to 0 if no item was selected, so restore previous selected index
                    selectElement.selectedIndex = -1;
                if (item == this.selectedItem)
                    this.selectedItem = this.selectedValue = null;
                startRemoveIndex++;
            });
        }
        this.invalidateMeasure();
    }
    get itemsSource() {
        return this.getValue(ComboBox_1.itemsSourceProperty);
    }
    set itemsSource(value) {
        this.setValue(ComboBox_1.itemsSourceProperty, value);
    }
    get selectedItem() {
        return this.getValue(ComboBox_1.selectedItemProperty);
    }
    set selectedItem(value) {
        this.setValue(ComboBox_1.selectedItemProperty, value);
    }
    get displayMember() {
        return this.getValue(ComboBox_1.displayMemberProperty);
    }
    set displayMember(value) {
        this.setValue(ComboBox_1.displayMemberProperty, value);
    }
    get selectedValue() {
        return this.getValue(ComboBox_1.selectedValueProperty);
    }
    set selectedValue(value) {
        this.setValue(ComboBox_1.selectedValueProperty, value);
    }
    get selectMember() {
        return this.getValue(ComboBox_1.selectMemberProperty);
    }
    set selectMember(value) {
        this.setValue(ComboBox_1.selectMemberProperty, value);
    }
};
//itemsSource property
ComboBox.itemsSourceProperty = _2.DependencyObject.registerProperty(ComboBox_1, "ItemsSource", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
//selectedItem property
ComboBox.selectedItemProperty = _2.DependencyObject.registerProperty(ComboBox_1, "SelectedItem", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
//displayMember property
ComboBox.displayMemberProperty = _2.DependencyObject.registerProperty(ComboBox_1, "DisplayMember", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
//selectValue property
ComboBox.selectedValueProperty = _2.DependencyObject.registerProperty(ComboBox_1, "SelectedValue", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
//selectMember property
ComboBox.selectMemberProperty = _2.DependencyObject.registerProperty(ComboBox_1, "SelectMember", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
ComboBox = ComboBox_1 = __decorate([
    _2.TypeId("ovuse.controls.ComboBox")
], ComboBox);
exports.ComboBox = ComboBox;
var ComboBox_1;
