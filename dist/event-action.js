"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventAction = /** @class */ (function () {
    function EventAction(invokeHandler) {
        this.invokeHandler = invokeHandler;
    }
    EventAction.prototype.invoke = function (parameter) {
        if (this.invokeHandler != null)
            this.invokeHandler(this, parameter);
    };
    return EventAction;
}());
exports.EventAction = EventAction;
