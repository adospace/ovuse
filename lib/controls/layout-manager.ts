import { 
    SizeToContent, 
    PopupPosition, 
    Size,
    Rect, 
    Popup } from '.'

import { Application } from '../.'

export class LayoutManager {
    static updateLayout() {
        var page = Application.current.page;
        
        var docWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var docHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        if (page != null) {
            var pageDesiredSize = page.desiredSize != null ? page.desiredSize : new Size();
            var sizeToContentWidth = page.sizeToContent == SizeToContent.Both || page.sizeToContent == SizeToContent.Horizontal;
            var sizeToContentHeight = page.sizeToContent == SizeToContent.Both || page.sizeToContent == SizeToContent.Vertical;
            page.measure(new Size(sizeToContentWidth ? Infinity : docWidth, sizeToContentHeight ? Infinity : docHeight));
            page.arrange(new Rect(0, 0, sizeToContentWidth ? pageDesiredSize.width : docWidth, sizeToContentHeight ? pageDesiredSize.height : docHeight));
            page.layout();
        }

        LayoutManager.popups.forEach(popup=> {
            var sizeToContentWidth = popup.sizeToContent == SizeToContent.Both || popup.sizeToContent == SizeToContent.Horizontal;
            var sizeToContentHeight = popup.sizeToContent == SizeToContent.Both || popup.sizeToContent == SizeToContent.Vertical;
            popup.measure(new Size(sizeToContentWidth ? Infinity : docWidth, sizeToContentHeight ? Infinity : docHeight));
            var relativeTo = popup.parent;
            var left = 0, top = 0;
            var popupDesiredSize = popup.desiredSize != null ? popup.desiredSize : new Size() 
            var finalWidth = sizeToContentWidth ? popupDesiredSize.width : docWidth;
            var finalHeight = sizeToContentHeight ? popupDesiredSize.height : docHeight;
            if (relativeTo != null && popup.position != PopupPosition.Center) {
                var relativeBound = relativeTo.getBoundingClientRect();
                
                if (popup.position == PopupPosition.Left ||
                    popup.position == PopupPosition.LeftBottom ||
                    popup.position == PopupPosition.LeftTop) {
                    left = relativeBound.left - finalWidth;
                    if (popup.position == PopupPosition.Left)
                        top = relativeBound.top + relativeBound.height / 2 - finalHeight / 2;
                    else if (popup.position == PopupPosition.LeftBottom)
                        top = relativeBound.bottom - finalHeight;
                    else if (popup.position == PopupPosition.LeftTop)
                        top = relativeBound.top;
                }
                else if (popup.position == PopupPosition.Right ||
                    popup.position == PopupPosition.RightBottom ||
                    popup.position == PopupPosition.RightTop) {
                    left = relativeBound.right;
                    if (popup.position == PopupPosition.Right)
                        top = relativeBound.top + relativeBound.height / 2 - finalHeight / 2;
                    else if (popup.position == PopupPosition.RightBottom)
                        top = relativeBound.bottom - finalHeight;
                    else if (popup.position == PopupPosition.RightTop)
                        top = relativeBound.top;
                }
                else if (popup.position == PopupPosition.Top ||
                    popup.position == PopupPosition.TopLeft ||
                    popup.position == PopupPosition.TopRight) {
                    top = relativeBound.top - popupDesiredSize.height;
                    if (popup.position == PopupPosition.Top)
                        left = relativeBound.left + relativeBound.width / 2 - finalWidth / 2;
                    else if (popup.position == PopupPosition.TopLeft)
                        left = relativeBound.left;
                    else if (popup.position == PopupPosition.TopRight)
                        left = relativeBound.right - finalWidth;
                }
                else if (popup.position == PopupPosition.Bottom ||
                    popup.position == PopupPosition.BottomLeft ||
                    popup.position == PopupPosition.BottomRight) {
                    top = relativeBound.bottom;
                    if (popup.position == PopupPosition.Bottom)
                        left = relativeBound.left + relativeBound.width / 2 - finalWidth / 2;
                    else if (popup.position == PopupPosition.BottomLeft)
                        left = relativeBound.left;
                    else if (popup.position == PopupPosition.BottomRight)
                        left = relativeBound.right - finalWidth;
                }
            }
            else {
                left = docWidth / 2 - finalWidth / 2;
                top = docHeight / 2 - finalHeight / 2;
            }
            popup.arrange(new Rect(left, top, finalWidth, finalHeight));
            popup.layout();
        });
    }

    private static popups: Popup[] = [];
    static showPopup(popup: Popup) {
        if (LayoutManager.popups.indexOf(popup) == -1) {
            LayoutManager.popups.push(popup);
            popup.onShow();
            LayoutManager.updateLayout();
        }
    }

    static closePopup(popup?: Popup) {
        var indexOfElement = popup == null ? LayoutManager.popups.length - 1 : LayoutManager.popups.indexOf(popup);
        if (indexOfElement > -1) {
            popup = LayoutManager.popups.splice(indexOfElement)[0];
            popup.onClose();
            LayoutManager.updateLayout();
        }
    }
    
}

if (window){
    window.onresize = () =>
    {
        LayoutManager.updateLayout();
    }
}