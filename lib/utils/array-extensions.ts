
export {}

declare global {
    interface Array<T> {
        firstOrDefault(callback: (item : T, index : number) => boolean, defaultValue: T | null): T;
    }
}
if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (callback: (item : any, index : number) => boolean, defaultValue) {
        var arrayOfItems = <Array<any>>this;
        for (var i = 0; i < arrayOfItems.length; ++i) {
            var item = arrayOfItems[i];
            if (callback(item, i))
                return item;
        }

        return defaultValue;
    }
}