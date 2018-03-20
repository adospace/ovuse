"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class DependencyProperty {
    constructor(name, typeName, defaultValue, options, converter) {
        this.name = name;
        this.typeName = typeName;
        this.options = options;
        this.converter = converter;
        //default value map
        this._defaultValueMap = {};
        this._defaultValue = defaultValue;
        this.options = options;
        this.converter = converter;
    }
    // overrideDefaultValue(typeName: string, defaultValue: any) {
    //     this._defaultValueMap[typeName] = defaultValue;
    // }
    overrideDefaultValue(type, defaultValue) {
        var typeName = _1.getTypeId(type);
        if (typeName == undefined) {
            //throw Error("Unable to get typeId from type");
            _1.DependencyObject.registerPropertyDefaultValue(this, type, defaultValue);
            return;
        }
        this._defaultValueMap[typeName] = defaultValue;
    }
    //get default value of this property for passed object
    getDefaultValue(depObject) {
        //var typeName = depObject["typeName"];
        var typeName = _1.getObjectTypeId(depObject);
        if (typeName in this._defaultValueMap)
            return this._defaultValueMap[typeName];
        return this._defaultValue;
    }
}
exports.DependencyProperty = DependencyProperty;
