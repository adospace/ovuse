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
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        var _this = _super.call(this) || this;
        _this._popupContainer = null;
        _this._child = null;
        return _this;
    }
    Object.defineProperty(Popup.prototype, "typeName", {
        get: function () {
            return Popup.typeName;
        },
        enumerable: true,
        configurable: true
    });
    Popup.initProperties = function () {
        _1.FrameworkElement.horizontalAlignmentProperty.overrideDefaultValue(Popup.typeName, "Center");
        _1.FrameworkElement.verticalAlignmentProperty.overrideDefaultValue(Popup.typeName, "Center");
    };
    Popup.prototype.tryLoadChildFromServer = function () {
        var _this = this;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function (ev) {
            if (req.readyState == 4 && req.status == 200) {
                var loader = new _1.XamlReader();
                _this._child = loader.Parse(req.responseText);
                if (_this._child != null)
                    _this.setupChild();
            }
        };
        req.open("GET", this.typeName.replace(/\./gi, '/') + ".xml", true);
        req.send();
    };
    Object.defineProperty(Popup.prototype, "child", {
        get: function () {
            return this._child;
        },
        set: function (value) {
            if (this._child != value) {
                this._child = value;
                this.invalidateMeasure();
            }
        },
        enumerable: true,
        configurable: true
    });
    Popup.prototype.onShow = function () {
        if (this._child == null)
            this._child = this.initializeComponent();
        if (this._child != null)
            this.setupChild();
        else
            this.tryLoadChildFromServer();
    };
    Popup.prototype.setupChild = function () {
        if (this._child == null)
            return;
        this._child.parent = this;
        this._popupContainer = document.createElement("div");
        this._popupContainer.style.width = this._popupContainer.style.height = "100%";
        this._popupContainer.style.position = "fixed";
        this._popupContainer.className = "layoutsPopupContainer"; //default popup container style
        if (this.cssClass != null)
            this._popupContainer.className = this.cssClass;
        document.body.appendChild(this._popupContainer);
        this._child.attachVisual(this._popupContainer);
        var currentThis = this;
        this._popupContainer.addEventListener("mousedown", function (event) {
            if (event.target == currentThis._popupContainer) {
                this.removeEventListener("mousedown", arguments.callee);
                _1.LayoutManager.closePopup(currentThis);
            }
        });
    };
    Popup.prototype.onClose = function () {
        if (this._child != null && this._child.parent == this) {
            this._child.attachVisual(null);
            this._child.parent = null;
            if (this._popupContainer != null)
                document.body.removeChild(this._popupContainer);
            this._popupContainer = null;
        }
    };
    Popup.prototype.initializeComponent = function () {
        return null;
    };
    Popup.prototype.layoutOverride = function () {
        _super.prototype.layoutOverride.call(this);
        var child = this.child;
        if (child != null) {
            var childOffset = this.visualOffset;
            if (this.relativeOffset != null &&
                childOffset != null)
                childOffset = childOffset.add(this.relativeOffset);
            child.layout(childOffset);
        }
    };
    Popup.prototype.measureOverride = function (constraint) {
        var mySize = new _1.Size();
        if (this._child != null) {
            this._child.measure(constraint);
            if (this._child.desiredSize != null)
                return this._child.desiredSize;
        }
        return mySize;
    };
    Popup.prototype.arrangeOverride = function (finalSize) {
        //  arrange child
        var child = this._child;
        if (child != null) {
            child.arrange(new _1.Rect(0, 0, finalSize.width, finalSize.height));
        }
        return finalSize;
    };
    Object.defineProperty(Popup.prototype, "sizeToContent", {
        get: function () {
            return this.getValue(Popup.sizeToContentProperty);
        },
        set: function (value) {
            this.setValue(Popup.sizeToContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "position", {
        get: function () {
            return this.getValue(Popup.positionProperty);
        },
        set: function (value) {
            this.setValue(Popup.positionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Popup.typeName = "layouts.controls.Popup";
    Popup._init = Popup.initProperties();
    //SizeToContent property
    Popup.sizeToContentProperty = __1.DependencyObject.registerProperty(Popup.typeName, "SizeToContent", _1.SizeToContent.Both, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.SizeToContent[v]; });
    Popup.positionProperty = __1.DependencyObject.registerProperty(Popup.typeName, "Position", _1.PopupPosition.Center, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.PopupPosition[v]; });
    return Popup;
}(_1.FrameworkElement));
exports.Popup = Popup;
