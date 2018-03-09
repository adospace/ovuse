"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(executeHandler, canExecuteHandler) {
        this.executeHandler = executeHandler;
        this.canExecuteHandler = canExecuteHandler;
        this.handlers = [];
    }
    Command.prototype.canExecute = function (parameter) {
        if (this.executeHandler == null)
            return false;
        if (this.canExecuteHandler != null)
            return this.canExecuteHandler(this, parameter);
        return true;
    };
    Command.prototype.execute = function (parameter) {
        if (this.executeHandler != null &&
            this.canExecute(parameter))
            this.executeHandler(this, parameter);
    };
    //subscribe to command canExecute change events
    Command.prototype.onCanExecuteChangeNotify = function (handler) {
        if (this.handlers.indexOf(handler) == -1)
            this.handlers.push(handler);
    };
    //unsubscribe to command canExecute change events
    Command.prototype.offCanExecuteChangeNotify = function (handler) {
        var index = this.handlers.indexOf(handler, 0);
        if (index != -1) {
            this.handlers.splice(index, 1);
        }
    };
    Command.prototype.canExecuteChanged = function () {
        var _this = this;
        this.handlers.slice(0).forEach(function (h) {
            h.onCommandCanExecuteChanged(_this);
        });
    };
    return Command;
}());
exports.Command = Command;
