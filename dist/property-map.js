"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropertyMap {
    constructor() {
        this.propertyMap = {};
    }
    getProperty(name) {
        return this.propertyMap[name];
    }
    all() {
        var keys = Object.keys(this.propertyMap);
        return keys.map(v => this.propertyMap[v]);
    }
    register(name, property) {
        if (this.propertyMap[name] != undefined)
            throw new Error("Property already registered");
        this.propertyMap[name] = property;
    }
}
exports.PropertyMap = PropertyMap;
