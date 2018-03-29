import { Size, Panel } from '.';
import { DependencyProperty, DependencyObject } from '../.';
export declare class Canvas extends Panel {
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    static leftProperty: DependencyProperty;
    static getLeft(target: DependencyObject): number;
    static setLeft(target: DependencyObject, value: number): void;
    static topProperty: DependencyProperty;
    static getTop(target: DependencyObject): number;
    static setTop(target: DependencyObject, value: number): void;
    static rightProperty: DependencyProperty;
    static getRight(target: DependencyObject): number;
    static setRight(target: DependencyObject, value: number): void;
    static bottomProperty: DependencyProperty;
    static getBottom(target: DependencyObject): number;
    static setBottom(target: DependencyObject, value: number): void;
}
