import { ISupportCollectionChanged } from './contracts';
export declare class ObservableCollection<T> {
    constructor(elements?: Array<T>);
    elements: T[];
    toArray(): T[];
    add(element: T): T;
    remove(element: T): void;
    at(index: number): T;
    first(): T;
    last(): T;
    readonly count: number;
    forEach(action: (value: T, index: number, array: T[]) => void): void;
    private pcHandlers;
    onChangeNotify(handler: ISupportCollectionChanged): void;
    offChangeNotify(handler: ISupportCollectionChanged): void;
}
