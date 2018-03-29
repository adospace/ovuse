import { Panel, Size } from '.';
import { DependencyObject, DependencyProperty, ObservableCollection } from '..';
import { ISupportCollectionChanged } from '../contracts';
export declare enum GridUnitType {
    Auto = 0,
    Pixel = 1,
    Star = 2,
}
export declare class GridLength {
    constructor(value: number, type?: GridUnitType);
    static parseString(value: string): {
        length: GridLength;
        min?: number;
        max?: number;
    }[];
    static fromString(value: string): GridLength;
    private _value;
    readonly value: number;
    private _type;
    readonly type: GridUnitType;
    readonly isAuto: boolean;
    readonly isFixed: boolean;
    readonly isStar: boolean;
}
export declare class GridRow {
    height: GridLength;
    minHeight: number;
    maxHeight: number;
    constructor(height?: GridLength, minHeight?: number, maxHeight?: number);
}
export declare class GridColumn {
    width: GridLength;
    minWidth: number;
    maxWidth: number;
    constructor(width?: GridLength, minWidth?: number, maxWidth?: number);
}
export declare class Grid extends Panel implements ISupportCollectionChanged {
    private _rowDefs;
    private _columnDefs;
    private _elementDefs;
    private _lastDesiredSize;
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    getRowFinalHeight(rowIndex: number): number;
    getColumnFinalWidth(colIndex: number): number;
    static rowsProperty: DependencyProperty;
    rows: ObservableCollection<GridRow>;
    getRows(): ObservableCollection<GridRow>;
    private static rowsFromString(rows);
    static columnsProperty: DependencyProperty;
    columns: ObservableCollection<GridColumn>;
    getColumns(): ObservableCollection<GridColumn>;
    private static columnsFromString(columns);
    onCollectionChanged(collection: any, added: Object[], removed: Object[], startRemoveIndex: number): void;
    static rowProperty: DependencyProperty;
    static getRow(target: DependencyObject): number;
    static setRow(target: DependencyObject, value: number): void;
    static columnProperty: DependencyProperty;
    static getColumn(target: DependencyObject): number;
    static setColumn(target: DependencyObject, value: number): void;
    private static fromString(value);
    static rowSpanProperty: DependencyProperty;
    static getRowSpan(target: DependencyObject): number;
    static setRowSpan(target: DependencyObject, value: number): void;
    static columnSpanProperty: DependencyProperty;
    static getColumnSpan(target: DependencyObject): number;
    static setColumnSpan(target: DependencyObject, value: number): void;
    private static spanFromString(value);
}
