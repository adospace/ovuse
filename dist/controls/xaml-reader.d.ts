export declare class XamlReader {
    namespaceResolver: ((xmlNs: string) => string) | undefined;
    private static DefaultNamespace;
    private instanceLoader;
    constructor(namespaceResolver?: ((xmlNs: string) => string) | undefined);
    private _createdObjectsWithId;
    Parse(lml: string): any;
    resolveNameSpace(xmlns: string | null): string;
    Load(xamlNode: Node): any;
    static compareXml(nodeLeft: Node, nodeRight: Node): boolean;
    private trySetProperty(obj, propertyName, propertyNameSpace, value);
    private static tryCallMethod(obj, methodName, value);
    private static tryParseBinding(value);
}
