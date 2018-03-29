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
require("../utils/number-extensions");
require("../utils/string-extensions");
require("../utils/array-extensions");
let FrameworkElement = FrameworkElement_1 = class FrameworkElement extends _1.UIElement {
    constructor() {
        super(...arguments);
        this.unclippedDesiredSize = null;
        this.visualOffset = null;
    }
    measureCore(availableSize) {
        var margin = this.margin;
        var marginWidth = margin.left + margin.right;
        var marginHeight = margin.top + margin.bottom;
        var frameworkAvailableSize = new _1.Size(Math.max(availableSize.width - marginWidth, 0), Math.max(availableSize.height - marginHeight, 0));
        var mm = new MinMax(this);
        frameworkAvailableSize.width = Math.max(mm.minWidth, Math.min(frameworkAvailableSize.width, mm.maxWidth));
        frameworkAvailableSize.height = Math.max(mm.minHeight, Math.min(frameworkAvailableSize.height, mm.maxHeight));
        var desideredSize = this.measureOverride(frameworkAvailableSize);
        desideredSize = new _1.Size(Math.max(desideredSize.width, mm.minWidth), Math.max(desideredSize.height, mm.minHeight));
        this.unclippedDesiredSize = desideredSize;
        //var clipped = false;
        if (desideredSize.width > mm.maxWidth) {
            desideredSize.width = mm.maxWidth;
            //clipped = true;
        }
        if (desideredSize.height > mm.maxHeight) {
            desideredSize.height = mm.maxHeight;
            //clipped = true;
        }
        var clippedDesiredWidth = desideredSize.width + marginWidth;
        var clippedDesiredHeight = desideredSize.height + marginHeight;
        if (clippedDesiredWidth > availableSize.width) {
            clippedDesiredWidth = availableSize.width;
            //clipped = true;
        }
        if (clippedDesiredHeight > availableSize.height) {
            clippedDesiredHeight = availableSize.height;
            //clipped = true;
        }
        return new _1.Size(Math.max(0, clippedDesiredWidth), Math.max(0, clippedDesiredHeight));
    }
    measureOverride(availableSize) {
        return new _1.Size();
    }
    arrangeCore(finalRect) {
        var arrangeSize = finalRect.size;
        var margin = this.margin;
        var marginWidth = margin.left + margin.right;
        var marginHeight = margin.top + margin.bottom;
        arrangeSize.width = Math.max(0, arrangeSize.width - marginWidth);
        arrangeSize.height = Math.max(0, arrangeSize.height - marginHeight);
        if (this.unclippedDesiredSize == null)
            return;
        if (arrangeSize.width.isCloseTo(this.unclippedDesiredSize.width) ||
            arrangeSize.width < this.unclippedDesiredSize.width) {
            //this.needClipBounds = true;
            arrangeSize.width = this.unclippedDesiredSize.width;
        }
        if (arrangeSize.height.isCloseTo(this.unclippedDesiredSize.height) ||
            arrangeSize.height < this.unclippedDesiredSize.height) {
            //this.needClipBounds = true;
            arrangeSize.height = this.unclippedDesiredSize.height;
        }
        if (this.horizontalAlignment != _1.HorizontalAlignment.Stretch) {
            arrangeSize.width = this.unclippedDesiredSize.width;
        }
        if (this.verticalAlignment != _1.VerticalAlignment.Stretch) {
            arrangeSize.height = this.unclippedDesiredSize.height;
        }
        var mm = new MinMax(this);
        var effectiveMaxWidth = Math.max(this.unclippedDesiredSize.width, mm.maxWidth);
        if (effectiveMaxWidth.isCloseTo(arrangeSize.width) ||
            effectiveMaxWidth < arrangeSize.width) {
            //this.needClipBounds = true;
            arrangeSize.width = effectiveMaxWidth;
        }
        var effectiveMaxHeight = Math.max(this.unclippedDesiredSize.height, mm.maxHeight);
        if (effectiveMaxHeight.isCloseTo(arrangeSize.height) ||
            effectiveMaxHeight < arrangeSize.height) {
            //this.needClipBounds = true;
            arrangeSize.height = effectiveMaxHeight;
        }
        var oldRenderSize = this.renderSize;
        var innerInkSize = this.arrangeOverride(arrangeSize);
        if (innerInkSize == null)
            throw new Error("arrangeOverride() can't return null");
        this.renderSize = innerInkSize;
        this.setActualWidth(innerInkSize.width);
        this.setActualHeight(innerInkSize.height);
        var clippedInkSize = new _1.Size(Math.min(innerInkSize.width, mm.maxWidth), Math.min(innerInkSize.height, mm.maxHeight));
        var clientSize = new _1.Size(Math.max(0, finalRect.width - marginWidth), Math.max(0, finalRect.height - marginHeight));
        var offset = this.computeAlignmentOffset(clientSize, clippedInkSize);
        offset.x += finalRect.x + margin.left;
        offset.y += finalRect.y + margin.top;
        var oldOffset = this.visualOffset;
        if (oldOffset == null ||
            (!oldOffset.x.isCloseTo(offset.x) || !oldOffset.y.isCloseTo(offset.y)))
            this.visualOffset = offset;
    }
    computeAlignmentOffset(clientSize, inkSize) {
        var offset = new _1.Vector();
        var ha = this.horizontalAlignment;
        var va = this.verticalAlignment;
        if (ha == _1.HorizontalAlignment.Stretch
            && inkSize.width > clientSize.width) {
            ha = _1.HorizontalAlignment.Left;
        }
        if (va == _1.VerticalAlignment.Stretch
            && inkSize.height > clientSize.height) {
            va = _1.VerticalAlignment.Top;
        }
        if (ha == _1.HorizontalAlignment.Center
            || ha == _1.HorizontalAlignment.Stretch) {
            offset.x = (clientSize.width - inkSize.width) * 0.5;
        }
        else if (ha == _1.HorizontalAlignment.Right) {
            offset.x = clientSize.width - inkSize.width;
        }
        else {
            offset.x = 0;
        }
        if (va == _1.VerticalAlignment.Center
            || va == _1.VerticalAlignment.Stretch) {
            offset.y = (clientSize.height - inkSize.height) * 0.5;
        }
        else if (va == _1.VerticalAlignment.Bottom) {
            offset.y = clientSize.height - inkSize.height;
        }
        else {
            offset.y = 0;
        }
        return offset;
    }
    arrangeOverride(finalSize) {
        return finalSize;
    }
    layoutOverride() {
        //if (this._visual != null)
        //    this._visual.style.cssText = this.cssStyle;
        super.layoutOverride();
        if (this._visual == null)
            return;
        //this._visual.style.position = "absolute";
        this._visual.style.visibility = this.isVisible ? "" : "collapsed";
        this._visual.style.overflowX = this.overflowX;
        this._visual.style.overflowY = this.overflowY;
        if (this.visualOffset != null) {
            //for left and top default value is not 0 so
            //I've to specify both always
            this._visual.style.left = this.visualOffset.x.toString() + "px";
            this._visual.style.top = this.visualOffset.y.toString() + "px";
        }
        if (this.renderSize != null) {
            //when an element initially loads hidden renderSize is not available
            this._visual.style.width = this.renderSize.width.toString() + "px";
            this._visual.style.height = this.renderSize.height.toString() + "px";
        }
    }
    get width() {
        return this.getValue(FrameworkElement_1.widthProperty);
    }
    set width(value) {
        this.setValue(FrameworkElement_1.widthProperty, value);
    }
    get height() {
        return this.getValue(FrameworkElement_1.heightProperty);
    }
    set height(value) {
        this.setValue(FrameworkElement_1.heightProperty, value);
    }
    get actualWidth() {
        return this.getValue(FrameworkElement_1.actualWidthProperty);
    }
    setActualWidth(value) {
        this.setValue(FrameworkElement_1.actualWidthProperty, value);
    }
    get actualHeight() {
        return this.getValue(FrameworkElement_1.actualHeightProperty);
    }
    setActualHeight(value) {
        this.setValue(FrameworkElement_1.actualHeightProperty, value);
    }
    get minWidth() {
        return this.getValue(FrameworkElement_1.minWidthProperty);
    }
    set minWidth(value) {
        this.setValue(FrameworkElement_1.minWidthProperty, value);
    }
    get minHeight() {
        return this.getValue(FrameworkElement_1.minHeightProperty);
    }
    set minHeight(value) {
        this.setValue(FrameworkElement_1.minHeightProperty, value);
    }
    get maxWidth() {
        return this.getValue(FrameworkElement_1.maxWidthProperty);
    }
    set maxWidth(value) {
        this.setValue(FrameworkElement_1.maxWidthProperty, value);
    }
    get maxHeight() {
        return this.getValue(FrameworkElement_1.maxHeightProperty);
    }
    set maxHeight(value) {
        this.setValue(FrameworkElement_1.maxHeightProperty, value);
    }
    get verticalAlignment() {
        return this.getValue(FrameworkElement_1.verticalAlignmentProperty);
    }
    set verticalAlignment(value) {
        this.setValue(FrameworkElement_1.verticalAlignmentProperty, value);
    }
    get horizontalAlignment() {
        return this.getValue(FrameworkElement_1.horizontalAlignmentProperty);
    }
    set horizontalAlignment(value) {
        this.setValue(FrameworkElement_1.horizontalAlignmentProperty, value);
    }
    get margin() {
        return this.getValue(FrameworkElement_1.marginProperty);
    }
    set margin(value) {
        this.setValue(FrameworkElement_1.marginProperty, value);
    }
    get dataContext() {
        return this.getValue(FrameworkElement_1.dataContextProperty);
    }
    set dataContext(value) {
        this.setValue(FrameworkElement_1.dataContextProperty, value);
    }
    get parentDataContext() {
        if (this.parent != null)
            return this.parent.getValue(FrameworkElement_1.dataContextProperty);
        return null;
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        super.onDependencyPropertyChanged(property, value, oldValue);
        if (property == FrameworkElement_1.dataContextProperty)
            super.onPropertyChanged("parentDataContext", this.parentDataContext, null);
    }
    onParentChanged(oldParent, newParent) {
        super.onParentChanged(oldParent, newParent);
        super.onPropertyChanged("parentDataContext", newParent, oldParent);
    }
    get tag() {
        return this.getValue(FrameworkElement_1.tagProperty);
    }
    set tag(value) {
        this.setValue(FrameworkElement_1.tagProperty, value);
    }
    get overflowX() {
        return this.getValue(FrameworkElement_1.overflowXProperty);
    }
    set overflowX(value) {
        this.setValue(FrameworkElement_1.overflowXProperty, value);
    }
    get overflowY() {
        return this.getValue(FrameworkElement_1.overflowYProperty);
    }
    set overflowY(value) {
        this.setValue(FrameworkElement_1.overflowYProperty, value);
    }
};
//width property
FrameworkElement.widthProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "Width", Number.NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure);
//height property
FrameworkElement.heightProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "Height", Number.NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure);
//actualWidth property
FrameworkElement.actualWidthProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "ActualWidth", 0);
//actualHeight property
FrameworkElement.actualHeightProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "ActualHeight", 0);
//minWidth property
FrameworkElement.minWidthProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "MinWidth", 0, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
//minHeight property
FrameworkElement.minHeightProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "MinHeight", 0, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
//maxWidth property
FrameworkElement.maxWidthProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "MaxWidth", Infinity, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
//maxHeight property
FrameworkElement.maxHeightProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "MaxHeight", Infinity, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
//verticalAlignment property
FrameworkElement.verticalAlignmentProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "VerticalAlignment", _1.VerticalAlignment.Stretch, _1.FrameworkPropertyMetadataOptions.AffectsArrange, (v) => _1.VerticalAlignment[v]);
//horizontalAlignment property
FrameworkElement.horizontalAlignmentProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "HorizontalAlignment", _1.HorizontalAlignment.Stretch, _1.FrameworkPropertyMetadataOptions.AffectsArrange, (v) => _1.HorizontalAlignment[v]);
//margin property
FrameworkElement.marginProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "Margin", new _1.Thickness(), _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => _1.Thickness.fromString(v));
//dataContext property
FrameworkElement.dataContextProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "DataContext", null, _1.FrameworkPropertyMetadataOptions.Inherits);
//tag property
FrameworkElement.tagProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "Tag");
//overflowX property -> visible|hidden|scroll|auto
//by default content is clipped so overflowX is set to hidden
FrameworkElement.overflowXProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "OverflowX", "hidden", _1.FrameworkPropertyMetadataOptions.AffectsRender);
//overflowY property -> visible|hidden|scroll|auto
//by default content is clipped so overflowY is set to hidden
FrameworkElement.overflowYProperty = __1.DependencyObject.registerProperty(FrameworkElement_1, "OverflowY", "hidden", _1.FrameworkPropertyMetadataOptions.AffectsRender);
FrameworkElement = FrameworkElement_1 = __decorate([
    __1.TypeId("ovuse.controls.FrameworkElement")
], FrameworkElement);
exports.FrameworkElement = FrameworkElement;
class MinMax {
    constructor(e) {
        this.maxHeight = e.maxHeight;
        this.minHeight = e.minHeight;
        var l = e.height;
        this.height = isNaN(l) ? Infinity : l;
        this.maxHeight = Math.max(Math.min(this.height, this.maxHeight), this.minHeight);
        this.height = isNaN(l) ? 0 : l;
        this.minHeight = Math.max(Math.min(this.maxHeight, this.height), this.minHeight);
        this.maxWidth = e.maxWidth;
        this.minWidth = e.minWidth;
        l = e.width;
        this.width = isNaN(l) ? Infinity : l;
        this.maxWidth = Math.max(Math.min(this.width, this.maxWidth), this.minWidth);
        this.width = isNaN(l) ? 0 : l;
        this.minWidth = Math.max(Math.min(this.maxWidth, this.width), this.minWidth);
    }
}
var FrameworkElement_1;
