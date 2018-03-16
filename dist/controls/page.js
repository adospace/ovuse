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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var __1 = require("..");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        // static typeName: string = "layouts.controls.Page";
        // get typeName(): string{
        //     return Page.typeName;
        // }
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._container = null;
        //navigation system
        //if cachePage is true navigation system reuse already loaded page
        _this.cachePage = false;
        return _this;
    }
    Page_1 = Page;
    Page.prototype.tryLoadChildFromServer = function () {
        var _this = this;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function (ev) {
            if (req.readyState == 4 && req.status == 200) {
                var loader = new _1.XamlReader();
                _this.child = loader.Parse(req.responseText);
            }
        };
        var typeName = __1.getObjectTypeId(this);
        req.open("GET", typeName.replace(/\./gi, '/') + ".xml", true);
        req.send();
    };
    Page.prototype.attachVisualOverride = function (elementContainer) {
        this._container = elementContainer;
        var child = this.child;
        if (child != null) {
            child.parent = this;
            child.attachVisual(this._container);
        }
        else {
            this.tryLoadChildFromServer();
        }
        _super.prototype.attachVisualOverride.call(this, elementContainer);
    };
    Page.prototype.layoutOverride = function () {
        var child = this.child;
        if (child != null)
            child.layout();
    };
    Page.prototype.measureOverride = function (constraint) {
        var mySize = new _1.Size();
        var child = this.child;
        if (child != null) {
            child.measure(constraint);
            if (child.desiredSize != null)
                return child.desiredSize;
        }
        return mySize;
    };
    Page.prototype.arrangeOverride = function (finalSize) {
        //  arrange child
        var child = this.child;
        if (child != null) {
            child.arrange(new _1.Rect(0, 0, finalSize.width, finalSize.height));
        }
        return finalSize;
    };
    Object.defineProperty(Page.prototype, "child", {
        get: function () {
            return this.getValue(Page_1.childProperty);
        },
        set: function (value) {
            this.setValue(Page_1.childProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
        if (property == Page_1.childProperty) {
            var oldChild = oldValue;
            if (oldChild != null && oldChild.parent == this) {
                oldChild.parent = null;
                oldChild.attachVisual(null);
            }
            var newChild = value;
            if (newChild != null) {
                newChild.parent = this;
                if (this._container != null)
                    newChild.attachVisual(this._container);
            }
        }
        _super.prototype.onDependencyPropertyChanged.call(this, property, value, oldValue);
    };
    Object.defineProperty(Page.prototype, "sizeToContent", {
        get: function () {
            return this.getValue(Page_1.sizeToContentProperty);
        },
        set: function (value) {
            this.setValue(Page_1.sizeToContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    //onNavigate method is called also for reused/cached pages
    Page.prototype.onNavigate = function (context) {
    };
    Page.childProperty = __1.DependencyObject.registerProperty(Page_1, "Child", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
    //SizeToContent property
    Page.sizeToContentProperty = __1.DependencyObject.registerProperty(Page_1, "SizeToContent", _1.SizeToContent.None, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.SizeToContent[v]; });
    Page = Page_1 = __decorate([
        __1.DependencyObjectId("ovuse.controls.Page")
    ], Page);
    return Page;
    var Page_1;
}(_1.FrameworkElement));
exports.Page = Page;
