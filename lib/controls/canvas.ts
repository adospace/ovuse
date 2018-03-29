import { FrameworkElement, UIElement, CornerRadius, Rect, Size, Thickness, FrameworkPropertyMetadataOptions, Panel } from '.'
import { TypeId, DependencyProperty, DependencyObject, Command } from '../.'

@TypeId("ovuse.controls.Canvas")
export class Canvas extends Panel {

    protected measureOverride(constraint: Size): Size {
        var childConstraint = new Size(Infinity, Infinity);

        this.children.forEach(child=> {
            child.measure(childConstraint);
        });

        return new Size();
    }

    protected arrangeOverride(finalSize: Size): Size {
        this.children.forEach(child=> {

            if (child.desiredSize == null)
                return;

            let x = 0;
            let y = 0;

            let left = Canvas.getLeft(child);
            if (!isNaN(left)) {
                x = left;
            }
            else {
                let right = Canvas.getRight(child);

                if (!isNaN(right)) {
                    x = finalSize.width - child.desiredSize.width - right;
                }
            }

            let top = Canvas.getTop(child);
            if (!isNaN(top)) {
                y = top;
            }
            else {
                let bottom = Canvas.getBottom(child);

                if (!isNaN(bottom)) {
                    y = finalSize.height - child.desiredSize.height - bottom;
                }
            }

            child.arrange(new Rect(x, y, child.desiredSize.width, child.desiredSize.height));
        });

        return finalSize;

    }


    //properties

    //Canvas.Left property
    static leftProperty = DependencyObject.registerProperty(
        Canvas, "Canvas#Left", NaN, FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
    static getLeft(target: DependencyObject): number {
        return <number>target.getValue(Canvas.leftProperty);
    }
    static setLeft(target: DependencyObject, value: number) {
        target.setValue(Canvas.leftProperty, value);
    }
    //Canvas.Top property
    static topProperty = DependencyObject.registerProperty(
        Canvas, "Canvas#Top", NaN, FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
    static getTop(target: DependencyObject): number {
        return <number>target.getValue(Canvas.topProperty);
    }
    static setTop(target: DependencyObject, value: number) {
        target.setValue(Canvas.topProperty, value);
    }
    //Canvas.Right property
    static rightProperty = DependencyObject.registerProperty(
        Canvas, "Canvas#Right", NaN, FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
    static getRight(target: DependencyObject): number {
        return <number>target.getValue(Canvas.rightProperty);
    }
    static setRight(target: DependencyObject, value: number) {
        target.setValue(Canvas.rightProperty, value);
    }
    //Canvas.Bottom property
    static bottomProperty = DependencyObject.registerProperty(
        Canvas, "Canvas#Bottom", NaN, FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
    static getBottom(target: DependencyObject): number {
        return <number>target.getValue(Canvas.bottomProperty);
    }
    static setBottom(target: DependencyObject, value: number) {
        target.setValue(Canvas.bottomProperty, value);
    }
}