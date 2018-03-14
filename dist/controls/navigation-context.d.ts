import { Page } from '.';
export declare class NavigationContext {
    previousPage: Page;
    previousUri: string;
    nextPage: Page;
    nextUri: string;
    queryString: {};
    constructor(previousPage: Page, previousUri: string, nextPage: Page, nextUri: string, queryString: {});
    cancel: boolean;
    returnUri: string | null;
}
