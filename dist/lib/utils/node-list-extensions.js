"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!NodeList.prototype.firstOrDefault) {
    NodeList.prototype.firstOrDefault = function (callback, defaultValue) {
        var nodeList = this;
        for (var i = 0; i < nodeList.length; ++i) {
            var item = nodeList[i];
            if (callback(item, i))
                return item;
        }
        return defaultValue;
    };
}
if (!NodeList.prototype.where) {
    NodeList.prototype.where = function (callback) {
        var nodeList = this;
        var res = new Array();
        for (var i = 0; i < nodeList.length; ++i) {
            var item = nodeList[i];
            if (callback(item, i))
                res.push(item);
        }
        return res;
    };
}
