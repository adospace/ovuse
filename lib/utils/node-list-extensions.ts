
export {}

declare global {
    export interface NodeList {
        firstOrDefault(callback: (item: Node, index: number) => boolean, defaultValue: Node | null): Node;
        where(callback: (item: Node, index: number) => boolean): Node[];
    }
}

if (!NodeList.prototype.firstOrDefault) {
    NodeList.prototype.firstOrDefault = function (callback: (item : Node, index: number) => boolean, defaultValue : Node) {
        var nodeList = <NodeList>this;
        for (var i = 0; i < nodeList.length; ++i) {
            var item = nodeList[i];
            if (callback(item, i))
                return item;
        }
        return defaultValue;        
    }
}
if (!NodeList.prototype.where) {
    NodeList.prototype.where = function (callback: (item: Node, index: number) => boolean) {
        var nodeList = <NodeList>this;
        var res = new Array<Node>();
        for (var i = 0; i < nodeList.length; ++i) {
            var item = nodeList[i];
            if (callback(item, i))
                res.push(item);
        }
        return res;
    }
}