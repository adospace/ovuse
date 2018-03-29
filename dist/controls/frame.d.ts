import { FrameworkElement, Size } from '.';
import { DependencyProperty } from '../.';
export declare class Frame extends FrameworkElement {
    _frameElement: HTMLFrameElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    protected measureOverride(constraint: Size): Size;
    static sourceProperty: DependencyProperty;
    Source: string;
}
