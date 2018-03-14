export {  };
declare global  {
    interface NodeList {
        firstOrDefault(callback: (item: Node, index: number) => boolean, defaultValue: Node | null): Node;
        where(callback: (item: Node, index: number) => boolean): Node[];
    }
}
