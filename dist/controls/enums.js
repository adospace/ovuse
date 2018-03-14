"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FrameworkPropertyMetadataOptions;
(function (FrameworkPropertyMetadataOptions) {
    /// No flags
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["None"] = 0] = "None";
    /// This property affects measurement
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["AffectsMeasure"] = 1] = "AffectsMeasure";
    /// This property affects arragement
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["AffectsArrange"] = 2] = "AffectsArrange";
    /// This property affects parent's measurement
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["AffectsParentMeasure"] = 4] = "AffectsParentMeasure";
    /// This property affects parent's arrangement
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["AffectsParentArrange"] = 8] = "AffectsParentArrange";
    /// This property affects rendering
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["AffectsRender"] = 16] = "AffectsRender";
    /// This property inherits to children
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["Inherits"] = 32] = "Inherits";
    /// NOT SUPPORTED: 
    /// This property causes inheritance and resource lookup to override values 
    /// of InheritanceBehavior that may be set on any FE in the path of lookup
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["OverridesInheritanceBehavior"] = 64] = "OverridesInheritanceBehavior";
    /// This property does not support data binding
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["NotDataBindable"] = 128] = "NotDataBindable";
    /// Data bindings on this property default to two-way
    FrameworkPropertyMetadataOptions[FrameworkPropertyMetadataOptions["BindsTwoWayByDefault"] = 256] = "BindsTwoWayByDefault";
})(FrameworkPropertyMetadataOptions = exports.FrameworkPropertyMetadataOptions || (exports.FrameworkPropertyMetadataOptions = {}));
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
    HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
    HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
    HorizontalAlignment[HorizontalAlignment["Stretch"] = 3] = "Stretch";
})(HorizontalAlignment = exports.HorizontalAlignment || (exports.HorizontalAlignment = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
    VerticalAlignment[VerticalAlignment["Center"] = 1] = "Center";
    VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
    VerticalAlignment[VerticalAlignment["Stretch"] = 3] = "Stretch";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
var SizeToContent;
(function (SizeToContent) {
    SizeToContent[SizeToContent["None"] = 0] = "None";
    SizeToContent[SizeToContent["Both"] = 1] = "Both";
    SizeToContent[SizeToContent["Vertical"] = 2] = "Vertical";
    SizeToContent[SizeToContent["Horizontal"] = 3] = "Horizontal";
})(SizeToContent = exports.SizeToContent || (exports.SizeToContent = {}));
var PopupPosition;
(function (PopupPosition) {
    PopupPosition[PopupPosition["Center"] = 0] = "Center";
    PopupPosition[PopupPosition["Left"] = 1] = "Left";
    PopupPosition[PopupPosition["LeftTop"] = 2] = "LeftTop";
    PopupPosition[PopupPosition["LeftBottom"] = 3] = "LeftBottom";
    PopupPosition[PopupPosition["Top"] = 4] = "Top";
    PopupPosition[PopupPosition["TopLeft"] = 5] = "TopLeft";
    PopupPosition[PopupPosition["TopRight"] = 6] = "TopRight";
    PopupPosition[PopupPosition["Right"] = 7] = "Right";
    PopupPosition[PopupPosition["RightTop"] = 8] = "RightTop";
    PopupPosition[PopupPosition["RightBottom"] = 9] = "RightBottom";
    PopupPosition[PopupPosition["Bottom"] = 10] = "Bottom";
    PopupPosition[PopupPosition["BottomLeft"] = 11] = "BottomLeft";
    PopupPosition[PopupPosition["BottomRight"] = 12] = "BottomRight";
})(PopupPosition = exports.PopupPosition || (exports.PopupPosition = {}));
