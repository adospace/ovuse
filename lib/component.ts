
export function component(name: string) {
    return (constructor: any) => {
        constructor["__componentName"] = name;
    }
}

export function componentName(obj: any) : string {
    return obj.constructor["__componentName"];
}


