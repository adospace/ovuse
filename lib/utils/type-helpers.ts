

export function hasProperty(obj: any, propertyName: string) : boolean {
    var proto = obj.__proto__ || obj.constructor.prototype;
    if (proto == "")
        return false;
    return (propertyName in obj) || (propertyName in proto);
}

export function isString(obj: any): boolean {
    return (typeof obj == "string" || obj instanceof String)
}

export function getTypeName(obj: any) : string {
    return obj.constructor.Name;
}

export function getFirstAnchestor(obj: any) : any | undefined {
    return obj["__proto__"];
}

export function getPropertyValue(obj: any, propertyName: string) : any | undefined {
    return obj[propertyName];
}

export function setPropertyValue(obj: any, propertyName: string, value: any) : void {
    obj[propertyName] = value;
}