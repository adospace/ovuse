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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    Popup_1 = Popup;
    // static typeName: string = "layouts.controls.Popup";
    // get typeName(): string {
    //     return Popup.typeName;
    // }
    Popup.initProperties = function () {
        _1.FrameworkElement.horizontalAlignmentProperty.overrideDefaultValue(Popup_1, "Center");
        _1.FrameworkElement.verticalAlignmentProperty.overrideDefaultValue(Popup_1, "Center");
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
        req.open("GET", __1.getObjectTypeId(this).replace(/\./gi, '/') + ".xml", true);
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
            return this.getValue(Popup_1.sizeToContentProperty);
        },
        set: function (value) {
            this.setValue(Popup_1.sizeToContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "position", {
        get: function () {
            return this.getValue(Popup_1.positionProperty);
        },
        set: function (value) {
            this.setValue(Popup_1.positionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Popup._init = Popup_1.initProperties();
    //SizeToContent property
    Popup.sizeToContentProperty = __1.DependencyObject.registerProperty(Popup_1, "SizeToContent", _1.SizeToContent.Both, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.SizeToContent[v]; });
    Popup.positionProperty = __1.DependencyObject.registerProperty(Popup_1, "Position", _1.PopupPosition.Center, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, function (v) { return _1.PopupPosition[v]; });
    Popup = Popup_1 = __decorate([
        __1.DependencyObjectId("ovuse.Controls.Popup"),
        __metadata("design:paramtypes", [])
    ], Popup);
    return Popup;
    var Popup_1;
}(_1.FrameworkElement));
exports.Popup = Popup;
