import { DependencyObject, InstanceLoader } from ".";
import { hasProperty } from "./utils";

const typeIdKey : string = "__ovuseDependencyObjectId";

export function TypeId(name: string) {
    return (constructor: any) => {
        var typeName = <string>(constructor['name']);
        constructor.prototype[typeIdKey + "_" + typeName] = name;

        DependencyObject.finalizePropertyRegistrations(constructor);
        InstanceLoader.registerType(constructor);
    }
}

export function getObjectTypeId(obj: any) : string {
    var typeName = <string>(obj.constructor['name']);
    return obj[typeIdKey + "_" + typeName];
}

export function getTypeId(type: any) : string {
    var typeName = <string>(type['name']);
    return type.prototype[typeIdKey + "_" + typeName];
}

export function hasTypeId(type: any) : boolean {
    var typeName = <string>(type['name']);
    return hasProperty(type.prototype, typeIdKey + "_" + typeName);
}

