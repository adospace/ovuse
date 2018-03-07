export class UriMapping {
    constructor(public uri: string, mapping: string) {
        this.mapping = mapping;
    }

    private _mapping: string | null = null;
    get mapping(): string | null {
        return this._mapping;
    }
    set mapping(value: string | null) {
        var re = /(\/|\\)/gi;
        if (value != null)
            this._mapping = value.replace(re, '.');
    }

    private static _rxMapping: RegExp = new RegExp("\{([\w\d_&$]+)\}", "gi");

    private _compiled: boolean = false;
    private _compiledUri: RegExp | null = null;
    private _queryStringTokens: string[] = new Array<string>();
    compile() : void {
        if (!this._compiled) {
            ///example:
            ///   /Product/{value1}/{value2}/{value3}
            ///compile in:
            ///   \/Product\/([\w\d_$]+)\/([\w\d_$]+)\/([\w\d_$]+)
            //var re = /\{([\w\d_$]+)\}/gi;
            var re = new RegExp("\\{([\\w\\d_&$-]+)\\}", "gi");
            var s = this.uri;
            var m;
            var rx = this.uri.split("/").join("\\/");

            do {
                m = re.exec(s);
                if (m) {
                    //console.log(m[0], m[1]);
                    rx = rx.replace(m[0], "([\\w\\d_&$-]+)");
                    this._queryStringTokens.push(m[1]);
                }
            } while (m);

            this._compiledUri = new RegExp(rx, "gi");
            this._compiled = true;
        }
    }

    test(uri: string): boolean {
        this.compile();
        if (this._compiledUri == null)
            return false;
        this._compiledUri.lastIndex = 0;
        return this._compiledUri.test(uri);
    }

    resolve(uriToResolve: string): {} {
        this.compile();
        var match;
        var re = this._compiledUri;
        var result = {};
        var i = 0;
        
        if (this._compiledUri == null ||
            re == null)
            return result;

        this._compiledUri.lastIndex = 0;
        var m = re.exec(uriToResolve);
        
        if (m == null)
            return result;
        
        for (var i = 1; i < m.length; i++) {
            (<any>result)[this._queryStringTokens[i - 1]] = m[i];
        }

        return result;
    }
}