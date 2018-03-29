import { UIElement, XamlReader } from '.';
import { DependencyObject, DependencyProperty } from '..';
export declare class DataTemplate extends DependencyObject {
    static typeName: string;
    readonly typeName: string;
    private _innerXaml;
    setInnerXaml(value: string): void;
    private _xamlLoader;
    setXamlLoader(loader: XamlReader): void;
    createElement(): UIElement | null;
    static getTemplateForItem(templates: DataTemplate[], item: any, name?: string | null): DataTemplate | null;
    static getTemplateForMedia(templates: DataTemplate[]): DataTemplate | null;
    static targetTypeProperty: DependencyProperty;
    targetType: string;
    static targetMemberProperty: DependencyProperty;
    targetMember: string;
    static mediaProperty: DependencyProperty;
    media: string;
    static nameProperty: DependencyProperty;
    name: string;
}
