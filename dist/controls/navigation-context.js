"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NavigationContext {
    constructor(previousPage, previousUri, nextPage, nextUri, queryString) {
        this.previousPage = previousPage;
        this.previousUri = previousUri;
        this.nextPage = nextPage;
        this.nextUri = nextUri;
        this.queryString = queryString;
        this.cancel = false;
        this.returnUri = null;
    }
}
exports.NavigationContext = NavigationContext;
