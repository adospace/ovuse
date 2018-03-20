"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NavigationContext {
    constructor(nextPage, nextUri, queryString, previousPage = null, previousUri = null) {
        this.nextPage = nextPage;
        this.nextUri = nextUri;
        this.queryString = queryString;
        this.previousPage = previousPage;
        this.previousUri = previousUri;
        this.cancel = false;
        this.returnUri = null;
    }
}
exports.NavigationContext = NavigationContext;
