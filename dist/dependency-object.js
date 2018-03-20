"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _2 = require(".");
const utils_1 = require("./utils");
// function getPropertyRegistrationsFromObject(obj: any) : string {
//     return obj[typeIdKey];
// }
// function setPropertiesFromType(type: any) : string {
//     return type.prototype[typeIdKey];
// }
const dpIdKey = "__dpId";
const dpDefaultKey = "__dpDefault";
class DependencyPropertyDefaultValue {
    constructor(dp, defaultValue) {
        this.dp = dp;
        this.defaultValue = defaultValue;
    }
}
class DependencyObject {
    constructor() {
        this.localPropertyValueMap = {};
        this.dpcHandlers = [];
        this.pcHandlers = [];
        this.bindings = new Array();
    }
    static finalizePropertyRegistrations(type) {
        var typeName = _2.getTypeId(type);
        if (typeName == undefined)
            throw new Error("Unable to finalize property registrations for type without DependencyObjectId");
        var depPropertRegistration = type.prototype[dpIdKey];
        if (depPropertRegistration != undefined) {
            if (DependencyObject.globalPropertyMap[typeName] == undefined)
                DependencyObject.globalPropertyMap[typeName] = new _1.PropertyMap();
            depPropertRegistration.forEach(dpReg => {
                dpReg.typeName = typeName;
                DependencyObject.globalPropertyMap[typeName].register(dpReg.name, dpReg);
            });
            type.prototype[dpIdKey] = undefined;
        }
        var depPropertyDefaultValue = type.prototype[dpDefaultKey];
        if (depPropertyDefaultValue != undefined) {
            depPropertyDefaultValue.forEach(dpDefaultValue => {
                dpDefaultValue.dp.overrideDefaultValue(type, dpDefaultValue.defaultValue);
            });
            type.prototype[dpDefaultKey] = undefined;
        }
    }
    static registerPropertyDefaultValue(dependencyProperty, type, defaultValue) {
        var typeName = _2.getTypeId(type);
        if (typeName != undefined)
            throw new Error("Property '{0}' on type '{1}' has already registered a default value".format(dependencyProperty.name, typeName));
        var depPropertyDefaultValue = type.prototype[dpDefaultKey];
        if (depPropertyDefaultValue == undefined)
            type.prototype[dpDefaultKey] = depPropertyDefaultValue = new Array();
        depPropertyDefaultValue.push(new DependencyPropertyDefaultValue(dependencyProperty, defaultValue));
    }
    ///Register a dependency property for the object
    static registerProperty(type, name, defaultValue, options, converter) {
        var typeName = _2.getTypeId(type);
        if (typeName != undefined)
            return DependencyObject.registerPropertyByTypeName(typeName, name, defaultValue, options, converter);
        var depPropertyRegistration = type.prototype[dpIdKey];
        if (depPropertyRegistration == undefined)
            type.prototype[dpIdKey] = depPropertyRegistration = new Array();
        var newProperty = new _1.DependencyProperty(name, undefined, defaultValue, options, converter);
        depPropertyRegistration.push(newProperty);
        return newProperty;
    }
    ///Register a dependency property for the object
    static registerPropertyByTypeName(typeName, name, defaultValue, options, converter) {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            DependencyObject.globalPropertyMap[typeName] = new _1.PropertyMap();
        var newProperty = new _1.DependencyProperty(name, typeName, defaultValue, options, converter);
        DependencyObject.globalPropertyMap[typeName].register(name, newProperty);
        return newProperty;
    }
    ///Get the dependency property registered with this type of object (or undefined if property doesn't exist on object)
    static getProperty(typeName, name) {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return null;
        return DependencyObject.globalPropertyMap[typeName].getProperty(name);
    }
    ///Get only dependency properties registered with this type of object
    static getProperties(typeName) {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return null;
        return DependencyObject.globalPropertyMap[typeName].all();
    }
    ///Iterate over all dependency properties registered with this type of object and its ancestors
    static forAllProperties(obj, callback) {
        if (obj == undefined)
            throw new Error("obj == undefined");
        //var typeName = <string>obj["typeName"];
        var typeName = _2.getObjectTypeId(obj);
        var propertiesOfObject = DependencyObject.getProperties(typeName);
        if (propertiesOfObject != undefined)
            propertiesOfObject.forEach(_ => callback(_));
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return;
        var firstAnchestor = utils_1.getFirstAnchestor(obj);
        if (firstAnchestor != undefined)
            DependencyObject.forAllProperties(firstAnchestor, callback);
    }
    static lookupProperty(obj, name) {
        if (obj == undefined)
            throw new Error("obj == undefined");
        //var typeName = <string>obj["typeName"];
        var typeName = _2.getObjectTypeId(obj);
        var property = DependencyObject.globalPropertyMap[typeName] == undefined ?
            null :
            DependencyObject.globalPropertyMap[typeName].getProperty(name);
        var firstAnchestor = utils_1.getFirstAnchestor(obj);
        if (property == undefined && firstAnchestor != undefined)
            return DependencyObject.lookupProperty(firstAnchestor, name);
        return property;
    }
    //Get property value for this object
    getValue(property) {
        if (property.name in this.localPropertyValueMap) {
            return this.localPropertyValueMap[property.name];
        }
        return property.getDefaultValue(this);
    }
    //set property value to this object
    setValue(property, value) {
        var oldValue = this.getValue(property);
        var valueToSet = property.converter != undefined && utils_1.isString(value) ? property.converter(value) : value;
        if (oldValue != valueToSet) {
            this.localPropertyValueMap[property.name] = valueToSet;
            this.onDependencyPropertyChanged(property, valueToSet, oldValue);
        }
    }
    //reset property value to its default
    resetValue(property) {
        if (property.name in this.localPropertyValueMap) {
            var oldValue = this.getValue(property);
            delete this.localPropertyValueMap[property.name];
            this.onDependencyPropertyChanged(property, undefined, oldValue);
        }
    }
    //Called when a value of a dependency property is changed (manually or by a binding)
    onDependencyPropertyChanged(property, value, oldValue) {
        this.dpcHandlers.forEach((h) => {
            h.onDependencyPropertyChanged(this, property);
        });
    }
    //subscribe to dep property change events
    subscribeDependencyPropertyChanges(observer) {
        if (this.dpcHandlers.indexOf(observer) == -1)
            this.dpcHandlers.push(observer);
    }
    //unsubscribe from dep property change events
    unsubscribeDependencyPropertyChanges(observer) {
        var index = this.dpcHandlers.indexOf(observer, 0);
        if (index != -1) {
            this.dpcHandlers.splice(index, 1);
        }
    }
    //Called when a value of a plain property is changed
    onPropertyChanged(propertyName, value, oldValue) {
        this.pcHandlers.forEach((h) => {
            h.onChangeProperty(this, propertyName, value);
        });
    }
    //subscribe to property change events
    subscribePropertyChanges(observer) {
        if (this.pcHandlers.indexOf(observer) == -1)
            this.pcHandlers.push(observer);
    }
    //unsubscribe from property change events
    unsubscribePropertyChanges(observer) {
        var index = this.pcHandlers.indexOf(observer, 0);
        if (index != -1) {
            this.pcHandlers.splice(index, 1);
        }
    }
    //bind a property of this object to a source object thru a path
    bind(property, propertyPath, twoway, source, converter, converterParameter, format) {
        var newBinding = new _1.Binding(this, property, propertyPath, source, twoway, converter, converterParameter, format);
        this.bindings.push(newBinding);
    }
}
///Map of properties for each dependency object
DependencyObject.globalPropertyMap = {};
DependencyObject.logBindingTraceToConsole = false;
exports.DependencyObject = DependencyObject;
