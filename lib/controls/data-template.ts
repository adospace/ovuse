import { UIElement, FrameworkElement, XamlReader, Size, Rect,SizeToContent, FrameworkPropertyMetadataOptions, NavigationContext, Stack } from '.'
import { DependencyObject, DependencyProperty, TypeId, getTypeId, getObjectTypeId } from '..'
import { hasProperty } from '../utils'
import { hasTypeId } from '../type-id';


export class DataTemplate extends DependencyObject {
    static typeName: string = "layouts.controls.DataTemplate";
    get typeName(): string {
        return DataTemplate.typeName;
    }

    private _innerXaml: string | null = null;
    setInnerXaml(value: string) {
        this._innerXaml = value;
    }

    private _xamlLoader: XamlReader | null = null;
    setXamlLoader(loader: XamlReader) {
        this._xamlLoader = loader;
    }

    createElement(): UIElement | null {
        var reader = this._xamlLoader;
        if (reader == null)
            reader = new XamlReader();

        if (this._innerXaml == null)
            return null;

        return reader.Parse(this._innerXaml);
    }

    public static getTemplateForItem(templates: DataTemplate[], item: any, name: string | null = null): DataTemplate | null {
        if (templates == null ||
            templates.length == 0)
            return null;

        var foundTemplate =
            templates.firstOrDefault(template => {
                if (name != null &&
                    template.name != null &&
                    template.name.toLowerCase() == name.toLowerCase())
                    return true;

                if (template.targetType == null)
                    return false;

                var itemToTemplate = item;
                if (template.targetMember != null &&
                    template.targetMember != "")
                    itemToTemplate = itemToTemplate[template.targetMember];

                var typeName: string = typeof itemToTemplate;
                // if (hasProperty(itemToTemplate, "typeName"))
                //     typeName = itemToTemplate["typeName"];
                if (hasTypeId(itemToTemplate))
                    typeName = getTypeId(itemToTemplate);
                else {
                    if (itemToTemplate instanceof Date)//detect date type
                        typeName = "date";
                }

                if (typeName != null &&
                    template.targetType != null &&
                    template.targetType.toLowerCase() == typeName.toLowerCase())
                    return true;

                return false;
            }, null);

        if (foundTemplate != null)
            return foundTemplate;

        return templates.firstOrDefault(dt => dt.targetType == null, null);
    }

    public static getTemplateForMedia(templates: DataTemplate[]): DataTemplate | null {
        if (templates == null ||
            templates.length == 0)
            return null;

        var foundTemplate =
            templates.firstOrDefault(template => {
                if (template.media == null ||
                    template.media.trim().length == 0) {
                    return true;
                }

                return window.matchMedia(template.media).matches;
            }, null);

        if (foundTemplate != null)
            return foundTemplate;

        return templates.firstOrDefault(dt => dt.targetType == null, null);
    }


    ///returns the type datatemplate is suited for
    ///if null it means it's a generic template usable for any object of any type
    static targetTypeProperty = DependencyObject.registerProperty(DataTemplate.typeName, "TargetType", null);
    get targetType(): string {
        return <string>this.getValue(DataTemplate.targetTypeProperty);
    }
    set targetType(value: string) {
        this.setValue(DataTemplate.targetTypeProperty, value);
    }

    static targetMemberProperty = DependencyObject.registerProperty(DataTemplate.typeName, "TargetMember", null);
    get targetMember(): string {
        return <string>this.getValue(DataTemplate.targetMemberProperty);
    }
    set targetMember(value: string) {
        this.setValue(DataTemplate.targetMemberProperty, value);
    }

    static mediaProperty = DependencyObject.registerProperty(DataTemplate.typeName, "Media", null);
    get media(): string {
        return <string>this.getValue(DataTemplate.mediaProperty);
    }
    set media(value: string) {
        this.setValue(DataTemplate.mediaProperty, value);
    }

    static nameProperty = DependencyObject.registerProperty(DataTemplate.typeName, "Name", null);
    get name(): string {
        return <string>this.getValue(DataTemplate.nameProperty);
    }
    set name(value: string) {
        this.setValue(DataTemplate.nameProperty, value);
    }
}


