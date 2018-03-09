import { Popup } from '.';
export declare class LayoutManager {
    static updateLayout(): void;
    private static popups;
    static showPopup(popup: Popup): void;
    static closePopup(popup?: Popup): void;
}
