"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controls_1 = require("./controls");
const _1 = require(".");
const appContainerKey = "__ovuseAppContainer";
function ApplicationElement(name) {
    return (constructor) => {
        var typeName = (constructor['name']);
        constructor.prototype[appContainerKey + "_" + typeName] = name;
    };
}
exports.ApplicationElement = ApplicationElement;
function getApplicationElement(obj) {
    var typeName = (obj.constructor['name']);
    return obj[appContainerKey + "_" + typeName];
}
class Application {
    constructor() {
        this._page = null;
        this._container = null;
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
        window.onhashchange = ev => this.hashChanged(window.location.hash);
    }
    //get current application
    static get current() {
        if (Application._current == null)
            Application._current = new Application();
        return Application._current;
    }
    get page() {
        return this._page;
    }
    set page(page) {
        if (this._page != page) {
            if (this._page != null)
                this._page.attachVisual(null);
            this._page = page;
            if (this._page != null) {
                var container = this.container;
                if (container != null)
                    this._page.attachVisual(container);
                else
                    this._page.attachVisual(document.body);
            }
            Application.requestAnimationFrame();
        }
    }
    get container() {
        if (this._container == null) {
            var containerId = getApplicationElement(this);
            if (containerId != undefined)
                this._container = document.getElementById(containerId);
        }
        return this._container;
    }
    //Dispatcher Thread
    static requestAnimationFrame() {
        if (typeof requestAnimationFrame == 'function')
            requestAnimationFrame(Application.onAnimationFrame);
    }
    static onAnimationFrame() {
        controls_1.LayoutManager.updateLayout();
        Application._beginInvokeActions.forEach((action) => { action(); });
        Application._beginInvokeActions = [];
        requestAnimationFrame(Application.onAnimationFrame);
    }
    static beginInvoke(action) {
        Application._beginInvokeActions.push(action);
    }
    get mappings() {
        return this._mappings;
    }
    map(uri, mappedUri) {
        var uriMapping = this._mappings.firstOrDefault((m) => m.uri == uri, null);
        if (uriMapping == null) {
            uriMapping = new _1.UriMapping(uri, mappedUri);
            this._mappings.push(uriMapping);
        }
        uriMapping.mapping = mappedUri;
        return uriMapping;
    }
    navigate(uri, loader) {
        if (uri == undefined) {
            uri = window.location.hash.length > 0 ?
                window.location.hash.slice(1) : "";
        }
        if (this._currentUri == uri)
            return true;
        var uriMapping = this._mappings.firstOrDefault((m) => (uri != undefined) ? m.test(uri) : false, null);
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
            // if (previousPage == null ||
            //     previousUri == null)
            //     return false;
            var navContext = new controls_1.NavigationContext(targetPage, uri, queryString, previousPage, previousUri);
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
    }
    hashChanged(hash) {
        this.navigate(hash.slice(1));
    }
}
Application._beginInvokeActions = [];
exports.Application = Application;
