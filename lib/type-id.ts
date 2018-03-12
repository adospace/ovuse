import { DependencyObject } from ".";

const typeIdKey : string = "__typeId";

export function typeId(name: string) {
    return (constructor: any) => {
        constructor.prototype[typeIdKey] = name;

        DependencyObject.finalizePropertyRegistrations(constructor);
    }
}

export function getObjectTypeId(obj: any) : string {
    return obj[typeIdKey];
}


export function getTypeId(type: any) : string {
    return type.prototype[typeIdKey];
}

