import { Page, NavigationContext } from './controls';
import { UriMapping, InstanceLoader } from '.';
export declare class Application {
    constructor();
    private static _current;
    static readonly current: Application;
    private _page;
    page: Page | null;
    private static requestAnimationFrame();
    private static onAnimationFrame();
    private static _beginInvokeActions;
    static beginInvoke(action: () => void): void;
    private _mappings;
    readonly mappings: UriMapping[];
    map(uri: string, mappedUri: string): UriMapping;
    private _currentUri;
    private _returnUri;
    private _cachedPages;
    onBeforeNavigate: ((ctx: NavigationContext) => void) | null;
    onAfterNavigate: ((ctx: NavigationContext) => void) | null;
    navigate(uri?: string, loader?: InstanceLoader): boolean;
    private hashChanged(hash);
}
