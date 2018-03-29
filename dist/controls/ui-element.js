"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../.");
const _2 = require(".");
const utils_1 = require("../utils");
require("../utils/number-extensions");
require("../utils/string-extensions");
require("../utils/array-extensions");
let UIElement = UIElement_1 = class UIElement extends _1.DependencyObject {
    constructor() {
        // static typeName: string = "layouts.UIElement";
        // get typeName(): string {
        //     return UIElement.typeName;
        // }
        super(...arguments);
        this.desiredSize = null;
        this.renderSize = null;
        ///Measure Pass
        this.previousAvailableSize = null;
        ///Arrange Pass
        this.finalRect = null;
        this.previousFinalRect = null;
        ///Render Pass
        this.relativeOffset = null;
        ///Attach page visual tree (attach to null to remove it from DOM)
        this._visual = null;
        this.measureDirty = true;
        this.arrangeDirty = true;
        this.layoutInvalid = true;
        this._logicalChildren = null;
        // forAllChildrenOfType<T extends UIElement>(elementType : any, action: (element:T) => boolean) : boolean {
        //     var typeName = elementType["typeName"];
        //     if (this._logicalChildren != null) {
        //         for (var i = 0; i < this._logicalChildren.length; i++) {
        //             var child = <T>this._logicalChildren[i];
        //             if (child.typeName == typeName) {
        //                 if (!action(child))
        //                     return false;
        //             }
        //             if (!child.forAllChildrenOfType(elementType, action))
        //                 return false;
        //         }
        //     }
        //     return true;
        // }
        this._parent = null;
        //extended properties are key-value items that loader was unable to assign to element
        //because they didn't not correspond to any property (dependency or native) exposed by element
        this._extendedProperties = [];
    }
    measure(availableSize) {
        if (!this.isVisible) {
            this.desiredSize = new _2.Size();
            this.measureDirty = false;
            return;
        }
        var isCloseToPreviousMeasure = this.previousAvailableSize == null ? false : availableSize.width.isCloseTo(this.previousAvailableSize.width) &&
            availableSize.height.isCloseTo(this.previousAvailableSize.height);
        if (!this.measureDirty && isCloseToPreviousMeasure)
            return;
        this.previousAvailableSize = availableSize;
        var desiredSize = this.measureCore(availableSize);
        if (isNaN(desiredSize.width) ||
            !isFinite(desiredSize.width) ||
            isNaN(desiredSize.height) ||
            !isFinite(desiredSize.height))
            throw new Error("measure pass must return valid size");
        this.desiredSize = this.animateSize(desiredSize);
        this.measureDirty = false;
    }
    measureCore(availableSize) {
        return new _2.Size();
    }
    arrange(finalRect) {
        if (this.measureDirty)
            this.measure(finalRect.size);
        if (!this.isVisible)
            return;
        var isCloseToPreviousArrange = this.previousFinalRect == null ? false :
            finalRect.x.isCloseTo(this.previousFinalRect.x) &&
                finalRect.y.isCloseTo(this.previousFinalRect.y) &&
                finalRect.width.isCloseTo(this.previousFinalRect.width) &&
                finalRect.height.isCloseTo(this.previousFinalRect.height);
        if (!this.arrangeDirty && isCloseToPreviousArrange)
            return;
        this.layoutInvalid = true;
        this.previousFinalRect = finalRect;
        this.arrangeCore(finalRect);
        this.finalRect = finalRect;
        this.arrangeDirty = false;
    }
    arrangeCore(finalRect) {
        this.renderSize = finalRect.size;
    }
    layout(relativeOffset = null) {
        if (this.layoutInvalid) {
            this.relativeOffset = relativeOffset;
            this.layoutOverride();
            if (this._visual != null &&
                this.isVisible)
                //if visual is hidden here means that I just added it hidden to DOM
                //so restore it visible (see attachVisual() below)
                this._visual.style.visibility = "";
            this.layoutInvalid = false;
            var layoutUpdated = this.layoutUpdated;
            if (layoutUpdated != null)
                layoutUpdated.invoke(this);
        }
    }
    layoutOverride() {
        if (this._visual != null) {
            if (this.relativeOffset != null) {
                this._visual.style.marginTop = this.relativeOffset.y.toString() + "px";
                this._visual.style.marginLeft = this.relativeOffset.x.toString() + "px";
            }
        }
    }
    //Animation Pass
    //private _animations: ObservableCollection<Animate>;
    //get animations(): ObservableCollection<Animate> {
    //    return this._animations;
    //}
    //set children(value: ObservableCollection<Animate>) {
    //    if (value == this._animations)
    //        return;
    //    if (this._animations != null) {
    //        //remove handler so that resource can be disposed
    //        this._animations.offChangeNotify(this);
    //    }
    //    this._animations = value;
    //    if (this._animations != null) {
    //        this._animations.onChangeNotify(this);
    //    }
    //    this.invalidateMeasure();
    //}
    //onCollectionChanged(collection: any, added: any[], removed: any[], startRemoveIndex: number) {
    //    this.invalidateMeasure();
    //}
    animateSize(desiredSize) {
        return desiredSize;
    }
    attachVisual(elementContainer, showImmediately = false) {
        //1. if a visual is not yet created and we have a container
        //try create it now
        if (this._visual == null &&
            elementContainer != null)
            this.attachVisualOverride(elementContainer);
        //1.b if a visual doesn't exists but parent set container to null
        //call attachVisualOverride and let derived class handle the case (i.e. Page)
        if (this._visual == null &&
            elementContainer == null)
            this.attachVisualOverride(null);
        //2. if visual is still null we have done
        if (this._visual == null)
            return null;
        //3. if visual is not under container...
        if (elementContainer != this._visual.parentElement) {
            //4. remove visual from old container 
            if (this._visual.parentElement != null) {
                //Note children of this are not removed from DOM
                //for performance reasons, it would take to much to remove any descendants from DOM
                var parentElement = this._visual.parentElement;
                parentElement.removeChild(this._visual);
                //this will notify any children of removal
                this.visualDisconnected(parentElement);
            }
            //5. if container is valid (not null) add visual under it
            //note container could be null in this case visual is just detached from DOM
            if (elementContainer != null) {
                //before add the element to the DOM tree hide to avoid flickering
                //visual will be restored to visible after it's correctly positioned
                //see above layout()
                //NOTE: we use CSS visibility instead of hidden property because with former
                //element size remains valid 
                //http://stackoverflow.com/questions/2345784/jquery-get-height-of-hidden-element-in-jquery
                if (!showImmediately)
                    this._visual.style.visibility = "hidden";
                //makes layout invalid so to restore any render in case element was just removed and readded to tree
                this.invalidateMeasure();
                elementContainer.appendChild(this._visual);
                if (elementContainer != null)
                    this.visualConnected(elementContainer);
            }
        }
        return this._visual;
    }
    get visual() {
        return this._visual;
    }
    attachVisualOverride(elementContainer) {
        if (this._visual == null)
            return;
        //apply extended properties to html element
        this._extendedProperties.forEach(ep => {
            if (this._visual == null)
                return;
            if (ep.name in this._visual)
                utils_1.setPropertyValue(this._visual, ep.name, ep.value);
            else
                utils_1.setPropertyValue(this._visual.style, ep.name, ep.value);
            //this._visual.style[ep.name] = ep.value;
        });
        this._visual.style.visibility = this.isVisible ? "" : "hidden";
        if (this.command != null)
            this._visual.onmousedown = (ev) => this.onMouseDown(ev);
        if (this.popup != null)
            this._visual.onmouseup = (ev) => this.onMouseUp(ev);
        var name = this.id;
        if (this._visual.id != name &&
            name != null)
            this._visual.id = name;
        var className = this.cssClass;
        if (this._visual.className != className &&
            className != null) {
            this._visual.className = className;
        }
        this._visual.style.position = "absolute";
    }
    onMouseDown(ev) {
        var command = this.command;
        var commandParameter = this.commandParameter;
        if (command != null && command.canExecute(commandParameter)) {
            command.execute(commandParameter);
            this.onCommandCanExecuteChanged(command);
            ev.stopPropagation();
        }
    }
    onMouseUp(ev) {
        var popup = this.popup;
        if (popup != null) {
            _2.LayoutManager.showPopup(popup);
            ev.stopPropagation();
            if (this.autoClosePopup) {
                document.addEventListener("mouseup", function () {
                    this.removeEventListener("mouseup", arguments.callee);
                    _2.LayoutManager.closePopup(popup);
                });
            }
        }
    }
    getBoundingClientRect() {
        if (this._visual == null)
            throw new Error("Unable to get bounding rect for element not linked to DOM");
        return this._visual.getBoundingClientRect();
    }
    visualConnected(elementContainer) {
        this.parentVisualConnected(this, elementContainer);
    }
    parentVisualConnected(parent, elementContainer) {
        if (this._logicalChildren == null)
            return;
        this._logicalChildren.forEach(c => c.parentVisualConnected(parent, elementContainer));
    }
    visualDisconnected(elementContainer) {
        this.parentVisualDisconnected(this, elementContainer);
    }
    parentVisualDisconnected(parent, elementContainer) {
        if (this._logicalChildren == null)
            return;
        this._logicalChildren.forEach(c => c.parentVisualDisconnected(parent, elementContainer));
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        //probably this checks as well as relative properties are to be moved down to FrameworkElement
        if (property == UIElement_1.commandProperty) {
            if (oldValue != null) {
                oldValue.offCanExecuteChangeNotify(this);
                if (this._visual != null)
                    this._visual.onmousedown = null;
            }
            if (value != null) {
                value.onCanExecuteChangeNotify(this);
                if (this._visual != null)
                    this._visual.onmousedown = (ev) => this.onMouseDown(ev);
            }
        }
        else if (property == UIElement_1.popupProperty) {
            if (oldValue != null) {
                if (this._visual != null)
                    this._visual.onmouseup = null;
                if (oldValue.parent == this)
                    oldValue.parent = null;
            }
            if (value != null) {
                if (this._visual != null)
                    this._visual.onmouseup = (ev) => this.onMouseUp(ev);
                value.parent = this;
            }
        }
        else if (property == UIElement_1.isVisibleProperty) {
            if (this._visual != null)
                this._visual.style.visibility = value ? "" : "hidden";
        }
        else if (property == UIElement_1.classProperty) {
            var className = this.cssClass;
            if (this._visual != null && this._visual.className != className &&
                className != null) {
                this._visual.className = className;
            }
        }
        var options = property.options;
        if ((options & _2.FrameworkPropertyMetadataOptions.AffectsMeasure) != 0)
            this.invalidateMeasure();
        if ((options & _2.FrameworkPropertyMetadataOptions.AffectsArrange) != 0)
            this.invalidateArrange();
        if ((options & _2.FrameworkPropertyMetadataOptions.AffectsParentMeasure) != 0 && this._parent != null)
            this._parent.invalidateMeasure();
        if ((options & _2.FrameworkPropertyMetadataOptions.AffectsParentArrange) != 0 && this._parent != null)
            this._parent.invalidateArrange();
        if ((options & _2.FrameworkPropertyMetadataOptions.AffectsRender) != 0)
            this.invalidateLayout();
        if ((options & _2.FrameworkPropertyMetadataOptions.Inherits) != 0 && this._logicalChildren != null)
            //foreach child notify property changing event, unfortunately
            //there is not a more efficient way than walk logical tree down to leaves
            this._logicalChildren.forEach((child) => child.onDependencyPropertyChanged(property, value, oldValue));
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    onCommandCanExecuteChanged(command) {
    }
    getValue(property) {
        if (!(property.name in this.localPropertyValueMap)) {
            var options = property.options;
            if (options != null &&
                this._parent != null &&
                (options & _2.FrameworkPropertyMetadataOptions.Inherits) != 0) {
                //search property on parent
                return this._parent.getValue(property);
            }
            //get default
            return property.getDefaultValue(this);
        }
        //there is a local value
        return this.localPropertyValueMap[property.name];
    }
    invalidateMeasure() {
        this.arrangeDirty = true;
        this.layoutInvalid = true;
        if (!this.measureDirty) {
            this.measureDirty = true;
            if (this._parent != null)
                this._parent.invalidateMeasure();
        }
    }
    invalidateArrange() {
        this.layoutInvalid = true;
        if (!this.arrangeDirty) {
            this.arrangeDirty = true;
            if (this._parent != null)
                this._parent.invalidateArrange();
        }
    }
    invalidateLayout() {
        if (!this.layoutInvalid) {
            this.layoutInvalid = true;
            if (this._parent != null)
                this._parent.invalidateLayout();
        }
    }
    findElementByName(name) {
        if (name == this.id)
            return this;
        if (this._logicalChildren != null) {
            for (var i = 0; i < this._logicalChildren.length; i++) {
                let child = this._logicalChildren[i];
                let foundElement = child.findElementByName(name);
                if (foundElement != null)
                    return foundElement;
            }
        }
        return null;
    }
    get parent() {
        return this._parent;
    }
    set parent(newParent) {
        if (this._parent != newParent) {
            var oldParent = this._parent;
            if (oldParent != null && oldParent._logicalChildren != null) {
                var indexOfElement = oldParent._logicalChildren.indexOf(this);
                oldParent._logicalChildren.splice(indexOfElement, 1);
            }
            this._parent = newParent;
            if (newParent != null) {
                if (newParent._logicalChildren == null)
                    newParent._logicalChildren = new Array();
                newParent._logicalChildren.push(this);
                if (this.measureDirty && this._parent != null)
                    this._parent.invalidateMeasure();
            }
            this.notifyInheritsPropertiesChange();
            this.onParentChanged(oldParent, newParent);
        }
    }
    notifyInheritsPropertiesChange() {
        for (let propertyName in this.localPropertyValueMap) {
            var property = _1.DependencyObject.lookupProperty(this, propertyName);
            var options = property == null ? null : property.options;
            if (options != null &&
                (options & _2.FrameworkPropertyMetadataOptions.Inherits) != 0) {
                //if my parent changed I need to notify children to update
                //any binding linked to my properties that has FrameworkPropertyMetadataOptions.Inherits
                //option (most of cases dataContext)
                //there is not a real value change, only a notification to allow binding update
                //so value==oldValue
                //if (this._logicalChildren != null) {
                //    var value = this.getValue(property);
                //    this._logicalChildren.forEach((child) => child.onDependencyPropertyChanged(property, value, value));
                //}
                if (property != null)
                    this.onParentDependencyPropertyChanged(property);
                //if (this._logicalChildren != null) {
                //    this._logicalChildren.forEach((child) => child.onParentDependencyPropertyChanged(property));
                //}
            }
        }
        if (this._parent != null)
            this._parent.notifyInheritsPropertiesChange();
    }
    //function called when a parent property changed 
    //(parent property must have FrameworkPropertyMetadataOptions.Inherits option enabled; most of cases is DataContext property)
    onParentDependencyPropertyChanged(property) {
        if (this._logicalChildren != null) {
            this._logicalChildren.forEach((child) => child.onParentDependencyPropertyChanged(property));
        }
        //just notify subscribers of bindings
        super.onDependencyPropertyChanged(property, null, null);
    }
    onParentChanged(oldParent, newParent) {
    }
    addExtentedProperty(name, value) {
        this._extendedProperties.push(new _2.ExtendedProperty(name, value));
    }
    get isVisible() {
        return this.getValue(UIElement_1.isVisibleProperty);
    }
    set isVisible(value) {
        this.setValue(UIElement_1.isVisibleProperty, value);
    }
    get cssClass() {
        return this.getValue(UIElement_1.classProperty);
    }
    set cssClass(value) {
        this.setValue(UIElement_1.classProperty, value);
    }
    get id() {
        return this.getValue(UIElement_1.idProperty);
    }
    set id(value) {
        this.setValue(UIElement_1.idProperty, value);
    }
    get command() {
        return this.getValue(UIElement_1.commandProperty);
    }
    set command(value) {
        this.setValue(UIElement_1.commandProperty, value);
    }
    get commandParameter() {
        return this.getValue(UIElement_1.commandParameterProperty);
    }
    set commandParameter(value) {
        this.setValue(UIElement_1.commandParameterProperty, value);
    }
    get popup() {
        return this.getValue(UIElement_1.popupProperty);
    }
    set popup(value) {
        this.setValue(UIElement_1.popupProperty, value);
    }
    get autoClosePopup() {
        return this.getValue(UIElement_1.autoClosePopupProperty);
    }
    set autoClosePopup(value) {
        this.setValue(UIElement_1.autoClosePopupProperty, value);
    }
    get layoutUpdated() {
        return this.getValue(UIElement_1.layoutUpdatedProperty);
    }
    set layoutUpdated(value) {
        this.setValue(UIElement_1.layoutUpdatedProperty, value);
    }
};
UIElement.isVisibleProperty = _1.DependencyObject.registerProperty(UIElement_1, "IsVisible", true, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsParentMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
UIElement.classProperty = _1.DependencyObject.registerProperty(UIElement_1, "class", null, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
//name property
UIElement.idProperty = _1.DependencyObject.registerProperty(UIElement_1, "id", "", _2.FrameworkPropertyMetadataOptions.AffectsRender);
UIElement.commandProperty = _1.DependencyObject.registerProperty(UIElement_1, "Command", null, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
UIElement.commandParameterProperty = _1.DependencyObject.registerProperty(UIElement_1, "CommandParameter", null, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
//get or set popup property for the element
UIElement.popupProperty = _1.DependencyObject.registerProperty(UIElement_1, "Popup", null, _2.FrameworkPropertyMetadataOptions.None);
UIElement.autoClosePopupProperty = _1.DependencyObject.registerProperty(UIElement_1, "AutoClosePopup", true, _2.FrameworkPropertyMetadataOptions.None, (value) => {
    if (value == null || (value.toLowerCase() != "true" && value.toLowerCase() != "false"))
        throw new Error("Unable to valuate string '{0}' as boolean".format(value));
    return value.toLowerCase() == "true" ? true : false;
});
UIElement.layoutUpdatedProperty = _1.DependencyObject.registerProperty(UIElement_1, "LayoutUpdated", null, _2.FrameworkPropertyMetadataOptions.None);
UIElement = UIElement_1 = __decorate([
    _1.TypeId("ovuse.controls.UIElement")
], UIElement);
exports.UIElement = UIElement;
var UIElement_1;
