"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _2 = require("../.");
let Canvas = Canvas_1 = class Canvas extends _1.Panel {
    measureOverride(constraint) {
        var childConstraint = new _1.Size(Infinity, Infinity);
        this.children.forEach(child => {
            child.measure(childConstraint);
        });
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        this.children.forEach(child => {
            if (child.desiredSize == null)
                return;
            let x = 0;
            let y = 0;
            let left = Canvas_1.getLeft(child);
            if (!isNaN(left)) {
                x = left;
            }
            else {
                let right = Canvas_1.getRight(child);
                if (!isNaN(right)) {
                    x = finalSize.width - child.desiredSize.width - right;
                }
            }
            let top = Canvas_1.getTop(child);
            if (!isNaN(top)) {
                y = top;
            }
            else {
                let bottom = Canvas_1.getBottom(child);
                if (!isNaN(bottom)) {
                    y = finalSize.height - child.desiredSize.height - bottom;
                }
            }
            child.arrange(new _1.Rect(x, y, child.desiredSize.width, child.desiredSize.height));
        });
        return finalSize;
    }
    static getLeft(target) {
        return target.getValue(Canvas_1.leftProperty);
    }
    static setLeft(target, value) {
        target.setValue(Canvas_1.leftProperty, value);
    }
    static getTop(target) {
        return target.getValue(Canvas_1.topProperty);
    }
    static setTop(target, value) {
        target.setValue(Canvas_1.topProperty, value);
    }
    static getRight(target) {
        return target.getValue(Canvas_1.rightProperty);
    }
    static setRight(target, value) {
        target.setValue(Canvas_1.rightProperty, value);
    }
    static getBottom(target) {
        return target.getValue(Canvas_1.bottomProperty);
    }
    static setBottom(target, value) {
        target.setValue(Canvas_1.bottomProperty, value);
    }
};
//properties
//Canvas.Left property
Canvas.leftProperty = _2.DependencyObject.registerProperty(Canvas_1, "Canvas#Left", NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
//Canvas.Top property
Canvas.topProperty = _2.DependencyObject.registerProperty(Canvas_1, "Canvas#Top", NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
//Canvas.Right property
Canvas.rightProperty = _2.DependencyObject.registerProperty(Canvas_1, "Canvas#Right", NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
//Canvas.Bottom property
Canvas.bottomProperty = _2.DependencyObject.registerProperty(Canvas_1, "Canvas#Bottom", NaN, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => parseFloat(v));
Canvas = Canvas_1 = __decorate([
    _2.TypeId("ovuse.controls.Canvas")
], Canvas);
exports.Canvas = Canvas;
var Canvas_1;
