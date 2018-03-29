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
/// Orientation indicates a direction of a control/layout that can exist in a horizontal or vertical state.
/// </summary>
var Orientation;
(function (Orientation) {
    /// <summary>
    /// Control/Layout should be horizontally oriented.
    /// </summary>
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    /// <summary>
    /// Control/Layout should be vertically oriented.
    /// </summary>
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
let Stack = Stack_1 = class Stack extends _1.Panel {
    measureOverride(constraint) {
        var mySize = new _1.Size();
        var orientation = this.orientation;
        if (this.children == null)
            return mySize;
        this.children.forEach(child => {
            if (child.desiredSize == null)
                return;
            if (orientation == Orientation.Horizontal) {
                child.measure(new _1.Size(Infinity, constraint.height));
                mySize.width += child.desiredSize.width;
                mySize.height = Math.max(mySize.height, child.desiredSize.height);
            }
            else {
                child.measure(new _1.Size(constraint.width, Infinity));
                mySize.width = Math.max(mySize.width, child.desiredSize.width);
                mySize.height += child.desiredSize.height;
            }
        });
        if (this.virtualItemCount > this.children.count) {
            if (orientation == Orientation.Horizontal)
                mySize.width += (mySize.width / this.children.count) * (this.virtualItemCount - this.children.count);
            else
                mySize.height += (mySize.height / this.children.count) * (this.virtualItemCount - this.children.count);
        }
        return mySize;
    }
    arrangeOverride(finalSize) {
        var orientation = this.orientation;
        var posChild = new _1.Vector();
        var childrenSize = new _1.Size();
        if (this.children != null) {
            this.children.forEach((child) => {
                if (child.desiredSize == null)
                    return;
                var sizeChild = new _1.Size();
                if (orientation == Orientation.Horizontal) {
                    sizeChild.width = child.desiredSize.width;
                    sizeChild.height = Math.max(finalSize.height, child.desiredSize.height);
                }
                else {
                    sizeChild.height = child.desiredSize.height;
                    sizeChild.width = Math.max(finalSize.width, child.desiredSize.width);
                }
                child.arrange(new _1.Rect(posChild.x, posChild.y, sizeChild.width, sizeChild.height));
                if (orientation == Orientation.Horizontal) {
                    posChild.x += sizeChild.width;
                    childrenSize.width += sizeChild.width;
                    childrenSize.height = Math.max(childrenSize.height, sizeChild.height);
                }
                else {
                    posChild.y += sizeChild.height;
                    childrenSize.width = Math.max(childrenSize.width, sizeChild.width);
                    childrenSize.height += sizeChild.height;
                }
            });
        }
        if (orientation == Orientation.Horizontal)
            return new _1.Size(Math.max(finalSize.width, childrenSize.width), finalSize.height);
        else
            return new _1.Size(finalSize.width, Math.max(finalSize.height, childrenSize.height));
    }
    get orientation() {
        return this.getValue(Stack_1.orientationProperty);
    }
    set orientation(value) {
        this.setValue(Stack_1.orientationProperty, value);
    }
};
Stack.orientationProperty = __1.DependencyObject.registerProperty(Stack_1, "Orientation", Orientation.Vertical, _1.FrameworkPropertyMetadataOptions.AffectsMeasure, (v) => Orientation[v]);
Stack = Stack_1 = __decorate([
    __1.TypeId("ovuse.Controls.Stack")
], Stack);
exports.Stack = Stack;
var Stack_1;
