import { DependencyObject } from ".";

const typeIdKey : string = "__DependencyObjectId";

export function DependencyObjectId(name: string) {
    return (constructor: any) => {
        var typeName = <string>(constructor['name']);
        constructor.prototype[typeIdKey + "_" + typeName] = name;

        DependencyObject.finalizePropertyRegistrations(constructor);
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

