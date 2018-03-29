"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
const type_id_1 = require("../type-id");
class DataTemplate extends __1.DependencyObject {
    constructor() {
        super(...arguments);
        this._innerXaml = null;
        this._xamlLoader = null;
    }
    get typeName() {
        return DataTemplate.typeName;
    }
    setInnerXaml(value) {
        this._innerXaml = value;
    }
    setXamlLoader(loader) {
        this._xamlLoader = loader;
    }
    createElement() {
        var reader = this._xamlLoader;
        if (reader == null)
            reader = new _1.XamlReader();
        if (this._innerXaml == null)
            return null;
        return reader.Parse(this._innerXaml);
    }
    static getTemplateForItem(templates, item, name = null) {
        if (templates == null ||
            templates.length == 0)
            return null;
        var foundTemplate = templates.firstOrDefault(template => {
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
            var typeName = typeof itemToTemplate;
            // if (hasProperty(itemToTemplate, "typeName"))
            //     typeName = itemToTemplate["typeName"];
            if (type_id_1.hasTypeId(itemToTemplate))
                typeName = __1.getTypeId(itemToTemplate);
            else {
                if (itemToTemplate instanceof Date)
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
    static getTemplateForMedia(templates) {
        if (templates == null ||
            templates.length == 0)
            return null;
        var foundTemplate = templates.firstOrDefault(template => {
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
    get targetType() {
        return this.getValue(DataTemplate.targetTypeProperty);
    }
    set targetType(value) {
        this.setValue(DataTemplate.targetTypeProperty, value);
    }
    get targetMember() {
        return this.getValue(DataTemplate.targetMemberProperty);
    }
    set targetMember(value) {
        this.setValue(DataTemplate.targetMemberProperty, value);
    }
    get media() {
        return this.getValue(DataTemplate.mediaProperty);
    }
    set media(value) {
        this.setValue(DataTemplate.mediaProperty, value);
    }
    get name() {
        return this.getValue(DataTemplate.nameProperty);
    }
    set name(value) {
        this.setValue(DataTemplate.nameProperty, value);
    }
}
DataTemplate.typeName = "layouts.controls.DataTemplate";
///returns the type datatemplate is suited for
///if null it means it's a generic template usable for any object of any type
DataTemplate.targetTypeProperty = __1.DependencyObject.registerProperty(DataTemplate.typeName, "TargetType", null);
DataTemplate.targetMemberProperty = __1.DependencyObject.registerProperty(DataTemplate.typeName, "TargetMember", null);
DataTemplate.mediaProperty = __1.DependencyObject.registerProperty(DataTemplate.typeName, "Media", null);
DataTemplate.nameProperty = __1.DependencyObject.registerProperty(DataTemplate.typeName, "Name", null);
exports.DataTemplate = DataTemplate;
