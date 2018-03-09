"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var _2 = require("../.");
var LayoutManager = /** @class */ (function () {
    function LayoutManager() {
    }
    LayoutManager.updateLayout = function () {
        var page = _2.Application.current.page;
        //var docWidth = document.body.clientWidth;
        var docWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        //var docHeight = document.body.clientHeight;
        var docHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        //docWidth /= window.devicePixelRatio || 1;
        //docHeight /= window.devicePixelRatio || 1;
        if (page != null) {
            var pageDesiredSize = page.desiredSize != null ? page.desiredSize : new _1.Size();
            var sizeToContentWidth = page.sizeToContent == _1.SizeToContent.Both || page.sizeToContent == _1.SizeToContent.Horizontal;
            var sizeToContentHeight = page.sizeToContent == _1.SizeToContent.Both || page.sizeToContent == _1.SizeToContent.Vertical;
            page.measure(new _1.Size(sizeToContentWidth ? Infinity : docWidth, sizeToContentHeight ? Infinity : docHeight));
            page.arrange(new _1.Rect(0, 0, sizeToContentWidth ? pageDesiredSize.width : docWidth, sizeToContentHeight ? pageDesiredSize.height : docHeight));
            page.layout();
        }
        LayoutManager.popups.forEach(function (popup) {
            var sizeToContentWidth = popup.sizeToContent == _1.SizeToContent.Both || popup.sizeToContent == _1.SizeToContent.Horizontal;
            var sizeToContentHeight = popup.sizeToContent == _1.SizeToContent.Both || popup.sizeToContent == _1.SizeToContent.Vertical;
            popup.measure(new _1.Size(sizeToContentWidth ? Infinity : docWidth, sizeToContentHeight ? Infinity : docHeight));
            var relativeTo = popup.parent;
            var left = 0, top = 0;
            var popupDesiredSize = popup.desiredSize != null ? popup.desiredSize : new _1.Size();
            var finalWidth = sizeToContentWidth ? popupDesiredSize.width : docWidth;
            var finalHeight = sizeToContentHeight ? popupDesiredSize.height : docHeight;
            if (relativeTo != null && popup.position != _1.PopupPosition.Center) {
                var relativeBound = relativeTo.getBoundingClientRect();
                if (popup.position == _1.PopupPosition.Left ||
                    popup.position == _1.PopupPosition.LeftBottom ||
                    popup.position == _1.PopupPosition.LeftTop) {
                    left = relativeBound.left - finalWidth;
                    if (popup.position == _1.PopupPosition.Left)
                        top = relativeBound.top + relativeBound.height / 2 - finalHeight / 2;
                    else if (popup.position == _1.PopupPosition.LeftBottom)
                        top = relativeBound.bottom - finalHeight;
                    else if (popup.position == _1.PopupPosition.LeftTop)
                        top = relativeBound.top;
                }
                else if (popup.position == _1.PopupPosition.Right ||
                    popup.position == _1.PopupPosition.RightBottom ||
                    popup.position == _1.PopupPosition.RightTop) {
                    left = relativeBound.right;
                    if (popup.position == _1.PopupPosition.Right)
                        top = relativeBound.top + relativeBound.height / 2 - finalHeight / 2;
                    else if (popup.position == _1.PopupPosition.RightBottom)
                        top = relativeBound.bottom - finalHeight;
                    else if (popup.position == _1.PopupPosition.RightTop)
                        top = relativeBound.top;
                }
                else if (popup.position == _1.PopupPosition.Top ||
                    popup.position == _1.PopupPosition.TopLeft ||
                    popup.position == _1.PopupPosition.TopRight) {
                    top = relativeBound.top - popupDesiredSize.height;
                    if (popup.position == _1.PopupPosition.Top)
                        left = relativeBound.left + relativeBound.width / 2 - finalWidth / 2;
                    else if (popup.position == _1.PopupPosition.TopLeft)
                        left = relativeBound.left;
                    else if (popup.position == _1.PopupPosition.TopRight)
                        left = relativeBound.right - finalWidth;
                }
                else if (popup.position == _1.PopupPosition.Bottom ||
                    popup.position == _1.PopupPosition.BottomLeft ||
                    popup.position == _1.PopupPosition.BottomRight) {
                    top = relativeBound.bottom;
                    if (popup.position == _1.PopupPosition.Bottom)
                        left = relativeBound.left + relativeBound.width / 2 - finalWidth / 2;
                    else if (popup.position == _1.PopupPosition.BottomLeft)
                        left = relativeBound.left;
                    else if (popup.position == _1.PopupPosition.BottomRight)
                        left = relativeBound.right - finalWidth;
                }
            }
            else {
                left = docWidth / 2 - finalWidth / 2;
                top = docHeight / 2 - finalHeight / 2;
            }
            popup.arrange(new _1.Rect(left, top, finalWidth, finalHeight));
            popup.layout();
        });
    };
    LayoutManager.showPopup = function (popup) {
        if (LayoutManager.popups.indexOf(popup) == -1) {
            LayoutManager.popups.push(popup);
            popup.onShow();
            LayoutManager.updateLayout();
        }
    };
    LayoutManager.closePopup = function (popup) {
        var indexOfElement = popup == null ? LayoutManager.popups.length - 1 : LayoutManager.popups.indexOf(popup);
        if (indexOfElement > -1) {
            popup = LayoutManager.popups.splice(indexOfElement)[0];
            popup.onClose();
            LayoutManager.updateLayout();
        }
    };
    LayoutManager.popups = [];
    return LayoutManager;
}());
exports.LayoutManager = LayoutManager;
if (window) {
    window.onresize = function () {
        LayoutManager.updateLayout();
    };
}