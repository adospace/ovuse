"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controls_1 = require("./controls");
var _1 = require(".");
var Application = /** @class */ (function () {
    function Application() {
        var _this = this;
        this._page = null;
        this._mappings = [];
        //private _navigationStack: NavigationItem[] = new Array<NavigationItem>();
        //private _currentNavigationitem: NavigationItem;
        this._currentUri = null;
        this._returnUri = null;
        this._cachedPages = {};
        this.onBeforeNavigate = null;
        this.onAfterNavigate = null;
        if (Application._current != null)
            throw new Error("Application already initialized");
        Application._current = this;
        // if ("onhashchange" in window) { // event supported?
        window.onhashchange = function (ev) {
            return _this.hashChanged(window.location.hash);
        };
        // }
        // else { // event not supported:
        //     var storedHash = window.location.hash;
        //     window.setInterval(()=> {
        //         if (window.location.hash != storedHash) {
        //             storedHash = window.location.hash;
        //             this.hashChanged(storedHash);
        //         }
        //     }, 100);
        // }         
    }
    Object.defineProperty(Application, "current", {
        //get current application
        get: function () {
            if (Application._current == null)
                Application._current = new Application();
            return Application._current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (page) {
            if (this._page != page) {
                if (this._page != null)
                    this._page.attachVisual(null);
                this._page = page;
                if (this._page != null)
                    this._page.attachVisual(document.body);
                Application.requestAnimationFrame();
            }
        },
        enumerable: true,
        configurable: true
    });
    //Dispatcher Thread
    Application.requestAnimationFrame = function () {
        requestAnimationFrame(Application.onAnimationFrame);
    };
    Application.onAnimationFrame = function () {
        controls_1.LayoutManager.updateLayout();
        Application._beginInvokeActions.forEach(function (action) { action(); });
        Application._beginInvokeActions = [];
        requestAnimationFrame(Application.onAnimationFrame);
    };
    Application.beginInvoke = function (action) {
        Application._beginInvokeActions.push(action);
    };
    Object.defineProperty(Application.prototype, "mappings", {
        get: function () {
            return this._mappings;
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.map = function (uri, mappedUri) {
        var uriMapping = this._mappings.firstOrDefault(function (m) { return m.uri == uri; }, null);
        if (uriMapping == null) {
            uriMapping = new _1.UriMapping(uri, mappedUri);
            this._mappings.push(uriMapping);
        }
        uriMapping.mapping = mappedUri;
        return uriMapping;
    };
    Application.prototype.navigate = function (uri, loader) {
        if (uri == undefined) {
            uri = window.location.hash.length > 0 ?
                window.location.hash.slice(1) : "";
        }
        if (this._currentUri == uri)
            return true;
        var uriMapping = this._mappings.firstOrDefault(function (m) {
            return (uri != undefined) ? m.test(uri) : false;
        }, null);
        if (uriMapping != null && uriMapping.mapping != null) {
            var queryString = uriMapping.resolve(uri);
            var previousPage = this.page;
            var previousUri = this._currentUri;
            var targetPage = null;
            if (uriMapping.mapping in this._cachedPages)
                targetPage = this._cachedPages[uriMapping.mapping];
            else {
                if (loader == null)
                    loader = new _1.InstanceLoader(window);
                targetPage = loader.getInstance(uriMapping.mapping);
                if (targetPage == null) {
                    throw new Error("Unable to navigate to page '{0}'".format(uriMapping.mapping));
                }
            }
            if (targetPage.cachePage) {
                if (!(targetPage.typeName in this._cachedPages))
                    this._cachedPages[uriMapping.mapping] = targetPage;
            }
            if (previousPage == null ||
                previousUri == null)
                return false;
            var navContext = new controls_1.NavigationContext(previousPage, previousUri, targetPage, uri, queryString);
            navContext.returnUri = this._returnUri;
            if (this.onBeforeNavigate != null) {
                var nextUri = navContext.nextUri;
                this.onBeforeNavigate(navContext);
                if (navContext.cancel) {
                    if (previousUri != null &&
                        window.location.hash != "#" + previousUri)
                        window.location.hash = "#" + previousUri;
                    this._returnUri = navContext.returnUri;
                    if (nextUri != navContext.nextUri)
                        this.navigate(navContext.nextUri);
                    return false;
                }
            }
            //this._currentNavigationitem = new NavigationItem(uri);
            //this._navigationStack.push(this._currentNavigationitem);
            this._currentUri = uri;
            this.page = targetPage;
            if (this.page == null) {
                throw new Error("Unable to navigate to page '{0}'".format(uriMapping.mapping));
            }
            this.page.onNavigate(navContext);
            if (window.location.hash != "#" + uri)
                window.location.hash = "#" + uri;
            if (this.onAfterNavigate != null) {
                this.onAfterNavigate(navContext);
            }
        }
        return (uriMapping != null);
    };
    Application.prototype.hashChanged = function (hash) {
        this.navigate(hash.slice(1));
    };
    Application._beginInvokeActions = [];
    return Application;
}());
exports.Application = Application;
