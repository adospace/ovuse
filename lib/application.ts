
import { Page, LayoutManager, NavigationContext } from './controls'

import { UriMapping, InstanceLoader } from '.'

const appContainerKey : string = "__ovuseAppContainer";

export function ApplicationElement(name: string) {
    return (constructor: any) => {
        var typeName = <string>(constructor['name']);
        constructor.prototype[appContainerKey + "_" + typeName] = name;
    }
}

function getApplicationElement(obj: any) : string | undefined {
    var typeName = <string>(obj.constructor['name']);
    return obj[appContainerKey + "_" + typeName];
}

export class Application {
                
    constructor() {
        
        if (Application._current != null)
            throw new Error("Application already initialized");

        Application._current = this;

        window.onhashchange = ev =>
            this.hashChanged(window.location.hash);
       
    }

    //singleton application
    private static _current: Application;
    //get current application
    static get current(): Application {
        if (Application._current == null)
            Application._current = new Application();

        return Application._current;
    }

    private _page: Page | null = null;
    get page(): Page | null {
        return this._page;
    }

    set page(page: Page | null) {
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

    private _container: HTMLElement | null = null;
    
    get container() : HTMLElement | null {
        if (this._container == null){
            var containerId = getApplicationElement(this);
            if (containerId != undefined)
                this._container = document.getElementById(containerId);
        }           

        return this._container;
    }

    //Dispatcher Thread
    private static requestAnimationFrame() {
        if (typeof requestAnimationFrame == 'function')
            requestAnimationFrame(Application.onAnimationFrame);
    }

    private static onAnimationFrame() {
        LayoutManager.updateLayout();
        Application._beginInvokeActions.forEach((action) => { action() });
        Application._beginInvokeActions = [];
        requestAnimationFrame(Application.onAnimationFrame);
    }

    private static _beginInvokeActions: (() => void)[] = [];
    static beginInvoke(action: () => void) {
        Application._beginInvokeActions.push(action);
    }

    private _mappings: UriMapping[] = [];
    get mappings(): UriMapping[] {
        return this._mappings;
    }

    public map(uri: string, mappedUri: string) : UriMapping {
        var uriMapping = this._mappings.firstOrDefault((m) => m.uri == uri, null);
        if (uriMapping == null) {
            uriMapping = new UriMapping(uri, mappedUri);
            this._mappings.push(uriMapping);   
        }

        uriMapping.mapping = mappedUri;

        return uriMapping;
    }

    //private _navigationStack: NavigationItem[] = new Array<NavigationItem>();
    //private _currentNavigationitem: NavigationItem;
    private _currentUri: string | null = null;
    private _returnUri: string | null = null;
    private _cachedPages = {};

    public onBeforeNavigate: ((ctx: NavigationContext) => void) | null = null;
    public onAfterNavigate: ((ctx: NavigationContext) => void) | null = null;

    public navigate(uri?: string, loader?: InstanceLoader): boolean {
        if (uri == undefined) {
            uri = window.location.hash.length > 0 ?
                window.location.hash.slice(1) : "";
        }

        if (this._currentUri == uri)
            return true;

        var uriMapping = this._mappings.firstOrDefault((m) =>
            (uri != undefined) ? m.test(uri) : false, null);

        if (uriMapping != null && uriMapping.mapping != null) {
            var queryString = uriMapping.resolve(uri);

            var previousPage = this.page;
            var previousUri = this._currentUri;                
            var targetPage = null;

            if (uriMapping.mapping in this._cachedPages)
                targetPage = (<any>this._cachedPages)[uriMapping.mapping];
            else {
                if (loader == null)
                    loader = new InstanceLoader(window);

                targetPage = loader.getInstance(uriMapping.mapping);

                if (targetPage == null) {
                    throw new Error("Unable to navigate to page '{0}'".format(uriMapping.mapping));
                }
            }

            if (targetPage.cachePage) {
                if (!(targetPage.typeName in this._cachedPages))
                    (<any>this._cachedPages)[uriMapping.mapping] = targetPage;
            }

            // if (previousPage == null ||
            //     previousUri == null)
            //     return false;

            var navContext = new NavigationContext(
                targetPage,
                uri,
                queryString,
                previousPage,
                previousUri,
                );

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

    private hashChanged(hash: string) {
        this.navigate(hash.slice(1));
    }
}