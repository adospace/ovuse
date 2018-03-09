"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var __1 = require("..");
var MinMax = /** @class */ (function () {
    function MinMax(e) {
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
    return MinMax;
}());
var FrameworkElement = /** @class */ (function (_super) {
    __extends(FrameworkElement, _super);
    function FrameworkElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.unclippedDesiredSize = null;
        //private needClipBounds: boolean;
        _this.visualOffset = null;
        return _this;
    }
    Object.defineProperty(FrameworkElement.prototype, "typeName", {
        get: function () {
            return FrameworkElement.typeName;
        },
        enumerable: true,
        configurable: true
    });
    FrameworkElement.prototype.measureCore = function (availableSize) {
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
    };
    FrameworkElement.prototype.measureOverride = function (availableSize) {
        return new _1.Size();
    };
    FrameworkElement.prototype.arrangeCore = function (finalRect) {
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
    };
    FrameworkElement.prototype.computeAlignmentOffset = function (clientSize, inkSize) {
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
    };
    FrameworkElement.prototype.arrangeOverride = function (finalSize) {
        return finalSize;
    };
    FrameworkElement.prototype.layoutOverride = function () {
        //if (this._visual != null)
        //    this._visual.style.cssText = this.cssStyle;
        _super.prototype.layoutOverride.call(this);
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
    };
    Object.defineProperty(FrameworkElement.prototype, "width", {
        get: function () {
            return this.getValue(FrameworkElement.widthProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.widthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "height", {
        get: function () {
            return this.getValue(FrameworkElement.heightProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.heightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "actualWidth", {
        get: function () {
            return this.getValue(FrameworkElement.actualWidthProperty);
        },
        enumerable: true,
        configurable: true
    });
    FrameworkElement.prototype.setActualWidth = function (value) {
        this.setValue(FrameworkElement.actualWidthProperty, value);
    };
    Object.defineProperty(FrameworkElement.prototype, "actualHeight", {
        get: function () {
            return this.getValue(FrameworkElement.actualHeightProperty);
        },
        enumerable: true,
        configurable: true
    });
    FrameworkElement.prototype.setActualHeight = function (value) {
        this.setValue(FrameworkElement.actualHeightProperty, value);
    };
    Object.defineProperty(FrameworkElement.prototype, "minWidth", {
        get: function () {
            return this.getValue(FrameworkElement.minWidthProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.minWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "minHeight", {
        get: function () {
            return this.getValue(FrameworkElement.minHeightProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.minHeightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "maxWidth", {
        get: function () {
            return this.getValue(FrameworkElement.maxWidthProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.maxWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "maxHeight", {
        get: function () {
            return this.getValue(FrameworkElement.maxHeightProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.maxHeightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "verticalAlignment", {
        get: function () {
            return this.getValue(FrameworkElement.verticalAlignmentProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.verticalAlignmentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "horizontalAlignment", {
        get: function () {
            return this.getValue(FrameworkElement.horizontalAlignmentProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.horizontalAlignmentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "margin", {
        get: function () {
            return this.getValue(FrameworkElement.marginProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.marginProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "dataContext", {
        get: function () {
            return this.getValue(FrameworkElement.dataContextProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.dataContextProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "parentDataContext", {
        get: function () {
            if (this.parent != null)
                return this.parent.getValue(FrameworkElement.dataContextProperty);
            return null;
        },
        enumerable: true,
        configurable: true
    });
    FrameworkElement.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
        _super.prototype.onDependencyPropertyChanged.call(this, property, value, oldValue);
        if (property == FrameworkElement.dataContextProperty)
            _super.prototype.onPropertyChanged.call(this, "parentDataContext", this.parentDataContext, null);
    };
    FrameworkElement.prototype.onParentChanged = function (oldParent, newParent) {
        _super.prototype.onParentChanged.call(this, oldParent, newParent);
        _super.prototype.onPropertyChanged.call(this, "parentDataContext", newParent, oldParent);
    };
    Object.defineProperty(FrameworkElement.prototype, "tag", {
        get: function () {
            return this.getValue(FrameworkElement.tagProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.tagProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "overflowX", {
        get: function () {
            return this.getValue(FrameworkElement.overflowXProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.overflowXProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameworkElement.prototype, "overflowY", {
        get: function () {
            return this.getValue(FrameworkElement.overflowYProperty);
        },
        set: function (value) {
            this.setValue(FrameworkElement.overflowYProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    FrameworkElement.typeName = "layouts.FrameworkElement";
    //width property
    FrameworkElement.widthProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "Width", Number.NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure);
    //height property
    FrameworkElement.heightProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "Height", Number.NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure);
    //actualWidth property
    FrameworkElement.actualWidthProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "ActualWidth", 0);
    //actualHeight property
    FrameworkElement.actualHeightProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "ActualHeight", 0);
    //minWidth property
    FrameworkElement.minWidthProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "MinWidth", 0, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, function (v) { return parseFloat(v); });
    //minHeight property
    FrameworkElement.minHeightProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "MinHeight", 0, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, function (v) { return parseFloat(v); });
    //maxWidth property
    FrameworkElement.maxWidthProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "MaxWidth", Infinity, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, function (v) { return parseFloat(v); });
    //maxHeight property
    FrameworkElement.maxHeightProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "MaxHeight", Infinity, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, function (v) { return parseFloat(v); });
    //verticalAlignment property
    FrameworkElement.verticalAlignmentProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "VerticalAlignment", _1.VerticalAlignment.Stretch, _1.FrameworkPropertyMetadataOptions.AffectsArrange, function (v) { return _1.VerticalAlignment[v]; });
    //horizontalAlignment property
    FrameworkElement.horizontalAlignmentProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "HorizontalAlignment", _1.HorizontalAlignment.Stretch, _1.FrameworkPropertyMetadataOptions.AffectsArrange, function (v) { return _1.HorizontalAlignment[v]; });
    //margin property
    FrameworkElement.marginProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "Margin", new _1.Thickness(), _1.FrameworkPropertyMetadataOptions.AffectsMeasure, function (v) { return _1.Thickness.fromString(v); });
    //dataContext property
    FrameworkElement.dataContextProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "DataContext", null, _1.FrameworkPropertyMetadataOptions.Inherits);
    //tag property
    FrameworkElement.tagProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "Tag");
    //overflowX property -> visible|hidden|scroll|auto
    //by default content is clipped so overflowX is set to hidden
    FrameworkElement.overflowXProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "OverflowX", "hidden", _1.FrameworkPropertyMetadataOptions.AffectsRender);
    //overflowY property -> visible|hidden|scroll|auto
    //by default content is clipped so overflowY is set to hidden
    FrameworkElement.overflowYProperty = __1.DependencyObject.registerProperty(FrameworkElement.typeName, "OverflowY", "hidden", _1.FrameworkPropertyMetadataOptions.AffectsRender);
    return FrameworkElement;
}(_1.UIElement));
exports.FrameworkElement = FrameworkElement;
