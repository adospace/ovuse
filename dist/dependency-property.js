"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var DependencyProperty = /** @class */ (function () {
    function DependencyProperty(name, typeName, defaultValue, options, converter) {
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
    DependencyProperty.prototype.overrideDefaultValue = function (typeName, defaultValue) {
        this._defaultValueMap[typeName] = defaultValue;
    };
    //get default value of this property for passed object
    DependencyProperty.prototype.getDefaultValue = function (depObject) {
        //var typeName = depObject["typeName"];
        var typeName = _1.getObjectTypeId(depObject);
        if (typeName in this._defaultValueMap)
            return this._defaultValueMap[typeName];
        return this._defaultValue;
    };
    return DependencyProperty;
}());
exports.DependencyProperty = DependencyProperty;
