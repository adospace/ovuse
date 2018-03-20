"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(executeHandler, canExecuteHandler) {
        this.executeHandler = executeHandler;
        this.canExecuteHandler = canExecuteHandler;
        this.handlers = [];
    }
    canExecute(parameter) {
        if (this.executeHandler == null)
            return false;
        if (this.canExecuteHandler != null)
            return this.canExecuteHandler(this, parameter);
        return true;
    }
    execute(parameter) {
        if (this.executeHandler != null &&
            this.canExecute(parameter))
            this.executeHandler(this, parameter);
    }
    //subscribe to command canExecute change events
    onCanExecuteChangeNotify(handler) {
        if (this.handlers.indexOf(handler) == -1)
            this.handlers.push(handler);
    }
    //unsubscribe to command canExecute change events
    offCanExecuteChangeNotify(handler) {
        var index = this.handlers.indexOf(handler, 0);
        if (index != -1) {
            this.handlers.splice(index, 1);
        }
    }
    canExecuteChanged() {
        this.handlers.slice(0).forEach((h) => {
            h.onCommandCanExecuteChanged(this);
        });
    }
}
exports.Command = Command;
