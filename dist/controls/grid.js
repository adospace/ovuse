"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
var GridUnitType;
(function (GridUnitType) {
    /// The value indicates that content should be calculated without constraints. 
    GridUnitType[GridUnitType["Auto"] = 0] = "Auto";
    /// The value is expressed as a pixel.
    GridUnitType[GridUnitType["Pixel"] = 1] = "Pixel";
    /// The value is expressed as a weighted proportion of available space.
    GridUnitType[GridUnitType["Star"] = 2] = "Star";
})(GridUnitType = exports.GridUnitType || (exports.GridUnitType = {}));
class GridLength {
    constructor(value, type = GridUnitType.Pixel) {
        if (value.isCloseTo(0))
            value = 0;
        this._value = value;
        this._type = type;
    }
    static parseString(value) {
        //parse a string in the form of:
        // ([number],){0.1},[*|Auto|number],([number],){0.1} --> min*,[...],max*
        // a string that define a series of row/col definition in the form of ([min len)*,(gridlen value),(max len])*
        //ex:
        //Auto [100,2*,200] [,Auto,2000]
        //defines 3 row/col definition:
        //1) auto row/column
        //2) 2* row/column with min 100 pixel and max 200 pixel
        //3) Auto row/olumn with max 2000 pixel
        //TODO: use a regex instead
        value = value.trim();
        var tokens = value.split(" ");
        return tokens
            .filter((token) => token.trim().length > 0)
            .map((token) => {
            token = token.trim();
            if (token[0] == '[') {
                //Case "[100,*,]" or "[,Auto,200]"
                if (token.length < 3 || token[token.length - 1] != ']')
                    throw new Error("GridLength definition error");
                var subTokens = token.substr(1, token.length - 2).split(",");
                if (subTokens.length == 1)
                    return {
                        length: GridLength.fromString(subTokens[0])
                    };
                else if (subTokens.length == 3) {
                    var minSubToken = subTokens[0].trim();
                    var min = minSubToken.length == 0 ? 0 : parseFloat(minSubToken);
                    var maxSubToken = subTokens[2].trim();
                    var max = maxSubToken.length == 0 ? +Infinity : parseFloat(maxSubToken);
                    return {
                        length: GridLength.fromString(subTokens[1])
                    };
                }
                else
                    throw new Error("GridLength definition error");
            }
            else {
                //case "*" or "Auto" or "12.3"
                return {
                    length: GridLength.fromString(token)
                };
            }
        });
    }
    static fromString(value) {
        if (value == "Auto")
            return new GridLength(1, GridUnitType.Auto);
        if (value.substr(value.length - 1, 1) == "*") {
            var starLen = value.length == 1 ? 1 : parseFloat(value.substr(0, value.length - 1));
            return new GridLength(starLen, GridUnitType.Star);
        }
        return new GridLength(parseFloat(value), GridUnitType.Pixel);
    }
    get value() {
        return this._value;
    }
    get type() {
        return this._type;
    }
    get isAuto() {
        return this._type == GridUnitType.Auto;
    }
    get isFixed() {
        return this._type == GridUnitType.Pixel;
    }
    get isStar() {
        return this._type == GridUnitType.Star;
    }
}
exports.GridLength = GridLength;
class GridRow {
    constructor(height = new GridLength(1, GridUnitType.Star), minHeight = 0, maxHeight = +Infinity) {
        this.height = height;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
    }
}
exports.GridRow = GridRow;
class GridColumn {
    constructor(width = new GridLength(1, GridUnitType.Star), minWidth = 0, maxWidth = +Infinity) {
        this.width = width;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
    }
}
exports.GridColumn = GridColumn;
class RowDef {
    constructor(row, index, vSizeToContent) {
        this.row = row;
        this.index = index;
        this.availHeight = Infinity;
        this._desHeight = 0;
        this._finalHeight = 0;
        this.elements = [];
        this._isAuto = this.row.height.isAuto || (vSizeToContent && this.row.height.isStar);
        this._isStar = this.row.height.isStar && !vSizeToContent;
        this._isFixed = this.row.height.isFixed;
    }
    get desHeight() {
        return this._desHeight;
    }
    set desHeight(newValue) {
        this._desHeight = newValue.minMax(this.row.minHeight, this.row.maxHeight);
    }
    get finalHeight() {
        return this._finalHeight;
    }
    set finalHeight(newValue) {
        this._finalHeight = newValue.minMax(this.row.minHeight, this.row.maxHeight);
    }
    get isAuto() {
        return this._isAuto;
    }
    get isStar() {
        return this._isStar;
    }
    get isFixed() {
        return this._isFixed;
    }
}
class ColumnDef {
    constructor(column, index, hSizeToContent) {
        this.column = column;
        this.index = index;
        this.availWidth = Infinity;
        this._desWidth = 0;
        this._finalWidth = 0;
        this.elements = [];
        this._isAuto = this.column.width.isAuto || (hSizeToContent && this.column.width.isStar);
        this._isStar = this.column.width.isStar && !hSizeToContent;
        this._isFixed = this.column.width.isFixed;
    }
    get desWidth() {
        return this._desWidth;
    }
    set desWidth(newValue) {
        this._desWidth = newValue.minMax(this.column.minWidth, this.column.maxWidth);
    }
    get finalWidth() {
        return this._finalWidth;
    }
    set finalWidth(newValue) {
        this._finalWidth = newValue.minMax(this.column.minWidth, this.column.maxWidth);
    }
    get isAuto() {
        return this._isAuto;
    }
    get isStar() {
        return this._isStar;
    }
    get isFixed() {
        return this._isFixed;
    }
}
class ElementDef {
    constructor(element, row, column, rowSpan, columnSpan) {
        this.element = element;
        this.row = row;
        this.column = column;
        this.rowSpan = rowSpan;
        this.columnSpan = columnSpan;
        this.desWidth = NaN;
        this.desHeight = NaN;
        this.measuredWidthFirstPass = false;
        this.measuredHeightFirstPass = false;
        this.cellTopOffset = 0;
        this.cellLeftOffset = 0;
        this._availWidth = new Array(columnSpan);
        for (var i = 0; i < this._availWidth.length; i++)
            this._availWidth[i] = Infinity;
        this._availHeight = new Array(rowSpan);
        for (var i = 0; i < this._availHeight.length; i++)
            this._availHeight[i] = Infinity;
    }
    getAvailWidth(column) {
        return this._availWidth[column - this.column];
    }
    getAllAvailWidth() {
        let sum = 0;
        for (var i = 0; i < this._availWidth.length; i++) {
            if (!isFinite(this._availWidth[i]))
                return Infinity;
            sum += this._availWidth[i];
        }
        return sum;
    }
    setAvailWidth(column, value) {
        this._availWidth[column - this.column] = value;
    }
    getAvailHeight(row) {
        return this._availHeight[row - this.row];
    }
    getAllAvailHeight() {
        let sum = 0;
        for (var i = 0; i < this._availHeight.length; i++) {
            if (!isFinite(this._availHeight[i]))
                return Infinity;
            sum += this._availHeight[i];
        }
        return sum;
    }
    setAvailHeight(row, value) {
        this._availHeight[row - this.row] = value;
    }
}
let Grid = Grid_1 = class Grid extends _1.Panel {
    constructor() {
        super(...arguments);
        this._rowDefs = null;
        this._columnDefs = null;
        this._elementDefs = null;
        this._lastDesiredSize = new _1.Size();
    }
    measureOverride(constraint) {
        var desideredSize = new _1.Size();
        var hSizeToContent = !isFinite(constraint.width);
        var vSizeToContent = !isFinite(constraint.height);
        var childrenCount = this.children == null ? 0 : this.children.count;
        var rows = this.getRows();
        var columns = this.getColumns();
        this._rowDefs = new Array(Math.max(rows.count, 1));
        this._columnDefs = new Array(Math.max(this.columns.count, 1));
        this._elementDefs = new Array(childrenCount);
        if (rows.count > 0)
            rows.forEach((row, i) => {
                if (this._rowDefs == null)
                    return;
                this._rowDefs[i] = new RowDef(row, i, vSizeToContent);
            });
        else
            this._rowDefs[0] = new RowDef(new GridRow(new GridLength(1, GridUnitType.Star)), 0, vSizeToContent);
        if (columns.count > 0)
            columns.forEach((column, i) => {
                if (this._columnDefs == null)
                    return;
                this._columnDefs[i] = new ColumnDef(column, i, hSizeToContent);
            });
        else
            this._columnDefs[0] = new ColumnDef(new GridColumn(new GridLength(1, GridUnitType.Star)), 0, hSizeToContent);
        for (var iElement = 0; iElement < childrenCount; iElement++) {
            var child = this.children.at(iElement);
            var elRow = Grid_1.getRow(child).minMax(0, this._rowDefs.length - 1);
            var elColumn = Grid_1.getColumn(child).minMax(0, this._columnDefs.length - 1);
            var elRowSpan = Grid_1.getRowSpan(child).minMax(1, this._rowDefs.length - elRow);
            var elColumnSpan = Grid_1.getColumnSpan(child).minMax(1, this._columnDefs.length - elColumn);
            this._elementDefs[iElement] = new ElementDef(child, elRow, elColumn, elRowSpan, elColumnSpan);
            if (elRowSpan == 1) {
                for (var row = elRow; row < elRow + elRowSpan; row++)
                    this._rowDefs[row].elements.push(this._elementDefs[iElement]);
            }
            if (elColumnSpan == 1) {
                for (var col = elColumn; col < elColumn + elColumnSpan; col++)
                    this._columnDefs[col].elements.push(this._elementDefs[iElement]);
            }
        }
        //measure children full contained in auto and fixed size row/column (exclude only children that are fully contained in star w/h cells)
        for (var iRow = 0; iRow < this._rowDefs.length; iRow++) {
            var rowDef = this._rowDefs[iRow];
            var elements = rowDef.elements;
            if (rowDef.isAuto) {
                elements.forEach((el) => el.setAvailHeight(iRow, Infinity));
            }
            else if (rowDef.isFixed) {
                rowDef.desHeight = rowDef.row.height.value;
                elements.forEach((el) => el.setAvailHeight(iRow, rowDef.desHeight));
            }
            else {
                elements.forEach((el) => el.measuredWidthFirstPass = true); //elements in this group can still be measured by the other dimension (width or height)
            }
        }
        for (var iColumn = 0; iColumn < this._columnDefs.length; iColumn++) {
            var columnDef = this._columnDefs[iColumn];
            var elements = columnDef.elements;
            if (columnDef.isAuto) {
                elements.forEach((el) => el.setAvailWidth(iColumn, Infinity));
            }
            else if (columnDef.isFixed) {
                columnDef.desWidth = columnDef.column.width.value;
                elements.forEach((el) => el.setAvailWidth(iColumn, columnDef.desWidth));
            }
            else {
                elements.forEach((el) => el.measuredHeightFirstPass = true); //elements in this group can still be measured by the other dimension (width or height)
            }
        }
        this._elementDefs.forEach((el) => {
            if (!el.measuredHeightFirstPass ||
                !el.measuredWidthFirstPass) {
                el.element.measure(new _1.Size(el.getAllAvailWidth(), el.getAllAvailHeight()));
                if (isNaN(el.desWidth))
                    el.desWidth = el.element.desiredSize == null ? 0 : el.element.desiredSize.width;
                if (isNaN(el.desHeight))
                    el.desHeight = el.element.desiredSize == null ? 0 : el.element.desiredSize.height;
            }
            el.measuredWidthFirstPass = el.measuredHeightFirstPass = true;
        });
        //than get max of any auto/fixed measured row/column
        this._rowDefs.forEach(rowDef => {
            if (!rowDef.isStar)
                rowDef.elements.forEach((el) => rowDef.desHeight = Math.max(rowDef.desHeight, el.element.desiredSize == null ? 0 : el.element.desiredSize.height));
        });
        this._columnDefs.forEach(columnDef => {
            if (!columnDef.isStar)
                columnDef.elements.forEach((el) => columnDef.desWidth = Math.max(columnDef.desWidth, el.element.desiredSize == null ? 0 : el.element.desiredSize.width));
        });
        //now measure any fully contained star size row/column
        var elementToMeasure = [];
        var notStarRowsHeight = 0;
        this._rowDefs.forEach((r) => notStarRowsHeight += r.desHeight);
        var sumRowStars = 0;
        this._rowDefs.forEach(r => { if (r.isStar)
            sumRowStars += r.row.height.value; });
        var vRowMultiplier = (constraint.height - notStarRowsHeight) / sumRowStars;
        this._rowDefs.forEach(rowDef => {
            if (!rowDef.isStar)
                return;
            var elements = rowDef.elements;
            //if size to content horizontally, star rows are treat just like auto rows (same apply to columns of course)
            if (!vSizeToContent) {
                var availHeight = vRowMultiplier * rowDef.row.height.value;
                rowDef.desHeight = availHeight;
                elements.forEach((el) => { el.setAvailHeight(rowDef.index, availHeight); el.measuredHeightFirstPass = false; });
            }
            elementToMeasure.push.apply(elementToMeasure, elements);
        });
        var notStarColumnsHeight = 0;
        this._columnDefs.forEach((c) => notStarColumnsHeight += c.desWidth);
        var sumColumnStars = 0;
        this._columnDefs.forEach(c => { if (c.isStar)
            sumColumnStars += c.column.width.value; });
        var vColumnMultiplier = (constraint.width - notStarColumnsHeight) / sumColumnStars;
        this._columnDefs.forEach(columnDef => {
            if (!columnDef.isStar)
                return;
            var elements = columnDef.elements;
            if (!hSizeToContent) {
                var availWidth = vColumnMultiplier * columnDef.column.width.value;
                columnDef.desWidth = availWidth;
                elements.forEach((el) => { el.setAvailWidth(columnDef.index, availWidth); el.measuredWidthFirstPass = false; });
            }
            elementToMeasure.push.apply(elementToMeasure, elements);
        });
        elementToMeasure.forEach(e => {
            if (!e.measuredHeightFirstPass ||
                !e.measuredWidthFirstPass) {
                e.element.measure(new _1.Size(e.getAllAvailWidth(), e.getAllAvailHeight()));
                e.desWidth = e.element.desiredSize == null ? 0 : e.element.desiredSize.width;
                e.desHeight = e.element.desiredSize == null ? 0 : e.element.desiredSize.height;
                e.measuredWidthFirstPass = true;
                e.measuredHeightFirstPass = true;
            }
        });
        //than adjust width and height to fit children that spans over columns or rows containing auto rows or auto columns
        for (var iElement = 0; iElement < this._elementDefs.length; iElement++) {
            var elementDef = this._elementDefs[iElement];
            if (elementDef.rowSpan > 1) {
                if (this._rowDefs
                    .slice(elementDef.row, elementDef.row + elementDef.rowSpan)
                    .every((v, i, a) => v.isAuto || v.isFixed)) {
                    var concatHeight = 0;
                    this._rowDefs.slice(elementDef.row, elementDef.row + elementDef.rowSpan).forEach((el) => concatHeight += el.desHeight);
                    if (concatHeight < elementDef.desHeight) {
                        var diff = elementDef.desHeight - concatHeight;
                        var autoRows = this._rowDefs.filter(r => r.isAuto);
                        if (autoRows.length > 0) {
                            autoRows.forEach(c => c.desHeight += diff / autoRows.length);
                        }
                        else {
                            var starRows = this._rowDefs.filter(r => r.isStar);
                            if (starRows.length > 0) {
                                starRows.forEach(c => c.desHeight += diff / autoColumns.length);
                            }
                        }
                    }
                    else if (concatHeight > elementDef.desHeight) {
                        elementDef.cellTopOffset = (concatHeight - elementDef.desHeight) / 2;
                    }
                }
            }
            if (elementDef.columnSpan > 1) {
                if (this._columnDefs
                    .slice(elementDef.column, elementDef.column + elementDef.columnSpan)
                    .every((v, i, a) => v.isAuto || v.isFixed)) {
                    var concatWidth = 0;
                    this._columnDefs.slice(elementDef.column, elementDef.column + elementDef.columnSpan).forEach((el) => concatWidth += el.desWidth);
                    if (concatWidth < elementDef.desWidth) {
                        var diff = elementDef.desWidth - concatWidth;
                        var autoColumns = this._columnDefs.filter(c => c.isAuto);
                        if (autoColumns.length > 0) {
                            autoColumns.forEach(c => c.desWidth += diff / autoColumns.length);
                        }
                        else {
                            var starColumns = this._columnDefs.filter(c => c.isStar);
                            if (starColumns.length > 0) {
                                starColumns.forEach(c => c.desWidth += diff / autoColumns.length);
                            }
                        }
                    }
                    else if (concatWidth > elementDef.desWidth) {
                        elementDef.cellLeftOffset = (concatWidth - elementDef.desWidth) / 2;
                    }
                }
            }
        }
        //finally sum up the desidered size
        this._rowDefs.forEach(r => desideredSize.height += r.desHeight);
        this._columnDefs.forEach(c => desideredSize.width += c.desWidth);
        this._lastDesiredSize = desideredSize;
        return desideredSize;
    }
    arrangeOverride(finalSize) {
        //if finalSize != this.desideredSize we have to
        //to correct row/column with star values to take extra space or viceversa
        //remove space no more available from measure pass
        var xDiff = finalSize.width - this._lastDesiredSize.width;
        var yDiff = finalSize.height - this._lastDesiredSize.height;
        //rd.isStar/cd.isStar take in count also sizeToContent stuff
        //we need here only to know if column is star or not
        //this why we are using rd.row.height.isStar or cd.column.width.isStar
        if (this._rowDefs != null && this._columnDefs != null && this._elementDefs != null) {
            var starRowCount = 0;
            this._rowDefs.forEach(rd => {
                if (rd.row.height.isStar)
                    starRowCount++;
            });
            var starColumnCount = 0;
            this._columnDefs.forEach(cd => {
                if (cd.column.width.isStar)
                    starColumnCount++;
            });
            this._rowDefs.forEach(rd => {
                //rd.isStar takes in count also sizeToContent stuff
                //we need here only to know if column is star or not
                if (rd.row.height.isStar)
                    rd.finalHeight = rd.desHeight + yDiff / starRowCount;
                else
                    rd.finalHeight = rd.desHeight;
            });
            this._columnDefs.forEach(cd => {
                if (cd.column.width.isStar)
                    cd.finalWidth = cd.desWidth + xDiff / starColumnCount;
                else
                    cd.finalWidth = cd.desWidth;
            });
            this._elementDefs.forEach(el => {
                if (this._columnDefs == null ||
                    this._rowDefs == null)
                    return;
                let finalLeft = 0;
                this._columnDefs.slice(0, el.column).forEach(c => finalLeft += c.finalWidth);
                let finalWidth = 0;
                this._columnDefs.slice(el.column, el.column + el.columnSpan).forEach(c => finalWidth += c.finalWidth);
                finalWidth -= (el.cellLeftOffset * 2);
                let finalTop = 0;
                this._rowDefs.slice(0, el.row).forEach(c => finalTop += c.finalHeight);
                let finalHeight = 0;
                this._rowDefs.slice(el.row, el.row + el.rowSpan).forEach(r => finalHeight += r.finalHeight);
                finalHeight += (el.cellTopOffset * 2);
                el.element.arrange(new _1.Rect(finalLeft + el.cellLeftOffset, finalTop + el.cellTopOffset, finalWidth, finalHeight));
            });
        }
        return finalSize;
    }
    getRowFinalHeight(rowIndex) {
        if (this._columnDefs == null ||
            this._rowDefs == null)
            throw new Error("Operation not valid in this state!");
        return this._rowDefs[rowIndex].finalHeight;
    }
    getColumnFinalWidth(colIndex) {
        if (this._columnDefs == null ||
            this._rowDefs == null)
            throw new Error("Operation not valid in this state!");
        return this._columnDefs[colIndex].finalWidth;
    }
    get rows() {
        return this.getValue(Grid_1.rowsProperty);
    }
    set rows(value) {
        this.setValue(Grid_1.rowsProperty, value);
    }
    getRows() {
        var rows = this.rows;
        if (rows == null) {
            this.rows = rows = new __1.ObservableCollection();
            rows.onChangeNotify(this);
        }
        return rows;
    }
    static rowsFromString(rows) {
        var listOfRows = new Array();
        GridLength.parseString(rows).forEach((rowDef) => {
            listOfRows.push(new GridRow(rowDef.length, rowDef.min, rowDef.max));
        });
        return new __1.ObservableCollection(listOfRows);
    }
    get columns() {
        return this.getValue(Grid_1.columnsProperty);
    }
    set columns(value) {
        this.setValue(Grid_1.columnsProperty, value);
    }
    getColumns() {
        var columns = this.columns;
        if (columns == null) {
            this.columns = columns = new __1.ObservableCollection();
            columns.onChangeNotify(this);
        }
        return columns;
    }
    static columnsFromString(columns) {
        var listOfColumns = new Array();
        GridLength.parseString(columns).forEach((columnDef) => {
            listOfColumns.push(new GridColumn(columnDef.length, columnDef.min, columnDef.max));
        });
        return new __1.ObservableCollection(listOfColumns);
    }
    onCollectionChanged(collection, added, removed, startRemoveIndex) {
        super.invalidateMeasure();
    }
    static getRow(target) {
        return target.getValue(Grid_1.rowProperty);
    }
    static setRow(target, value) {
        target.setValue(Grid_1.rowProperty, value);
    }
    static getColumn(target) {
        return target.getValue(Grid_1.columnProperty);
    }
    static setColumn(target, value) {
        target.setValue(Grid_1.columnProperty, value);
    }
    static fromString(value) {
        var intValue = parseInt(value);
        if (isNaN(intValue) ||
            !isFinite(intValue))
            return 0;
        return intValue;
    }
    static getRowSpan(target) {
        return target.getValue(Grid_1.rowSpanProperty);
    }
    static setRowSpan(target, value) {
        target.setValue(Grid_1.rowSpanProperty, value);
    }
    static getColumnSpan(target) {
        return target.getValue(Grid_1.columnSpanProperty);
    }
    static setColumnSpan(target, value) {
        target.setValue(Grid_1.columnSpanProperty, value);
    }
    static spanFromString(value) {
        var intValue = parseInt(value);
        if (isNaN(intValue) ||
            !isFinite(intValue))
            return 1;
        return intValue;
    }
};
///Dependency properties
//rows
Grid.rowsProperty = __1.DependencyObject.registerProperty(Grid_1, "Rows", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => Grid_1.rowsFromString(v));
//columns
Grid.columnsProperty = __1.DependencyObject.registerProperty(Grid_1, "Columns", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => Grid_1.columnsFromString(v));
//Grid.Row property
Grid.rowProperty = __1.DependencyObject.registerProperty(Grid_1, "Grid#Row", 0, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => Grid_1.fromString(v));
//Grid.Column property
Grid.columnProperty = __1.DependencyObject.registerProperty(Grid_1, "Grid#Column", 0, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => Grid_1.fromString(v));
//Grid.RowSpan property
Grid.rowSpanProperty = __1.DependencyObject.registerProperty(Grid_1, "Grid#RowSpan", 1, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => Grid_1.spanFromString(v));
//Grid.ColumnSpan property
Grid.columnSpanProperty = __1.DependencyObject.registerProperty(Grid_1, "Grid#ColumnSpan", 1, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => Grid_1.spanFromString(v));
Grid = Grid_1 = __decorate([
    __1.TypeId("ovuse.Controls.Grid")
], Grid);
exports.Grid = Grid;
var Grid_1;
