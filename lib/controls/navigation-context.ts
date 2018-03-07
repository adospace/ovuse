import { Page } from '.'


export class NavigationContext {
    constructor(public previousPage: Page, public previousUri: string, public nextPage: Page, public nextUri: string, public queryString: {}) {

    }

    public cancel: boolean = false;
    public returnUri: string | null = null;
}