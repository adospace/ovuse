import { getTypeId } from ".";

export class InstanceLoader {
    constructor(private context: any) {

    }

    getInstance(typeName: string, ...args: any[]) {

        if (typeName in InstanceLoader._typeMap){
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


    private static _typeMap: { [typeName: string]: any; } = {};
    static registerType(type: any) {
        var typeName = getTypeId(type);
        if (typeName == undefined)
            throw new Error("Unable to register type: have you applied DependencyObjectId decorator?")
        if (typeName in InstanceLoader._typeMap)
            throw new Error("Type '{0}' already registered".format(typeName));

        InstanceLoader._typeMap[typeName] = type;
    }
}