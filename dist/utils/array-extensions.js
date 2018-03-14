"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (callback, defaultValue) {
        var arrayOfItems = this;
        for (var i = 0; i < arrayOfItems.length; ++i) {
            var item = arrayOfItems[i];
            if (callback(item, i))
                return item;
        }
        return defaultValue;
    };
}
