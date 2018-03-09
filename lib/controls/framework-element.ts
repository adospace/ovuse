
import { UIElement, 
    Size, 
    Vector, 
    Rect,
    HorizontalAlignment,
    VerticalAlignment, 
    Thickness, 
    FrameworkPropertyMetadataOptions  
} from '.'

import { 
    DependencyObject, 
    DependencyProperty 
} from '..'



export class FrameworkElement extends UIElement {
    static typeName: string = "layouts.FrameworkElement";
    get typeName(): string {
        return FrameworkElement.typeName;
    }

    private unclippedDesiredSize: Size | null = null;
    //private needClipBounds: boolean;
    protected visualOffset: Vector | null = null;

    protected measureCore(availableSize: Size): Size {
        var margin = this.margin;
        var marginWidth = margin.left + margin.right;
        var marginHeight = margin.top + margin.bottom;

        var frameworkAvailableSize = new Size(
            Math.max(availableSize.width - marginWidth, 0),
            Math.max(availableSize.height - marginHeight, 0));

        var mm = new MinMax(this);

        frameworkAvailableSize.width = Math.max(mm.minWidth, Math.min(frameworkAvailableSize.width, mm.maxWidth));
        frameworkAvailableSize.height = Math.max(mm.minHeight, Math.min(frameworkAvailableSize.height, mm.maxHeight));

        var desideredSize = this.measureOverride(frameworkAvailableSize);

        desideredSize = new Size(
            Math.max(desideredSize.width, mm.minWidth),
            Math.max(desideredSize.height, mm.minHeight));

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

        return new Size(Math.max(0, clippedDesiredWidth), Math.max(0, clippedDesiredHeight));
    }
    
    protected measureOverride(availableSize: Size): Size {
        return new Size();
    }

    protected arrangeCore(finalRect: Rect): void {
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

        if (this.horizontalAlignment != HorizontalAlignment.Stretch) {
            arrangeSize.width = this.unclippedDesiredSize.width;
        }

        if (this.verticalAlignment != VerticalAlignment.Stretch) {
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

        var clippedInkSize = new Size(Math.min(innerInkSize.width, mm.maxWidth),
            Math.min(innerInkSize.height, mm.maxHeight));

        var clientSize = new Size(Math.max(0, finalRect.width - marginWidth),
            Math.max(0, finalRect.height - marginHeight));

        var offset = this.computeAlignmentOffset(clientSize, clippedInkSize);

        offset.x += finalRect.x + margin.left;
        offset.y += finalRect.y + margin.top;

        var oldOffset = this.visualOffset;
        if (oldOffset == null ||
            (!oldOffset.x.isCloseTo(offset.x) || !oldOffset.y.isCloseTo(offset.y))
            )
            this.visualOffset = offset;
        
    }

    private computeAlignmentOffset(clientSize: Size, inkSize: Size) : Vector {
        var offset = new Vector();

        var ha = this.horizontalAlignment;
        var va = this.verticalAlignment;


        if (ha == HorizontalAlignment.Stretch
            && inkSize.width > clientSize.width) {
            ha = HorizontalAlignment.Left;
        }

        if (va == VerticalAlignment.Stretch
            && inkSize.height > clientSize.height) {
            va = VerticalAlignment.Top;
        }

        if (ha == HorizontalAlignment.Center
            || ha == HorizontalAlignment.Stretch) {
            offset.x = (clientSize.width - inkSize.width) * 0.5;
        }
        else if (ha == HorizontalAlignment.Right) {
            offset.x = clientSize.width - inkSize.width;
        }
        else {
            offset.x = 0;
        }

        if (va == VerticalAlignment.Center
            || va == VerticalAlignment.Stretch) {
            offset.y = (clientSize.height - inkSize.height) * 0.5;
        }
        else if (va == VerticalAlignment.Bottom) {
            offset.y = clientSize.height - inkSize.height;
        }
        else {
            offset.y = 0;
        }

        return offset;
    }

    protected arrangeOverride(finalSize: Size): Size {
        return finalSize;
    }

    protected layoutOverride() {
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

    

    //width property
    static widthProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "Width", Number.NaN, FrameworkPropertyMetadataOptions.AffectsMeasure);
    get width(): number {
        return <number>this.getValue(FrameworkElement.widthProperty);
    }
    set width(value: number) {
        this.setValue(FrameworkElement.widthProperty, value);
    }

    //height property
    static heightProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "Height", Number.NaN, FrameworkPropertyMetadataOptions.AffectsMeasure);
    get height(): number {
        return <number>this.getValue(FrameworkElement.heightProperty);
    }
    set height(value: number) {
        this.setValue(FrameworkElement.heightProperty, value);
    }

    //actualWidth property
    static actualWidthProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "ActualWidth", 0);
    get actualWidth(): number {
        return <number>this.getValue(FrameworkElement.actualWidthProperty);
    }
    private setActualWidth(value: number) {
        this.setValue(FrameworkElement.actualWidthProperty, value);
    }

    //actualHeight property
    static actualHeightProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "ActualHeight", 0);
    get actualHeight(): number {
        return <number>this.getValue(FrameworkElement.actualHeightProperty);
    }
    private setActualHeight(value: number) {
        this.setValue(FrameworkElement.actualHeightProperty, value);
    }

    //minWidth property
    static minWidthProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "MinWidth", 0, FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
    get minWidth(): number {
        return <number>this.getValue(FrameworkElement.minWidthProperty);
    }
    set minWidth(value: number) {
        this.setValue(FrameworkElement.minWidthProperty, value);
    }

    //minHeight property
    static minHeightProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "MinHeight", 0, FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
    get minHeight(): number {
        return <number>this.getValue(FrameworkElement.minHeightProperty);
    }
    set minHeight(value: number) {
        this.setValue(FrameworkElement.minHeightProperty, value);
    }

    //maxWidth property
    static maxWidthProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "MaxWidth", Infinity, FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
    get maxWidth(): number {
        return <number>this.getValue(FrameworkElement.maxWidthProperty);
    }
    set maxWidth(value: number) {
        this.setValue(FrameworkElement.maxWidthProperty, value);
    }

    //maxHeight property
    static maxHeightProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "MaxHeight", Infinity, FrameworkPropertyMetadataOptions.AffectsMeasure, (v)=>parseFloat(v));
    get maxHeight(): number {
        return <number>this.getValue(FrameworkElement.maxHeightProperty);
    }
    set maxHeight(value: number) {
        this.setValue(FrameworkElement.maxHeightProperty, value);
    }

    //verticalAlignment property
    static verticalAlignmentProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "VerticalAlignment", VerticalAlignment.Stretch, FrameworkPropertyMetadataOptions.AffectsArrange, (v)=> (<any>VerticalAlignment)[v]);
    get verticalAlignment(): VerticalAlignment {
        return <VerticalAlignment>this.getValue(FrameworkElement.verticalAlignmentProperty);
    }
    set verticalAlignment(value: VerticalAlignment) {
        this.setValue(FrameworkElement.verticalAlignmentProperty, value);
    }

    //horizontalAlignment property
    static horizontalAlignmentProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "HorizontalAlignment", HorizontalAlignment.Stretch, FrameworkPropertyMetadataOptions.AffectsArrange, (v) => (<any>HorizontalAlignment)[v]);
    get horizontalAlignment(): HorizontalAlignment {
        return <HorizontalAlignment>this.getValue(FrameworkElement.horizontalAlignmentProperty);
    }
    set horizontalAlignment(value: HorizontalAlignment) {
        this.setValue(FrameworkElement.horizontalAlignmentProperty, value);
    }

    //margin property
    static marginProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "Margin", new Thickness(), FrameworkPropertyMetadataOptions.AffectsMeasure, (v)=> Thickness.fromString(v));
    get margin(): Thickness {
        return <Thickness>this.getValue(FrameworkElement.marginProperty);
    }
    set margin(value: Thickness) {
        this.setValue(FrameworkElement.marginProperty, value);
    }

    //dataContext property
    static dataContextProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "DataContext", null, FrameworkPropertyMetadataOptions.Inherits);
    get dataContext(): any {
        return this.getValue(FrameworkElement.dataContextProperty);
    }
    set dataContext(value: any) {
        this.setValue(FrameworkElement.dataContextProperty, value);
    }
    get parentDataContext(): any {
        if (this.parent != null)
            return this.parent.getValue(FrameworkElement.dataContextProperty);
        return null;
    }
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        super.onDependencyPropertyChanged(property, value, oldValue);

        if (property == FrameworkElement.dataContextProperty)
            super.onPropertyChanged("parentDataContext", this.parentDataContext, null);
    }
    protected onParentChanged(oldParent: DependencyObject, newParent: DependencyObject) {
        super.onParentChanged(oldParent, newParent);

        super.onPropertyChanged("parentDataContext", newParent, oldParent);
    }



    //tag property
    static tagProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "Tag");
    get tag(): any {
        return <string>this.getValue(FrameworkElement.tagProperty);
    }
    set tag(value: any) {
        this.setValue(FrameworkElement.tagProperty, value);
    }


    //overflowX property -> visible|hidden|scroll|auto
    //by default content is clipped so overflowX is set to hidden
    static overflowXProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "OverflowX", "hidden", FrameworkPropertyMetadataOptions.AffectsRender);
    get overflowX(): any {
        return <string>this.getValue(FrameworkElement.overflowXProperty);
    }
    set overflowX(value: any) {
        this.setValue(FrameworkElement.overflowXProperty, value);
    }

    //overflowY property -> visible|hidden|scroll|auto
    //by default content is clipped so overflowY is set to hidden
    static overflowYProperty = DependencyObject.registerProperty(FrameworkElement.typeName, "OverflowY", "hidden", FrameworkPropertyMetadataOptions.AffectsRender);
    get overflowY(): any {
        return <string>this.getValue(FrameworkElement.overflowYProperty);
    }
    set overflowY(value: any) {
        this.setValue(FrameworkElement.overflowYProperty, value);
    }


}

class MinMax {
    maxHeight: number;
    minHeight: number;
    height: number;

    maxWidth: number;
    minWidth: number;
    width: number;

    constructor(e: FrameworkElement) {
        this.maxHeight = e.maxHeight;
        this.minHeight = e.minHeight;
        var l = e.height;

        this.height = isNaN(l) ? Infinity : l;
        this.maxHeight = Math.max(Math.min(this.height, this.maxHeight), this.minHeight);

        this.height = isNaN(l) ? 0 : l;
        this.minHeight = Math.max(Math.min(this.maxHeight, this.height), this. minHeight);

        this.maxWidth = e.maxWidth;
        this.minWidth = e.minWidth;
        l = e.width;

        this.width = isNaN(l) ? Infinity : l;
        this.maxWidth = Math.max(Math.min(this.width, this.maxWidth), this.minWidth);

        this.width = isNaN(l) ? 0 : l;
        this.minWidth = Math.max(Math.min(this.maxWidth, this.width), this.minWidth);
    }
}
