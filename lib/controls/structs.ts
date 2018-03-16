export class Vector {
    constructor(public x: number = 0, public y: number = 0) {
    }
    get isEmpty(): boolean {
        return this.x == 0 && this.x == 0;
    }
    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }
}

export class Size {
    constructor(public width: number = 0, public height: number = 0) {
    }

    toRect(): Rect {
        return new Rect(0, 0, this.width, this.height);
    }
}

export class Rect {
    constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {
    }
    get size(): Size {
        return new Size(this.width, this.height);
    }
}

export class Thickness
{
    constructor(public left: number = 0, public top: number = 0, public right: number = 0, public bottom: number = 0)
    {
    }

    static fromString(v: string): Thickness {
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

    get isSameWidth(): boolean {
        return this.left == this.top && this.left == this.right && this.right == this.bottom;
    }
}

export class CornerRadius {
    constructor(public topleft: number = 0, public topright?: number, public bottomright?: number, public bottomleft?: number) {
        if (topright == undefined)
            topright = this.topleft;
        if (bottomright == undefined)
            bottomright = this.topleft;
        if (bottomleft == undefined)
            bottomleft = this.topleft;
    }
}