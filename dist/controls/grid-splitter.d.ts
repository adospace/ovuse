import { Border } from '.';
export declare class GridSplitter extends Border {
    constructor();
    attachVisualOverride(elementContainer: HTMLElement): void;
    private onSplitterMouseDown(ev);
    private updateCursor();
    private _draggingCurrentPoint;
    private _draggingStartPoint;
    private _draggingVirtualOffset;
    private _draggingVirtualOffsetMin;
    private _draggingVirtualOffsetMax;
    private initializeDrag(ev);
    private onSplitterMouseMove;
    private moveGhost(ev);
    private onSplitterMouseUp;
    private dragSplitter(evX, evY);
}
