"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class InstanceLoader {
    constructor(context) {
        this.context = context;
    }
    getInstance(typeName, ...args) {
        if (typeName in InstanceLoader._typeMap) {
            var instance = InstanceLoader._typeMap[typeName]; //Object.create(InstanceLoader._typeMap[typeName].prototype);
            return new instance();
        }
        //find namespaces if any
        var tokens = typeName.split(".");
        var iterationObject = this.context[tokens[0]];
        if (iterationObject == null)
            return null;
        for (var i = 1; i < tokens.length; i++) {
            iterationObject = iterationObject[tokens[i]];
            if (iterationObject == null)
                return null;
        }
        var instance = Object.create(iterationObject.prototype);
        instance.constructor.apply(instance, args);
        return instance;
    }
    static registerType(type) {
        var typeName = _1.getTypeId(type);
        if (typeName == undefined)
            throw new Error("Unable to register type: have you applied DependencyObjectId decorator?");
        if (typeName in InstanceLoader._typeMap)
            throw new Error("Type '{0}' already registered".format(typeName));
        InstanceLoader._typeMap[typeName] = type;
    }
}
InstanceLoader._typeMap = {};
exports.InstanceLoader = InstanceLoader;
