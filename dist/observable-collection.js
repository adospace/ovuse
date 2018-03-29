"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObservableCollection {
    constructor(elements) {
        this.pcHandlers = [];
        this.elements = elements == null ? new Array() : elements;
    }
    toArray() {
        //return underling item list
        return this.elements;
    }
    add(element) {
        if (element == null)
            throw new Error("element null");
        var iElement = this.elements.indexOf(element);
        if (iElement == -1) {
            this.elements.push(element);
            //make a copy of handlers list before invoke functions
            //because this.pcHandlers could be modified by user code
            this.pcHandlers.slice(0).forEach((h) => {
                h.onCollectionChanged(this, [element], [], 0);
            });
            return element;
        }
        return this.elements[iElement];
    }
    remove(element) {
        if (element == null)
            throw new Error("element null");
        var iElement = this.elements.indexOf(element);
        if (iElement != -1) {
            this.elements.splice(iElement, 1);
            //make a copy of handlers list before invoke functions
            //because this.pcHandlers could be modified by user code
            this.pcHandlers.slice(0).forEach((h) => {
                h.onCollectionChanged(this, [], [element], iElement);
            });
        }
    }
    at(index) {
        return this.elements[index];
    }
    first() {
        return this.elements[0];
    }
    last() {
        return this.elements[this.elements.length - 1];
    }
    get count() {
        return this.elements.length;
    }
    forEach(action) {
        this.elements.forEach(action);
    }
    //subscribe to collection changes
    onChangeNotify(handler) {
        if (this.pcHandlers.indexOf(handler) == -1)
            this.pcHandlers.push(handler);
    }
    //unsubscribe from collection changes
    offChangeNotify(handler) {
        var index = this.pcHandlers.indexOf(handler, 0);
        if (index != -1) {
            this.pcHandlers.splice(index, 1);
        }
    }
    clear() {
        while (this.count > 0)
            this.remove(this.at(0));
    }
}
exports.ObservableCollection = ObservableCollection;
