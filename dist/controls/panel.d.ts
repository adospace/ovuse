import { UIElement, FrameworkElement, Vector } from '.';
import { DependencyProperty, ObservableCollection } from '..';
import { ISupportCollectionChanged } from '../contracts';
export declare class Panel extends FrameworkElement implements ISupportCollectionChanged {
    protected _divElement: HTMLDivElement | null;
    attachVisualOverride(elementContainer: HTMLElement): void;
    private _children;
    children: ObservableCollection<UIElement>;
    onCollectionChanged(collection: any, added: Object[], removed: Object[], startRemoveIndex: number): void;
    layoutOverride(): void;
    virtualItemCount: number;
    virtualOffset: Vector | null;
    static backgroundProperty: DependencyProperty;
    background: string;
}
