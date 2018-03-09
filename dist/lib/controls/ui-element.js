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
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../.");
var _2 = require(".");
var utils_1 = require("../utils");
var UIElement = /** @class */ (function (_super) {
    __extends(UIElement, _super);
    function UIElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.desiredSize = null;
        _this.renderSize = null;
        ///Measure Pass
        _this.previousAvailableSize = null;
        ///Arrange Pass
        _this.finalRect = null;
        _this.previousFinalRect = null;
        ///Render Pass
        _this.relativeOffset = null;
        ///Attach page visual tree (attach to null to remove it from DOM)
        _this._visual = null;
        _this.measureDirty = true;
        _this.arrangeDirty = true;
        _this.layoutInvalid = true;
        _this._logicalChildren = null;
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
        _this._parent = null;
        //extended properties are key-value items that loader was unable to assign to element
        //because they didn't not correspond to any property (dependency or native) exposed by element
        _this._extendedProperties = [];
        return _this;
    }
    Object.defineProperty(UIElement.prototype, "typeName", {
        get: function () {
            return UIElement.typeName;
        },
        enumerable: true,
        configurable: true
    });
    UIElement.prototype.measure = function (availableSize) {
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
    };
    UIElement.prototype.measureCore = function (availableSize) {
        return new _2.Size();
    };
    UIElement.prototype.arrange = function (finalRect) {
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
    };
    UIElement.prototype.arrangeCore = function (finalRect) {
        this.renderSize = finalRect.size;
    };
    UIElement.prototype.layout = function (relativeOffset) {
        if (relativeOffset === void 0) { relativeOffset = null; }
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
    };
    UIElement.prototype.layoutOverride = function () {
        if (this._visual != null) {
            if (this.relativeOffset != null) {
                this._visual.style.marginTop = this.relativeOffset.y.toString() + "px";
                this._visual.style.marginLeft = this.relativeOffset.x.toString() + "px";
            }
        }
    };
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
    UIElement.prototype.animateSize = function (desiredSize) {
        return desiredSize;
    };
    UIElement.prototype.attachVisual = function (elementContainer, showImmediately) {
        if (showImmediately === void 0) { showImmediately = false; }
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
    };
    Object.defineProperty(UIElement.prototype, "visual", {
        get: function () {
            return this._visual;
        },
        enumerable: true,
        configurable: true
    });
    UIElement.prototype.attachVisualOverride = function (elementContainer) {
        var _this = this;
        if (this._visual == null)
            return;
        //apply extended properties to html element
        this._extendedProperties.forEach(function (ep) {
            if (_this._visual == null)
                return;
            if (ep.name in _this._visual)
                utils_1.setPropertyValue(_this._visual, ep.name, ep.value);
            else
                utils_1.setPropertyValue(_this._visual.style, ep.name, ep.value);
            //this._visual.style[ep.name] = ep.value;
        });
        this._visual.style.visibility = this.isVisible ? "" : "hidden";
        if (this.command != null)
            this._visual.onmousedown = function (ev) { return _this.onMouseDown(ev); };
        if (this.popup != null)
            this._visual.onmouseup = function (ev) { return _this.onMouseUp(ev); };
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
    };
    UIElement.prototype.onMouseDown = function (ev) {
        var command = this.command;
        var commandParameter = this.commandParameter;
        if (command != null && command.canExecute(commandParameter)) {
            command.execute(commandParameter);
            this.onCommandCanExecuteChanged(command);
            ev.stopPropagation();
        }
    };
    UIElement.prototype.onMouseUp = function (ev) {
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
    };
    UIElement.prototype.getBoundingClientRect = function () {
        if (this._visual == null)
            throw new Error("Unable to get bounding rect for element not linked to DOM");
        return this._visual.getBoundingClientRect();
    };
    UIElement.prototype.visualConnected = function (elementContainer) {
        this.parentVisualConnected(this, elementContainer);
    };
    UIElement.prototype.parentVisualConnected = function (parent, elementContainer) {
        if (this._logicalChildren == null)
            return;
        this._logicalChildren.forEach(function (c) { return c.parentVisualConnected(parent, elementContainer); });
    };
    UIElement.prototype.visualDisconnected = function (elementContainer) {
        this.parentVisualDisconnected(this, elementContainer);
    };
    UIElement.prototype.parentVisualDisconnected = function (parent, elementContainer) {
        if (this._logicalChildren == null)
            return;
        this._logicalChildren.forEach(function (c) { return c.parentVisualDisconnected(parent, elementContainer); });
    };
    UIElement.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
        var _this = this;
        //probably this checks as well as relative properties are to be moved down to FrameworkElement
        if (property == UIElement.commandProperty) {
            if (oldValue != null) {
                oldValue.offCanExecuteChangeNotify(this);
                if (this._visual != null)
                    this._visual.onmousedown = null;
            }
            if (value != null) {
                value.onCanExecuteChangeNotify(this);
                if (this._visual != null)
                    this._visual.onmousedown = function (ev) { return _this.onMouseDown(ev); };
            }
        }
        else if (property == UIElement.popupProperty) {
            if (oldValue != null) {
                if (this._visual != null)
                    this._visual.onmouseup = null;
                if (oldValue.parent == this)
                    oldValue.parent = null;
            }
            if (value != null) {
                if (this._visual != null)
                    this._visual.onmouseup = function (ev) { return _this.onMouseUp(ev); };
                value.parent = this;
            }
        }
        else if (property == UIElement.isVisibleProperty) {
            if (this._visual != null)
                this._visual.style.visibility = value ? "" : "hidden";
        }
        else if (property == UIElement.classProperty) {
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
            this._logicalChildren.forEach(function (child) { return child.onDependencyPropertyChanged(property, value, oldValue); });
        _super.prototype.onDependencyPropertyChanged.call(this, property, value, oldValue);
    };
    UIElement.prototype.onCommandCanExecuteChanged = function (command) {
    };
    UIElement.prototype.getValue = function (property) {
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
    };
    UIElement.prototype.invalidateMeasure = function () {
        this.arrangeDirty = true;
        this.layoutInvalid = true;
        if (!this.measureDirty) {
            this.measureDirty = true;
            if (this._parent != null)
                this._parent.invalidateMeasure();
        }
    };
    UIElement.prototype.invalidateArrange = function () {
        this.layoutInvalid = true;
        if (!this.arrangeDirty) {
            this.arrangeDirty = true;
            if (this._parent != null)
                this._parent.invalidateArrange();
        }
    };
    UIElement.prototype.invalidateLayout = function () {
        if (!this.layoutInvalid) {
            this.layoutInvalid = true;
            if (this._parent != null)
                this._parent.invalidateLayout();
        }
    };
    UIElement.prototype.findElementByName = function (name) {
        if (name == this.id)
            return this;
        if (this._logicalChildren != null) {
            for (var i = 0; i < this._logicalChildren.length; i++) {
                var child = this._logicalChildren[i];
                var foundElement = child.findElementByName(name);
                if (foundElement != null)
                    return foundElement;
            }
        }
        return null;
    };
    Object.defineProperty(UIElement.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (newParent) {
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
        },
        enumerable: true,
        configurable: true
    });
    UIElement.prototype.notifyInheritsPropertiesChange = function () {
        for (var propertyName in this.localPropertyValueMap) {
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
    };
    //function called when a parent property changed 
    //(parent property must have FrameworkPropertyMetadataOptions.Inherits option enabled; most of cases is DataContext property)
    UIElement.prototype.onParentDependencyPropertyChanged = function (property) {
        if (this._logicalChildren != null) {
            this._logicalChildren.forEach(function (child) { return child.onParentDependencyPropertyChanged(property); });
        }
        //just notify subscribers of bindings
        _super.prototype.onDependencyPropertyChanged.call(this, property, null, null);
    };
    UIElement.prototype.onParentChanged = function (oldParent, newParent) {
    };
    UIElement.prototype.addExtentedProperty = function (name, value) {
        this._extendedProperties.push(new _2.ExtendedProperty(name, value));
    };
    Object.defineProperty(UIElement.prototype, "isVisible", {
        get: function () {
            return this.getValue(UIElement.isVisibleProperty);
        },
        set: function (value) {
            this.setValue(UIElement.isVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIElement.prototype, "cssClass", {
        get: function () {
            return this.getValue(UIElement.classProperty);
        },
        set: function (value) {
            this.setValue(UIElement.classProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIElement.prototype, "id", {
        get: function () {
            return this.getValue(UIElement.idProperty);
        },
        set: function (value) {
            this.setValue(UIElement.idProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIElement.prototype, "command", {
        get: function () {
            return this.getValue(UIElement.commandProperty);
        },
        set: function (value) {
            this.setValue(UIElement.commandProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIElement.prototype, "commandParameter", {
        get: function () {
            return this.getValue(UIElement.commandParameterProperty);
        },
        set: function (value) {
            this.setValue(UIElement.commandParameterProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIElement.prototype, "popup", {
        get: function () {
            return this.getValue(UIElement.popupProperty);
        },
        set: function (value) {
            this.setValue(UIElement.popupProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIElement.prototype, "autoClosePopup", {
        get: function () {
            return this.getValue(UIElement.autoClosePopupProperty);
        },
        set: function (value) {
            this.setValue(UIElement.autoClosePopupProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIElement.prototype, "layoutUpdated", {
        get: function () {
            return this.getValue(UIElement.layoutUpdatedProperty);
        },
        set: function (value) {
            this.setValue(UIElement.layoutUpdatedProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    UIElement.typeName = "layouts.UIElement";
    UIElement.isVisibleProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "IsVisible", true, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsParentMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
    UIElement.classProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "class", null, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
    //name property
    UIElement.idProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "id", "", _2.FrameworkPropertyMetadataOptions.AffectsRender);
    UIElement.commandProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "Command", null, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
    UIElement.commandParameterProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "CommandParameter", null, _2.FrameworkPropertyMetadataOptions.AffectsMeasure | _2.FrameworkPropertyMetadataOptions.AffectsRender);
    //get or set popup property for the element
    UIElement.popupProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "Popup", null, _2.FrameworkPropertyMetadataOptions.None);
    UIElement.autoClosePopupProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "AutoClosePopup", true, _2.FrameworkPropertyMetadataOptions.None, function (value) {
        if (value == null || (value.toLowerCase() != "true" && value.toLowerCase() != "false"))
            throw new Error("Unable to valuate string '{0}' as boolean".format(value));
        return value.toLowerCase() == "true" ? true : false;
    });
    UIElement.layoutUpdatedProperty = _1.DependencyObject.registerProperty(UIElement.typeName, "LayoutUpdated", null, _2.FrameworkPropertyMetadataOptions.None);
    return UIElement;
}(_1.DependencyObject));
exports.UIElement = UIElement;
