
export interface ISupportCollectionChanged {
    onCollectionChanged(
        collection: any, 
        added: any[], 
        removed: any[], 
        startRemoveIndex: number) : void;
}
