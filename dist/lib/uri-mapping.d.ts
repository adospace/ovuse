export declare class UriMapping {
    uri: string;
    constructor(uri: string, mapping: string);
    private _mapping;
    mapping: string | null;
    private static _rxMapping;
    private _compiled;
    private _compiledUri;
    private _queryStringTokens;
    compile(): void;
    test(uri: string): boolean;
    resolve(uriToResolve: string): {};
}
