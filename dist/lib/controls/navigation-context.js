"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationContext = /** @class */ (function () {
    function NavigationContext(previousPage, previousUri, nextPage, nextUri, queryString) {
        this.previousPage = previousPage;
        this.previousUri = previousUri;
        this.nextPage = nextPage;
        this.nextUri = nextUri;
        this.queryString = queryString;
        this.cancel = false;
        this.returnUri = null;
    }
    return NavigationContext;
}());
exports.NavigationContext = NavigationContext;
