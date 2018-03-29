"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
class ItemsControl extends _1.FrameworkElement {
    constructor() {
        super(...arguments);
        //list of items created
        //note that in general this list is not 1:1 with itemssource collection
        //for example the case when some sort of virtualization of items is applied
        this._elements = null;
        this._divElement = null;
        //Templates collection
        this._templates = new __1.ObservableCollection();
    }
    get typeName() {
        return ItemsControl.typeName;
    }
    static initProperties() {
        //FrameworkElement.overflowXProperty.overrideDefaultValue(ItemsControl.typeName, "auto");
        _1.FrameworkElement.overflowYProperty.overrideDefaultValue(ItemsControl.typeName, "auto");
    }
    attachVisualOverride(elementContainer) {
        this._visual = this._divElement = document.createElement("div");
        let itemsPanel = this.itemsPanel;
        if (itemsPanel == null)
            this.itemsPanel = itemsPanel = new _1.Stack();
        itemsPanel.attachVisual(this._visual);
        super.attachVisualOverride(elementContainer);
    }
    measureOverride(constraint) {
        if (this.itemsPanel != null) {
            this.itemsPanel.measure(constraint);
            if (this.itemsPanel.desiredSize != null)
                return this.itemsPanel.desiredSize;
        }
        return new _1.Size();
    }
    arrangeOverride(finalSize) {
        if (this.itemsPanel != null)
            this.itemsPanel.arrange(finalSize.toRect());
        return finalSize;
    }
    layoutOverride() {
        super.layoutOverride();
        if (this.itemsPanel != null)
            this.itemsPanel.layout();
    }
    get templates() {
        return this._templates;
    }
    set templates(value) {
        if (value == this._templates)
            return;
        if (this._templates != null) {
            //remove handler so that resource can be disposed
            this._templates.offChangeNotify(this);
        }
        this._templates = value;
        if (this._templates != null) {
            this._templates.forEach(el => {
                //to do: re-apply templates to children
            });
            this._templates.onChangeNotify(this);
        }
    }
    onCollectionChanged(collection, added, removed, startRemoveIndex) {
        if (collection == this._templates) {
            //templates collection is changed
            this.setupItems();
        }
        else if (collection == this.itemsSource) {
            //some items were added/removed from itemssouurce
            if (this.itemsPanel == null)
                return;
            added.forEach(item => {
                if (item == null)
                    throw new Error("Unable to render null items");
                var templateForItem = _1.DataTemplate.getTemplateForItem(this._templates.toArray(), item);
                if (templateForItem == null) {
                    throw new Error("Unable to find a valid template for item");
                }
                var newElement = templateForItem.createElement();
                if (newElement != null) {
                    newElement.setValue(_1.FrameworkElement.dataContextProperty, item);
                    this.itemsPanel.children.add(newElement);
                }
            });
            removed.forEach(item => {
                this.itemsPanel.children.remove(this.itemsPanel.children.at(startRemoveIndex++));
            });
        }
        this.invalidateMeasure();
    }
    get itemsSource() {
        return this.getValue(ItemsControl.itemsSourceProperty);
    }
    set itemsSource(value) {
        this.setValue(ItemsControl.itemsSourceProperty, value);
    }
    get itemsPanel() {
        return this.getValue(ItemsControl.itemsPanelProperty);
    }
    set itemsPanel(value) {
        this.setValue(ItemsControl.itemsPanelProperty, value);
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == ItemsControl.itemsSourceProperty) {
            if (oldValue != null && oldValue["offChangeNotify"] != null) {
                var oldItmesSource = oldValue;
                oldItmesSource.offChangeNotify(this);
            }
            this.setupItems();
            if (value != null && value["onChangeNotify"] != null) {
                var newItemsSource = value;
                newItemsSource.onChangeNotify(this);
            }
        }
        else if (property == ItemsControl.itemsPanelProperty) {
            var oldPanel = oldValue;
            if (oldPanel != null && oldPanel.parent == this) {
                oldPanel.children.clear();
                oldPanel.parent = null;
                oldPanel.attachVisual(null);
            }
            var newPanel = value;
            if (newPanel != null) {
                newPanel.parent = this;
                if (this._visual != null)
                    newPanel.attachVisual(this._visual);
            }
        }
        else if (property == ItemsControl.itemsPanelProperty)
            this.setupItems();
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    //private getTemplateForItem(item: any): DataTemplate {
    //    if (this._templates == null ||
    //        this._templates.count == 0)
    //        return null;
    //    var typeName: string = typeof item;
    //    if (Ext.hasProperty(item, "typeName"))
    //        typeName = item["typeName"];
    //    else {
    //        if (item instanceof Date)//detect date type
    //            typeName = "date";
    //    }
    //    var foundTemplate: DataTemplate = null;
    //    if (typeName != null)
    //        foundTemplate = Enumerable.From(this.templates.elements).FirstOrDefault(null, dt => dt.targetType != null && dt.targetType.toLowerCase() == typeName.toLowerCase());
    //    if (foundTemplate != null)
    //        return foundTemplate;
    //    return Enumerable.From(this.templates.elements).FirstOrDefault(null, dt => dt.targetType == null);
    //}
    setupItems() {
        if (this._elements != null) {
            this.itemsPanel.children.clear();
            this._elements = null;
        }
        if (this._templates == null ||
            this._templates.count == 0)
            return;
        var itemsSource = this.itemsSource;
        if (itemsSource != null) {
            var elements = null;
            if (Object.prototype.toString.call(itemsSource) == '[object Array]')
                elements = itemsSource;
            else
                elements = itemsSource["elements"];
            if (elements == null)
                throw new Error("Unable to get list of elements from itemsSource");
            elements =
                elements.map(item => {
                    var templateForItem = _1.DataTemplate.getTemplateForItem(this._templates.toArray(), item);
                    if (templateForItem == null) {
                        throw new Error("Unable to find a valid template for item");
                    }
                    var newElement = templateForItem.createElement();
                    if (newElement != null)
                        newElement.setValue(_1.FrameworkElement.dataContextProperty, item);
                    return newElement;
                });
            this._elements = elements.filter(item => item != null);
        }
        if (this._elements != null) {
            if (this.itemsPanel == null) {
                this.itemsPanel = new _1.Stack();
                this.itemsPanel.parent = this;
                if (this._visual != null)
                    this.itemsPanel.attachVisual(this._visual);
            }
            this.itemsPanel.children = new __1.ObservableCollection(this._elements);
        }
        this.invalidateMeasure();
    }
}
ItemsControl.typeName = "layouts.controls.ItemsControl";
ItemsControl._init = ItemsControl.initProperties();
//itemsSource property
ItemsControl.itemsSourceProperty = __1.DependencyObject.registerProperty(ItemsControl.typeName, "ItemsSource", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
//itemsPanel property
ItemsControl.itemsPanelProperty = __1.DependencyObject.registerProperty(ItemsControl.typeName, "ItemsPanel", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender);
exports.ItemsControl = ItemsControl;
