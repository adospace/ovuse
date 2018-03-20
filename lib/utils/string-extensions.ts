export {}

declare global {
    export interface String {
        format(...replacements: string[]): string;
        toUpperFirstLetter(): string;
        toLowerFirstLetter(): string;
        startsWith(other: string): boolean;
    }
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

if (!String.prototype.toUpperFirstLetter) {
    String.prototype.toUpperFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
}

if (!String.prototype.toLowerFirstLetter) {
    String.prototype.toLowerFirstLetter = function () {
        return this.charAt(0).toLowerCase() + this.slice(1);
    }
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (other : string) {
        return this.lastIndexOf(other, 0) == 0;
    }
}