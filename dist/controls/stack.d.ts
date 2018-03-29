import { Panel, Size } from '.';
import { DependencyProperty } from '..';
export declare enum Orientation {
    Horizontal = 0,
    Vertical = 1,
}
export declare class Stack extends Panel {
    protected measureOverride(constraint: Size): Size;
    protected arrangeOverride(finalSize: Size): Size;
    static orientationProperty: DependencyProperty;
    orientation: Orientation;
}
