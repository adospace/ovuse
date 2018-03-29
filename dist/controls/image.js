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
/// <summary>
///     Stretch - Enum which descibes how a source rect should be stretched to fit a 
///     destination rect.
/// </summary>
var Stretch;
(function (Stretch) {
    /// <summary>
    ///     None - Preserve original size
    /// </summary>
    Stretch[Stretch["None"] = 0] = "None";
    /// <summary>
    ///     Fill - Aspect ratio is not preserved, source rect fills destination rect.
    /// </summary>
    Stretch[Stretch["Fill"] = 1] = "Fill";
    /// <summary>
    ///     Uniform - Aspect ratio is preserved, Source rect is uniformly scaled as large as 
    ///     possible such that both width and height fit within destination rect.  This will 
    ///     not cause source clipping, but it may result in unfilled areas of the destination 
    ///     rect, if the aspect ratio of source and destination are different.
    /// </summary>
    Stretch[Stretch["Uniform"] = 2] = "Uniform";
    /// <summary>
    ///     UniformToFill - Aspect ratio is preserved, Source rect is uniformly scaled as small 
    ///     as possible such that the entire destination rect is filled.  This can cause source 
    ///     clipping, if the aspect ratio of source and destination are different.
    /// </summary>
    Stretch[Stretch["UniformToFill"] = 3] = "UniformToFill";
})(Stretch = exports.Stretch || (exports.Stretch = {}));
/// <summary>
/// StretchDirection - Enum which describes when scaling should be used on the content of a Viewbox. This
/// enum restricts the scaling factors along various axes.
/// </summary>
/// <seealso cref="Viewbox" />
var StretchDirection;
(function (StretchDirection) {
    /// <summary>
    /// Only scales the content upwards when the content is smaller than the Viewbox.
    /// If the content is larger, no scaling downwards is done.
    /// </summary>
    StretchDirection[StretchDirection["UpOnly"] = 0] = "UpOnly";
    /// <summary>
    /// Only scales the content downwards when the content is larger than the Viewbox.
    /// If the content is smaller, no scaling upwards is done.
    /// </summary>
    StretchDirection[StretchDirection["DownOnly"] = 1] = "DownOnly";
    /// <summary>
    /// Always stretches to fit the Viewbox according to the stretch mode.
    /// </summary>
    StretchDirection[StretchDirection["Both"] = 2] = "Both";
})(StretchDirection = exports.StretchDirection || (exports.StretchDirection = {}));
let Image = Image_1 = class Image extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        this._imgElement = null;
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._imgElement = document.createElement("img");
        this._visual.style.msUserSelect =
            this._visual.style.webkitUserSelect = "none";
        var imgElement = this._imgElement;
        imgElement.onload = (ev) => {
            this.invalidateMeasure();
        };
        var source = this.source;
        if (source != null &&
            source.trim().length > 0)
            imgElement.src = source;
        super.attachVisualOverride(elementContainer);
    }
    measureOverride(constraint) {
        var imgElement = this._imgElement;
        if (imgElement != null &&
            imgElement.complete &&
            imgElement.naturalWidth > 0) {
            return new _1.Size(imgElement.naturalWidth, imgElement.naturalHeight);
        }
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        var imgElement = this._imgElement;
        if (imgElement != null &&
            imgElement.complete &&
            imgElement.naturalWidth > 0) {
            var scaleFactor = Image_1.computeScaleFactor(finalSize, new _1.Size(imgElement.naturalWidth, imgElement.naturalHeight), this.stretch, this.stretchDirection);
            var scaledSize = new _1.Size(imgElement.naturalWidth * scaleFactor.width, imgElement.naturalHeight * scaleFactor.height);
            if (scaleFactor.width != 1.0 ||
                scaleFactor.height != 1.0) {
                imgElement.style.width = scaledSize.width.toString() + "px";
                imgElement.style.height = scaledSize.height.toString() + "px";
            }
            return scaledSize;
        }
        return super.arrangeOverride(finalSize);
    }
    /// <summary>
    /// Helper function that computes scale factors depending on a target size and a content size
    /// </summary>
    /// <param name="availableSize">Size into which the content is being fitted.</param>
    /// <param name="contentSize">Size of the content, measured natively (unconstrained).</param>
    /// <param name="stretch">Value of the Stretch property on the element.</param>
    /// <param name="stretchDirection">Value of the StretchDirection property on the element.</param>
    static computeScaleFactor(availableSize, contentSize, stretch, stretchDirection) {
        // Compute scaling factors to use for axes
        var scaleX = 1.0;
        var scaleY = 1.0;
        var isConstrainedWidth = isFinite(availableSize.width);
        var isConstrainedHeight = isFinite(availableSize.height);
        if ((stretch == Stretch.Uniform || stretch == Stretch.UniformToFill || stretch == Stretch.Fill)
            && (isConstrainedWidth || isConstrainedHeight)) {
            // Compute scaling factors for both axes
            scaleX = (contentSize.width.isCloseTo(0)) ? 0.0 : availableSize.width / contentSize.width;
            scaleY = (contentSize.height.isCloseTo(0)) ? 0.0 : availableSize.height / contentSize.height;
            if (!isConstrainedWidth)
                scaleX = scaleY;
            else if (!isConstrainedHeight)
                scaleY = scaleX;
            else {
                // If not preserving aspect ratio, then just apply transform to fit
                switch (stretch) {
                    case Stretch.Uniform:
                        {
                            var minscale = scaleX < scaleY ? scaleX : scaleY;
                            scaleX = scaleY = minscale;
                        }
                        break;
                    case Stretch.UniformToFill:
                        {
                            var maxscale = scaleX > scaleY ? scaleX : scaleY;
                            scaleX = scaleY = maxscale;
                        }
                        break;
                    case Stretch.Fill://We already computed the fill scale factors above, so just use them
                        break;
                }
            }
            //Apply stretch direction by bounding scales.
            //In the uniform case, scaleX=scaleY, so this sort of clamping will maintain aspect ratio
            //In the uniform fill case, we have the same result too.
            //In the fill case, note that we change aspect ratio, but that is okay
            switch (stretchDirection) {
                case StretchDirection.UpOnly:
                    if (scaleX < 1.0)
                        scaleX = 1.0;
                    if (scaleY < 1.0)
                        scaleY = 1.0;
                    break;
                case StretchDirection.DownOnly:
                    if (scaleX > 1.0)
                        scaleX = 1.0;
                    if (scaleY > 1.0)
                        scaleY = 1.0;
                    break;
                case StretchDirection.Both:
                    break;
                default:
                    break;
            }
        }
        //Return this as a size now
        return new _1.Size(scaleX, scaleY);
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == Image_1.srcProperty) {
            var imgElement = this._imgElement;
            if (imgElement != null) {
                imgElement.src = value == null ? "" : value;
            }
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    get source() {
        return this.getValue(Image_1.srcProperty);
    }
    set source(value) {
        this.setValue(Image_1.srcProperty, value);
    }
    get stretch() {
        return this.getValue(Image_1.stretchProperty);
    }
    set stretch(value) {
        this.setValue(Image_1.stretchProperty, value);
    }
    get stretchDirection() {
        return this.getValue(Image_1.stretchDirectionProperty);
    }
    set stretchDirection(value) {
        this.setValue(Image_1.stretchDirectionProperty, value);
    }
};
Image.srcProperty = __1.DependencyObject.registerProperty(Image_1, "Source", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
Image.stretchProperty = __1.DependencyObject.registerProperty(Image_1, "Stretch", Stretch.None, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => Stretch[v]);
Image.stretchDirectionProperty = __1.DependencyObject.registerProperty(Image_1, "StretchDirection", StretchDirection.Both, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => StretchDirection[v]);
Image = Image_1 = __decorate([
    __1.TypeId("ovuse.controls.Image")
], Image);
exports.Image = Image;
var Image_1;
