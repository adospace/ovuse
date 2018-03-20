"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventAction {
    constructor(invokeHandler) {
        this.invokeHandler = invokeHandler;
    }
    invoke(parameter) {
        if (this.invokeHandler != null)
            this.invokeHandler(this, parameter);
    }
}
exports.EventAction = EventAction;
