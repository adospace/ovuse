"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!Number.prototype.isEpsilon) {
    Number.prototype.isEpsilon = function () {
        return Math.abs(this) < 1e-10;
    };
}
Number.prototype.isCloseTo = function (other) {
    if (!isFinite(other) && !isFinite(this))
        return true;
    return Math.abs(this - other) < 1e-10;
};
Number.prototype.minMax = function (min, max) {
    return Math.max(min, Math.min(this, max));
};
Number.prototype.isLessThen = function (other) {
    return (this - other) < 1e-10;
};
Number.prototype.isGreaterThen = function (other) {
    return (this - other) > 1e-10;
};
