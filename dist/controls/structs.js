"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get isEmpty() {
        return this.x == 0 && this.x == 0;
    }
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
}
exports.Vector = Vector;
class Size {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }
    toRect() {
        return new Rect(0, 0, this.width, this.height);
    }
}
exports.Size = Size;
class Rect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    get size() {
        return new Size(this.width, this.height);
    }
}
exports.Rect = Rect;
class Thickness {
    constructor(left = 0, top = 0, right = 0, bottom = 0) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    static fromString(v) {
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
    }
    get isSameWidth() {
        return this.left == this.top && this.left == this.right && this.right == this.bottom;
    }
}
exports.Thickness = Thickness;
class CornerRadius {
    constructor(topleft = 0, topright, bottomright, bottomleft) {
        this.topleft = topleft;
        this.topright = topright;
        this.bottomright = bottomright;
        this.bottomleft = bottomleft;
        if (topright == undefined)
            topright = this.topleft;
        if (bottomright == undefined)
            bottomright = this.topleft;
        if (bottomleft == undefined)
            bottomleft = this.topleft;
    }
}
exports.CornerRadius = CornerRadius;
