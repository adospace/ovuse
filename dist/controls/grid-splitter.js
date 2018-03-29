"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
let GridSplitter = GridSplitter_1 = class GridSplitter extends _1.Border {
    constructor() {
        super();
        ///Grid splitter
        this._draggingCurrentPoint = new _1.Vector();
        this._draggingStartPoint = new _1.Vector();
        this._draggingVirtualOffset = new _1.Vector();
        this._draggingVirtualOffsetMin = new _1.Vector();
        this._draggingVirtualOffsetMax = new _1.Vector();
        //private _dragSplitterTimeoutHandle: number;
        this.onSplitterMouseMove = (ev) => {
            if (ev.buttons == 0) {
                document.removeEventListener("mousemove", this.onSplitterMouseMove, false);
                document.removeEventListener("mouseup", this.onSplitterMouseUp, false);
            }
            else
                this.moveGhost(ev);
            ev.stopPropagation();
        };
        this.onSplitterMouseUp = (ev) => {
            //if (ev.target == this._visual) {
            this.moveGhost(ev);
            this.dragSplitter(this._draggingCurrentPoint.x, this._draggingCurrentPoint.y);
            //}
            document.removeEventListener("mousemove", this.onSplitterMouseMove, false);
            document.removeEventListener("mouseup", this.onSplitterMouseUp, false);
            ev.stopPropagation();
        };
        _1.FrameworkElement.classProperty.overrideDefaultValue(GridSplitter_1, "gridSplitter");
    }
    attachVisualOverride(elementContainer) {
        super.attachVisualOverride(elementContainer);
        if (this._visual != null) {
            this._visual.addEventListener("mousedown", (ev) => this.onSplitterMouseDown(ev), true);
            this._visual.tag = this;
            this._visual.onselectstart = function () { return false; };
        }
        this.updateCursor();
    }
    onSplitterMouseDown(ev) {
        this.initializeDrag(ev);
    }
    updateCursor() {
        if (this._visual == null) {
            return;
        }
        if (this.verticalAlignment == _1.VerticalAlignment.Top ||
            this.verticalAlignment == _1.VerticalAlignment.Bottom)
            this._visual.style.cursor = "n-resize";
        else if (this.horizontalAlignment == _1.HorizontalAlignment.Left ||
            this.horizontalAlignment == _1.HorizontalAlignment.Right)
            this._visual.style.cursor = "e-resize";
        else
            this._visual.style.cursor = "";
    }
    initializeDrag(ev) {
        var parentGrid = this.parent;
        if (parentGrid == null)
            return;
        //if element has no layout, returns
        if (this.visualOffset == null)
            return;
        var dragging = false;
        var leftColumnWidth = 0;
        var rightColumnWidth = 0;
        var topRowHeight = 0;
        var bottomRowHeight = 0;
        if (this.verticalAlignment == _1.VerticalAlignment.Top) {
            var thisRowIndex = _1.Grid.getRow(this);
            thisRowIndex = Math.min(thisRowIndex, parentGrid.rows.count - 1);
            dragging = thisRowIndex > 0 && parentGrid.rows.count > 1;
            if (dragging) {
                topRowHeight = parentGrid.getRowFinalHeight(thisRowIndex - 1) - parentGrid.getRows().at(thisRowIndex - 1).minHeight;
                bottomRowHeight = parentGrid.getRowFinalHeight(thisRowIndex) - parentGrid.getRows().at(thisRowIndex).minHeight;
            }
        }
        else if (this.verticalAlignment == _1.VerticalAlignment.Bottom) {
            var thisRowIndex = _1.Grid.getRow(this);
            thisRowIndex = Math.min(thisRowIndex, parentGrid.rows.count - 1);
            dragging = thisRowIndex >= 0 && parentGrid.rows.count > 1;
            if (dragging) {
                topRowHeight = parentGrid.getRowFinalHeight(thisRowIndex) - parentGrid.getRows().at(thisRowIndex).minHeight;
                bottomRowHeight = parentGrid.getRowFinalHeight(thisRowIndex + 1) - parentGrid.getRows().at(thisRowIndex + 1).minHeight;
            }
        }
        else if (this.horizontalAlignment == _1.HorizontalAlignment.Left) {
            var thisColIndex = _1.Grid.getColumn(this);
            thisColIndex = Math.min(thisColIndex, parentGrid.columns.count - 1);
            dragging = thisColIndex > 0 && parentGrid.columns.count > 1;
            if (dragging) {
                leftColumnWidth = parentGrid.getColumnFinalWidth(thisColIndex - 1) - parentGrid.getColumns().at(thisColIndex - 1).minWidth;
                rightColumnWidth = parentGrid.getColumnFinalWidth(thisColIndex) - parentGrid.getColumns().at(thisColIndex).minWidth;
            }
        }
        else if (this.horizontalAlignment == _1.HorizontalAlignment.Right) {
            var thisColIndex = _1.Grid.getColumn(this);
            thisColIndex = Math.min(thisColIndex, parentGrid.columns.count - 1);
            dragging = thisColIndex >= 0 && parentGrid.columns.count > 1;
            if (dragging) {
                leftColumnWidth = parentGrid.getColumnFinalWidth(thisColIndex) - parentGrid.getColumns().at(thisColIndex).minWidth;
                rightColumnWidth = parentGrid.getColumnFinalWidth(thisColIndex + 1) - parentGrid.getColumns().at(thisColIndex + 1).minWidth;
            }
        }
        if (dragging) {
            //register to mouse events
            document.addEventListener("mousemove", this.onSplitterMouseMove, false);
            document.addEventListener("mouseup", this.onSplitterMouseUp, false);
            //calculate starting vectors and min/max values for _draggingCurrentPointX
            this._draggingStartPoint.x = this._draggingCurrentPoint.x = ev.x;
            this._draggingStartPoint.y = this._draggingCurrentPoint.y = ev.y;
            this._draggingVirtualOffset.x = this.visualOffset.x;
            this._draggingVirtualOffset.y = this.visualOffset.y;
            if (this.horizontalAlignment == _1.HorizontalAlignment.Left ||
                this.horizontalAlignment == _1.HorizontalAlignment.Right) {
                this._draggingVirtualOffsetMin.x = this.visualOffset.x - leftColumnWidth;
                this._draggingVirtualOffsetMax.x = this.visualOffset.x + rightColumnWidth;
            }
            else {
                this._draggingVirtualOffsetMin.y = this.visualOffset.y - topRowHeight;
                this._draggingVirtualOffsetMax.y = this.visualOffset.y + bottomRowHeight;
            }
            ev.stopPropagation();
        }
    }
    moveGhost(ev) {
        var evX = ev.x;
        var evY = ev.y;
        if (this.horizontalAlignment == _1.HorizontalAlignment.Right ||
            this.horizontalAlignment == _1.HorizontalAlignment.Left) {
            var evXmax = this._draggingVirtualOffsetMax.x - this._draggingVirtualOffset.x + this._draggingCurrentPoint.x;
            var evXmin = this._draggingVirtualOffsetMin.x - this._draggingVirtualOffset.x + this._draggingCurrentPoint.x;
            if (evX > evXmax)
                evX = evXmax;
            if (evX < evXmin)
                evX = evXmin;
            this._draggingVirtualOffset.x += (evX - this._draggingCurrentPoint.x);
        }
        else {
            var evYmax = this._draggingVirtualOffsetMax.y - this._draggingVirtualOffset.y + this._draggingCurrentPoint.y;
            var evYmin = this._draggingVirtualOffsetMin.y - this._draggingVirtualOffset.y + this._draggingCurrentPoint.y;
            if (evY > evYmax)
                evY = evYmax;
            if (evY < evYmin)
                evY = evYmin;
            this._draggingVirtualOffset.y += (evY - this._draggingCurrentPoint.y);
        }
        if (this.visualOffset != null && this._visual != null) {
            this._visual.style.left = this._draggingVirtualOffset.x.toString() + "px";
            this._visual.style.top = this._draggingVirtualOffset.y.toString() + "px";
        }
        this._draggingCurrentPoint.x = evX;
        this._draggingCurrentPoint.y = evY;
        console.log("this._draggingCurrentPoint.x = ", this._draggingCurrentPoint.x);
        console.log("this._draggingCurrentPoint.y = ", this._draggingCurrentPoint.y);
    }
    dragSplitter(evX, evY) {
        var parentGrid = this.parent;
        if (parentGrid == null)
            return;
        var saveDraggingStartPoint = true;
        if (this.verticalAlignment == _1.VerticalAlignment.Top ||
            this.verticalAlignment == _1.VerticalAlignment.Bottom) {
            var thisRowIndex = _1.Grid.getRow(this);
            thisRowIndex = Math.min(thisRowIndex, parentGrid.rows.count - 1);
            var topRow = parentGrid.rows.elements[this.verticalAlignment == _1.VerticalAlignment.Top ? thisRowIndex - 1 : thisRowIndex];
            var bottomRow = parentGrid.rows.elements[this.verticalAlignment == _1.VerticalAlignment.Top ? thisRowIndex : thisRowIndex + 1];
            if (topRow.height.isAuto || bottomRow.height.isAuto)
                return;
            if (topRow.height.isFixed || bottomRow.height.isFixed) {
                var topRowWasStar = false;
                var bottomRowWasStar = false;
                if (topRow.height.isStar) {
                    var topRowHeight = parentGrid.getRowFinalHeight(this.verticalAlignment == _1.VerticalAlignment.Top ? thisRowIndex - 1 : thisRowIndex);
                    topRow.height = new _1.GridLength(topRowHeight, _1.GridUnitType.Pixel);
                    topRowWasStar = true;
                }
                if (bottomRow.height.isStar) {
                    var bottomRowHeight = parentGrid.getRowFinalHeight(this.verticalAlignment == _1.VerticalAlignment.Top ? thisRowIndex : thisRowIndex + 1);
                    bottomRow.height = new _1.GridLength(bottomRowHeight, _1.GridUnitType.Pixel);
                    bottomRowWasStar = true;
                }
                var maxTopRowHeight = topRow.height.value + bottomRow.height.value; //parentGrid.actualHeight - parentGridFixedRowsHeight;
                var newTopRowHeight = topRow.height.value + (evY - this._draggingStartPoint.y);
                var newBottomRowHeight = bottomRow.height.value - (evY - this._draggingStartPoint.y);
                if (newTopRowHeight.isCloseTo(0))
                    newTopRowHeight = 0;
                if (newTopRowHeight.isCloseTo(maxTopRowHeight))
                    newTopRowHeight = maxTopRowHeight;
                if (newBottomRowHeight.isCloseTo(0))
                    newBottomRowHeight = 0;
                if (newBottomRowHeight.isCloseTo(maxTopRowHeight))
                    newBottomRowHeight = maxTopRowHeight;
                if (newTopRowHeight < 0) {
                    newTopRowHeight = 0;
                    newBottomRowHeight = maxTopRowHeight;
                    this._draggingStartPoint.y += -topRow.height.value;
                    saveDraggingStartPoint = false;
                }
                else if (newTopRowHeight > maxTopRowHeight) {
                    newTopRowHeight = maxTopRowHeight;
                    newBottomRowHeight = 0;
                    this._draggingStartPoint.y += -topRow.height.value + maxTopRowHeight;
                    saveDraggingStartPoint = false;
                }
                topRow.height = new _1.GridLength(newTopRowHeight, _1.GridUnitType.Pixel);
                bottomRow.height = new _1.GridLength(newBottomRowHeight, _1.GridUnitType.Pixel);
                if (bottomRowWasStar || topRowWasStar) {
                    var oldRowWithStarLen = bottomRowWasStar ? bottomRow : topRow;
                    var otherRow = bottomRowWasStar ? topRow : bottomRow;
                    var availTotalHeight = parentGrid.actualHeight;
                    parentGrid.rows.forEach((r, i) => {
                        if (r == otherRow)
                            availTotalHeight -= otherRow.height.value;
                        else if (!r.height.isStar && r != oldRowWithStarLen)
                            availTotalHeight -= parentGrid.getRowFinalHeight(i);
                    });
                    parentGrid.rows.forEach((r, i) => {
                        if (r.height.isStar)
                            r.height = new _1.GridLength(parentGrid.getRowFinalHeight(i) / availTotalHeight, _1.GridUnitType.Star);
                        else if (r == oldRowWithStarLen)
                            r.height = new _1.GridLength(oldRowWithStarLen.height.value / availTotalHeight, _1.GridUnitType.Star);
                    });
                }
                //console.log("topRow=", topRow.height.value);
                //console.log("bottomRow=", bottomRow.height.value);
                //parentGrid.rows.forEach((r, i) => {
                //    console.log("row=", i);
                //    console.log("height=", r.height.value);
                //});
                //console.log("_draggingStartPointY=", this._draggingStartPointY);
                //console.log("ev.y=", ev.y);
                parentGrid.invalidateMeasure();
                //LayoutManager.updateLayout();
            }
            else {
                var sumFinalHeight = this.verticalAlignment == _1.VerticalAlignment.Top ?
                    parentGrid.getRowFinalHeight(thisRowIndex - 1) + parentGrid.getRowFinalHeight(thisRowIndex) :
                    parentGrid.getRowFinalHeight(thisRowIndex) + parentGrid.getRowFinalHeight(thisRowIndex + 1);
                var sumHeight = bottomRow.height.value + topRow.height.value;
                var heightFactor = sumHeight / sumFinalHeight;
                var heightStarDiff = (evY - this._draggingStartPoint.y) * heightFactor;
                var newTopRowHeight = topRow.height.value + heightStarDiff;
                var newBottomRowHeight = bottomRow.height.value - heightStarDiff;
                if (newTopRowHeight.isCloseTo(0))
                    newTopRowHeight = 0;
                if (newTopRowHeight.isCloseTo(sumHeight))
                    newTopRowHeight = sumHeight;
                if (newBottomRowHeight.isCloseTo(sumHeight))
                    newBottomRowHeight = sumHeight;
                if (newBottomRowHeight.isCloseTo(0))
                    newBottomRowHeight = 0;
                if (newTopRowHeight < 0) {
                    heightStarDiff = -topRow.height.value;
                    this._draggingStartPoint.y = (heightStarDiff / heightFactor) + this._draggingStartPoint.y;
                }
                else if (newBottomRowHeight < 0) {
                    heightStarDiff = bottomRow.height.value;
                    this._draggingStartPoint.y = (heightStarDiff / heightFactor) + this._draggingStartPoint.y;
                }
                if (newTopRowHeight < 0 || newBottomRowHeight > sumHeight) {
                    newTopRowHeight = 0;
                    newBottomRowHeight = sumHeight;
                    saveDraggingStartPoint = false;
                }
                else if (newBottomRowHeight < 0 || newTopRowHeight > sumHeight) {
                    newTopRowHeight = sumHeight;
                    newBottomRowHeight = 0;
                    saveDraggingStartPoint = false;
                }
                topRow.height = new _1.GridLength(newTopRowHeight, _1.GridUnitType.Star);
                bottomRow.height = new _1.GridLength(newBottomRowHeight, _1.GridUnitType.Star);
                //console.log("topRow=", topRow.height.value);
                //console.log("bottomRow=", bottomRow.height.value);
                //console.log("_draggingStartPointY=", this._draggingStartPointY);
                //console.log("ev.y=", ev.y);
                parentGrid.invalidateMeasure();
                //LayoutManager.updateLayout();
            }
        }
        else if (this.horizontalAlignment == _1.HorizontalAlignment.Left ||
            this.horizontalAlignment == _1.HorizontalAlignment.Right) {
            var thisColumnIndex = _1.Grid.getColumn(this);
            thisColumnIndex = Math.min(thisColumnIndex, parentGrid.columns.count - 1);
            var leftColumn = parentGrid.columns.elements[this.horizontalAlignment == _1.HorizontalAlignment.Left ? thisColumnIndex - 1 : thisColumnIndex];
            var rightColumn = parentGrid.columns.elements[this.horizontalAlignment == _1.HorizontalAlignment.Left ? thisColumnIndex : thisColumnIndex + 1];
            if (leftColumn.width.isAuto || rightColumn.width.isAuto)
                return;
            if (leftColumn.width.isFixed || rightColumn.width.isFixed) {
                var leftColumnWasStar = false;
                var rightColumnWasStar = false;
                if (leftColumn.width.isStar) {
                    var leftColumnWidth = parentGrid.getColumnFinalWidth(this.horizontalAlignment == _1.HorizontalAlignment.Left ? thisColumnIndex - 1 : thisColumnIndex);
                    leftColumn.width = new _1.GridLength(leftColumnWidth, _1.GridUnitType.Pixel);
                    leftColumnWasStar = true;
                }
                if (rightColumn.width.isStar) {
                    var rightColumnWidth = parentGrid.getColumnFinalWidth(this.horizontalAlignment == _1.HorizontalAlignment.Left ? thisColumnIndex : thisColumnIndex + 1);
                    rightColumn.width = new _1.GridLength(rightColumnWidth, _1.GridUnitType.Pixel);
                    rightColumnWasStar = true;
                }
                var maxBothColumnWidth = leftColumn.width.value + rightColumn.width.value;
                var newLeftColumnWidth = leftColumn.width.value + (evX - this._draggingStartPoint.x);
                var newRightColumnWidth = rightColumn.width.value - (evX - this._draggingStartPoint.x);
                if (newLeftColumnWidth.isCloseTo(0))
                    newLeftColumnWidth = 0;
                if (newLeftColumnWidth.isCloseTo(maxBothColumnWidth))
                    newLeftColumnWidth = maxBothColumnWidth;
                if (newRightColumnWidth.isCloseTo(0))
                    newRightColumnWidth = 0;
                if (newRightColumnWidth.isCloseTo(maxBothColumnWidth))
                    newRightColumnWidth = maxBothColumnWidth;
                if (newLeftColumnWidth < 0) {
                    newLeftColumnWidth = 0;
                    newRightColumnWidth = maxBothColumnWidth;
                    this._draggingStartPoint.x += -leftColumn.width.value;
                    saveDraggingStartPoint = false;
                }
                else if (newLeftColumnWidth > maxBothColumnWidth) {
                    newLeftColumnWidth = maxBothColumnWidth;
                    newRightColumnWidth = 0;
                    this._draggingStartPoint.x += -leftColumn.width.value + maxBothColumnWidth;
                    saveDraggingStartPoint = false;
                }
                leftColumn.width = new _1.GridLength(newLeftColumnWidth, _1.GridUnitType.Pixel);
                rightColumn.width = new _1.GridLength(newRightColumnWidth, _1.GridUnitType.Pixel);
                if (rightColumnWasStar || leftColumnWasStar) {
                    var oldColumnWithStarLen = rightColumnWasStar ? rightColumn : leftColumn;
                    var otherColumn = rightColumnWasStar ? leftColumn : rightColumn;
                    var availTotalWidth = parentGrid.actualWidth;
                    parentGrid.columns.forEach((r, i) => {
                        if (r == otherColumn)
                            availTotalWidth -= otherColumn.width.value;
                        else if (!r.width.isStar && r != oldColumnWithStarLen)
                            availTotalWidth -= parentGrid.getColumnFinalWidth(i);
                    });
                    parentGrid.columns.forEach((r, i) => {
                        if (r.width.isStar)
                            r.width = new _1.GridLength(parentGrid.getColumnFinalWidth(i) / availTotalWidth, _1.GridUnitType.Star);
                        else if (r == oldColumnWithStarLen)
                            r.width = new _1.GridLength(oldColumnWithStarLen.width.value / availTotalWidth, _1.GridUnitType.Star);
                    });
                }
                parentGrid.invalidateMeasure();
                _1.LayoutManager.updateLayout();
            }
            else {
                var sumFinalWidth = this.horizontalAlignment == _1.HorizontalAlignment.Left ?
                    parentGrid.getColumnFinalWidth(thisColumnIndex - 1) + parentGrid.getColumnFinalWidth(thisColumnIndex) :
                    parentGrid.getColumnFinalWidth(thisColumnIndex) + parentGrid.getColumnFinalWidth(thisColumnIndex + 1);
                var sumWidth = rightColumn.width.value + leftColumn.width.value;
                var widthFactor = sumWidth / sumFinalWidth;
                var widthStarDiff = (evX - this._draggingStartPoint.x) * widthFactor;
                var newLeftColumnWidth = leftColumn.width.value + widthStarDiff;
                var newRightColumnWidth = rightColumn.width.value - widthStarDiff;
                if (newLeftColumnWidth.isCloseTo(0))
                    newLeftColumnWidth = 0;
                if (newLeftColumnWidth.isCloseTo(sumWidth))
                    newLeftColumnWidth = sumWidth;
                if (newRightColumnWidth.isCloseTo(sumWidth))
                    newRightColumnWidth = sumWidth;
                if (newRightColumnWidth.isCloseTo(0))
                    newRightColumnWidth = 0;
                if (newLeftColumnWidth < 0) {
                    widthStarDiff = -leftColumn.width.value;
                    this._draggingStartPoint.x = (widthStarDiff / widthFactor) + this._draggingStartPoint.x;
                }
                else if (newRightColumnWidth < 0) {
                    widthStarDiff = rightColumn.width.value;
                    this._draggingStartPoint.x = (widthStarDiff / widthFactor) + this._draggingStartPoint.x;
                }
                if (newLeftColumnWidth < 0 || newRightColumnWidth > sumWidth) {
                    newLeftColumnWidth = 0;
                    newRightColumnWidth = sumWidth;
                    saveDraggingStartPoint = false;
                }
                else if (newRightColumnWidth < 0 || newLeftColumnWidth > sumWidth) {
                    newLeftColumnWidth = sumWidth;
                    newRightColumnWidth = 0;
                    saveDraggingStartPoint = false;
                }
                leftColumn.width = new _1.GridLength(newLeftColumnWidth, _1.GridUnitType.Star);
                rightColumn.width = new _1.GridLength(newRightColumnWidth, _1.GridUnitType.Star);
                parentGrid.invalidateMeasure();
                _1.LayoutManager.updateLayout();
            }
        }
        if (saveDraggingStartPoint) {
            this._draggingStartPoint.x = evX;
            this._draggingStartPoint.y = evY;
        }
    }
};
GridSplitter = GridSplitter_1 = __decorate([
    __1.TypeId("ovuse.Controls.GridSplitter"),
    __metadata("design:paramtypes", [])
], GridSplitter);
exports.GridSplitter = GridSplitter;
var GridSplitter_1;
