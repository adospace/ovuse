"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector.prototype, "isEmpty", {
        get: function () {
            return this.x == 0 && this.x == 0;
        },
        enumerable: true,
        configurable: true
    });
    Vector.prototype.add = function (other) {
        return new Vector(this.x + other.x, this.y + other.y);
    };
    return Vector;
}());
exports.Vector = Vector;
var Size = /** @class */ (function () {
    function Size(width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.width = width;
        this.height = height;
    }
    Size.prototype.toRect = function () {
        return new Rect(0, 0, this.width, this.height);
    };
    return Size;
}());
exports.Size = Size;
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rect.prototype, "size", {
        get: function () {
            return new Size(this.width, this.height);
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
}());
exports.Rect = Rect;
var Thickness = /** @class */ (function () {
    function Thickness(left, top, right, bottom) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    Thickness.fromString = function (v) {
        var vTrim = v.trim();
        var tokens = v.split(",");
        if (tokens.length == 1) {
            var sameLen = parseFloat(tokens[0]);
            return new Thickness(sameLen, sameLen, sameLen, sameLen);
        }
        if (tokens.length == 2) {
            var sameLeftRight = parseFloat(tokens[0]);
            var sameTopBottom = parseFloat(tokens[1]);
            return new Thickness(sameLeftRight, sameTopBottom, sameLeftRight, sameTopBottom);
        }
        if (tokens.length == 4) {
            return new Thickness(parseFloat(tokens[0]), parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
        }
        throw new Error("Thickness format error");
    };
    Object.defineProperty(Thickness.prototype, "isSameWidth", {
        get: function () {
            return this.left == this.top && this.left == this.right && this.right == this.bottom;
        },
        enumerable: true,
        configurable: true
    });
    return Thickness;
}());
exports.Thickness = Thickness;
