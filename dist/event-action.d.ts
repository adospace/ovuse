export declare class EventAction {
    invokeHandler: ((event: EventAction, parameter: any) => void) | undefined;
    constructor(invokeHandler?: ((event: EventAction, parameter: any) => void) | undefined);
    invoke(parameter: any): void;
}
