import { Page } from '.'


export class NavigationContext {
    constructor( 
        public nextPage: Page, 
        public nextUri: string, 
        public queryString: {},
        public previousPage: Page | null = null, 
        public previousUri: string | null = null) {

    }

    public cancel: boolean = false;
    public returnUri: string | null = null;
}