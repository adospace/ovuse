import { Page } from '.';
export declare class NavigationContext {
    nextPage: Page;
    nextUri: string;
    queryString: {};
    previousPage: Page | null;
    previousUri: string | null;
    constructor(nextPage: Page, nextUri: string, queryString: {}, previousPage?: Page | null, previousUri?: string | null);
    cancel: boolean;
    returnUri: string | null;
}
