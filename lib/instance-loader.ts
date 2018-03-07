
export class InstanceLoader {
    constructor(private context: any) {

    }

    getInstance(name: string, ...args: any[]) {
        //find namespaces if any
        var tokens = name.split(".");
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
}