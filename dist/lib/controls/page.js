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
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._container = null;
        //navigation system
        //if cachePage is true navigation system reuse already loaded page
        _this.cachePage = false;
        return _this;
    }
    Object.defineProperty(Page.prototype, "typeName", {
        get: function () {
            return Page.typeName;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.tryLoadChildFromServer = function () {
        var _this = this;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function (ev) {
            if (req.readyState == 4 && req.status == 200) {
                var loader = new _1.XamlReader();
                _this.child = loader.Parse(req.responseText);
            }
        };
        req.open("GET", this.typeName.replace(/\./gi, '/') + ".xml", true);
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
            return this.getValue(Page.childProperty);
        },
        set: function (value) {
            this.setValue(Page.childProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
        if (property == Page.childProperty) {
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
            return this.getValue(Page.sizeToContentProperty);
        },
        set: function (value) {
            this.setValue(Page.sizeToContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    //onNavigate method is called also for reused/cached pages
    Page.prototype.onNavigate = function (context) {
    };
    Page.typeName = "layouts.controls.Page";
    Page.childProperty = __1.DependencyObject.registerProperty(Page.typeName, "Child", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
    //SizeToContent property
    Page.sizeToContentProperty = __1.DependencyObject.registerProperty(Page.typeName, "SizeToContent", _1.SizeToContent.None, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.SizeToContent[v]; });
    return Page;
}(_1.FrameworkElement));
exports.Page = Page;
