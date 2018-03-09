export declare class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    readonly isEmpty: boolean;
    add(other: Vector): Vector;
}
export declare class Size {
    width: number;
    height: number;
    constructor(width?: number, height?: number);
    toRect(): Rect;
}
export declare class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    readonly size: Size;
}
export declare class Thickness {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left?: number, top?: number, right?: number, bottom?: number);
    static fromString(v: string): Thickness;
    readonly isSameWidth: boolean;
}
