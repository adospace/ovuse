
export {}

declare global {
    export interface Number {
        isEpsilon(): boolean;
        isCloseTo(other: number): boolean;
        isLessThen(other: number): boolean;
        isGreaterThen(other: number): boolean;
        isCloseTo(other: number): boolean;
        minMax(min: number, max: number) : number;
    }
}

if (!Number.prototype.isEpsilon) {
    Number.prototype.isEpsilon = function () {
        return Math.abs(<number>this) < 1e-10;
    };
}
Number.prototype.isCloseTo = function (other : number) {
    if (!isFinite(other) && !isFinite(<number>this))
        return true;
    return Math.abs(<number>this - other) < 1e-10;
};
Number.prototype.minMax = function (min: number, max: number) {
    return Math.max(min, Math.min(<number>this, max));
};
Number.prototype.isLessThen = function (other) {
    return (<number>this - other) < 1e-10;
}
Number.prototype.isGreaterThen = function (other) {
    return (<number>this - other) > 1e-10;
}