
export class EventAction {
    constructor(
        public invokeHandler?: { (event: EventAction, parameter: any): void }) {
    }

    invoke(parameter: any) {
        if (this.invokeHandler != null)
            this.invokeHandler(this, parameter);
    }

}