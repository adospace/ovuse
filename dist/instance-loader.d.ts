export declare class InstanceLoader {
    private context;
    constructor(context: any);
    getInstance(typeName: string, ...args: any[]): any;
    private static _typeMap;
    static registerType(type: any): void;
}
