"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var utils_1 = require("./utils");
var DependencyObject = /** @class */ (function () {
    function DependencyObject() {
        this.localPropertyValueMap = {};
        this.dpcHandlers = [];
        this.pcHandlers = [];
        this.bindings = new Array();
    }
    ///Register a dependency property for the object
    DependencyObject.registerProperty = function (typeName, name, defaultValue, options, converter) {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            DependencyObject.globalPropertyMap[typeName] = new _1.PropertyMap();
        var newProperty = new _1.DependencyProperty(name, typeName, defaultValue, options, converter);
        DependencyObject.globalPropertyMap[typeName].register(name, newProperty);
        return newProperty;
    };
    ///Get the dependency property registered with this type of object (or undefined if property doesn't exist on object)
    DependencyObject.getProperty = function (typeName, name) {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return null;
        return DependencyObject.globalPropertyMap[typeName].getProperty(name);
    };
    ///Get only dependency properties registered with this type of object
    DependencyObject.getProperties = function (typeName) {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return null;
        return DependencyObject.globalPropertyMap[typeName].all();
    };
    ///Iterate over all dependency properties registered with this type of object and its ancestors
    DependencyObject.forAllProperties = function (obj, callback) {
        if (obj == undefined)
            throw new Error("obj == undefined");
        //var typeName = <string>obj["typeName"];
        var typeName = _1.componentName(obj);
        var propertiesOfObject = DependencyObject.getProperties(typeName);
        if (propertiesOfObject != undefined)
            propertiesOfObject.forEach(function (_) { return callback(_); });
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return;
        var firstAnchestor = utils_1.getFirstAnchestor(obj);
        if (firstAnchestor != undefined)
            DependencyObject.forAllProperties(firstAnchestor, callback);
    };
    DependencyObject.lookupProperty = function (obj, name) {
        if (obj == undefined)
            throw new Error("obj == undefined");
        //var typeName = <string>obj["typeName"];
        var typeName = _1.componentName(obj);
        var property = DependencyObject.globalPropertyMap[typeName] == undefined ?
            null :
            DependencyObject.globalPropertyMap[typeName].getProperty(name);
        var firstAnchestor = utils_1.getFirstAnchestor(obj);
        if (property == undefined && firstAnchestor != undefined)
            return DependencyObject.lookupProperty(firstAnchestor, name);
        return property;
    };
    //Get property value for this object
    DependencyObject.prototype.getValue = function (property) {
        if (property.name in this.localPropertyValueMap) {
            return this.localPropertyValueMap[property.name];
        }
        return property.getDefaultValue(this);
    };
    //set property value to this object
    DependencyObject.prototype.setValue = function (property, value) {
        var oldValue = this.getValue(property);
        var valueToSet = property.converter != undefined && utils_1.isString(value) ? property.converter(value) : value;
        if (oldValue != valueToSet) {
            this.localPropertyValueMap[property.name] = valueToSet;
            this.onDependencyPropertyChanged(property, valueToSet, oldValue);
        }
    };
    //reset property value to its default
    DependencyObject.prototype.resetValue = function (property) {
        if (property.name in this.localPropertyValueMap) {
            var oldValue = this.getValue(property);
            delete this.localPropertyValueMap[property.name];
            this.onDependencyPropertyChanged(property, undefined, oldValue);
        }
    };
    //Called when a value of a dependency property is changed (manually or by a binding)
    DependencyObject.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
        var _this = this;
        this.dpcHandlers.forEach(function (h) {
            h.onDependencyPropertyChanged(_this, property);
        });
    };
    //subscribe to dep property change events
    DependencyObject.prototype.subscribeDependencyPropertyChanges = function (observer) {
        if (this.dpcHandlers.indexOf(observer) == -1)
            this.dpcHandlers.push(observer);
    };
    //unsubscribe from dep property change events
    DependencyObject.prototype.unsubscribeDependencyPropertyChanges = function (observer) {
        var index = this.dpcHandlers.indexOf(observer, 0);
        if (index != -1) {
            this.dpcHandlers.splice(index, 1);
        }
    };
    //Called when a value of a plain property is changed
    DependencyObject.prototype.onPropertyChanged = function (propertyName, value, oldValue) {
        var _this = this;
        this.pcHandlers.forEach(function (h) {
            h.onChangeProperty(_this, propertyName, value);
        });
    };
    //subscribe to property change events
    DependencyObject.prototype.subscribePropertyChanges = function (observer) {
        if (this.pcHandlers.indexOf(observer) == -1)
            this.pcHandlers.push(observer);
    };
    //unsubscribe from property change events
    DependencyObject.prototype.unsubscribePropertyChanges = function (observer) {
        var index = this.pcHandlers.indexOf(observer, 0);
        if (index != -1) {
            this.pcHandlers.splice(index, 1);
        }
    };
    //bind a property of this object to a source object thru a path
    DependencyObject.prototype.bind = function (property, propertyPath, twoway, source, converter, converterParameter, format) {
        var newBinding = new _1.Binding(this, property, propertyPath, source, twoway, converter, converterParameter, format);
        this.bindings.push(newBinding);
    };
    ///Map of properties for each dependency object
    DependencyObject.globalPropertyMap = {};
    DependencyObject.logBindingTraceToConsole = false;
    return DependencyObject;
}());
exports.DependencyObject = DependencyObject;
