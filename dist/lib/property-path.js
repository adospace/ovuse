"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var utils_1 = require("./utils");
var PropertyPath = /** @class */ (function () {
    function PropertyPath(owner, path, source) {
        this.name = null;
        this.next = null;
        this.prev = null;
        this.sourceProperty = null;
        this.indexers = null;
        this.owner = owner;
        this.path = path;
        this.source = source;
        this.build();
        this.attachShource();
    }
    PropertyPath.prototype.attachShource = function () {
        if (this.sourceProperty == undefined) {
            if (this.source.subscribePropertyChanges != undefined)
                this.source.subscribePropertyChanges(this);
        }
        else if (this.source["unsubscribeDependencyPropertyChanges"] != undefined)
            this.source.subscribeDependencyPropertyChanges(this);
    };
    PropertyPath.prototype.detachSource = function () {
        if (this.source.unsubscribePropertyChanges != undefined)
            this.source.unsubscribePropertyChanges(this);
        //if source is not a DependencyObject I can't subscribe/unsubscribe to its property changes
        if (this.source["unsubscribeDependencyPropertyChanges"] != undefined)
            this.source.unsubscribeDependencyPropertyChanges(this);
    };
    PropertyPath.prototype.lookForIndexers = function () {
        var re = /([\w_]+)(\[([\w_]+)\])/gmi;
        var m;
        var nameStr = this.name;
        if ((m = re.exec(nameStr)) !== undefined) {
            if (m == undefined) {
                this.indexers = null;
                return;
            }
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            //there is at least an indexer in the form property[...]...
            //property name is returned in m[1]
            this.name = m[1];
            //so get the first indexer and save it in this.indexers
            this.indexers = [];
            this.indexers.push(m[3]);
            //for now support up to 2 indexer like 'property[..][..]'
            //search for a second indexer if exists
            re = /([\w_]+)(\[([\w_]+)\])(\[([\w_]+)\])/gmi;
            if ((m = re.exec(nameStr)) !== undefined) {
                if (m == undefined) {
                    this.indexers = null;
                    return;
                }
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                this.indexers.push(m[5]);
            }
        }
        else
            this.indexers = null;
    };
    PropertyPath.prototype.build = function () {
        var oldNext = this.next;
        if (this.next != undefined) {
            this.next.detachSource();
            this.next.prev = null;
        }
        if (this.path == "" ||
            this.path == ".") {
            this.name = ".";
            this.next = null;
        }
        else {
            var dotIndex = this.path.indexOf(".");
            if (dotIndex > -1) {
                //first token of path is the name of property to look in source object
                this.name = this.path.substring(0, dotIndex);
                this.lookForIndexers();
                this.sourceProperty = _1.DependencyObject.lookupProperty(this.source, this.name);
                //NOTE: this.source can be n UIElement(quite often) and it has custom getValue method that looks for parent values
                //for the same property given it has FrameworkPropertyMetadataOptions.Inherits as option defined for property
                //see UEelement.ts/getValue
                var sourcePropertyValue = (this.sourceProperty != undefined) ?
                    this.source.getValue(this.sourceProperty) : //if it's a dep property get value using DependencyObject hierarchy
                    utils_1.getPropertyValue(this.source, this.name); //otherwise try using normal property lookup method
                //this.source[this.name];
                //if an indexer list is defined (binding to something like 'property[...]...')
                //go deeper to property value accessed with the indexer
                if (this.indexers != undefined && sourcePropertyValue != undefined) {
                    sourcePropertyValue = sourcePropertyValue[this.indexers[0]];
                    if (this.indexers.length > 1 && sourcePropertyValue != undefined)
                        sourcePropertyValue = sourcePropertyValue[this.indexers[1]];
                }
                if (sourcePropertyValue != undefined) {
                    //is source value is not undefined means I can go further in search...
                    var nextPath = this.path.substring(dotIndex + 1);
                    if (this.next == undefined ||
                        this.next.path != nextPath ||
                        this.next.source != sourcePropertyValue)
                        this.next = new PropertyPath(this.owner, this.path.substring(dotIndex + 1), sourcePropertyValue);
                    else if (this.next != undefined)
                        this.next.build();
                }
                else {
                    this.next = null;
                }
            }
            else {
                this.name = this.path;
                this.lookForIndexers();
                this.sourceProperty = _1.DependencyObject.lookupProperty(this.source, this.name);
                this.next = null;
            }
        }
        if (this.next != undefined) {
            this.next.attachShource(); //attachSource() test if already attached
            this.next.prev = this;
        }
        if (this.next != oldNext)
            this.onPathChanged();
    };
    PropertyPath.prototype.onPathChanged = function () {
        if (this.prev != undefined)
            this.prev.onPathChanged();
        else {
            this.owner.updateTarget();
        }
    };
    PropertyPath.prototype.getValue = function () {
        if (this.next != undefined)
            return this.next.getValue();
        else if (this.name == ".")
            return {
                success: true,
                value: this.source,
                source: this.source,
                property: undefined
            };
        else if (this.name != undefined && this.path.indexOf(".") == -1) {
            if (_1.DependencyObject.logBindingTraceToConsole)
                if (this.sourceProperty == undefined && (!(this.name in this.source))) {
                    var typeName = _1.componentName(this.source);
                    console.log("[Bindings] Unable to find property '{0}' on type '{1}'".format(this.name, typeName == undefined ? "<noneType>" : typeName));
                }
            var sourcePropertyValue = (this.sourceProperty != undefined) ?
                this.source.getValue(this.sourceProperty) : //if it's a dep property get value using DependencyObject hierarchy
                utils_1.getPropertyValue(this.source, this.name); //otherwise try using normal property lookup method
            //this.source[this.name];
            //if an indexer list is defined (binding to something like 'property[...]...')
            //go deeper to property value accessed with the indexer
            if (this.indexers != undefined && sourcePropertyValue != undefined) {
                sourcePropertyValue = sourcePropertyValue[this.indexers[0]];
                if (this.indexers.length > 1 && sourcePropertyValue != undefined)
                    sourcePropertyValue = sourcePropertyValue[this.indexers[1]];
            }
            return {
                success: true,
                value: sourcePropertyValue,
                source: this.source,
                property: this.sourceProperty
            };
        }
        else
            return {
                success: false
            };
    };
    PropertyPath.prototype.setValue = function (value) {
        if (this.next != undefined)
            this.next.setValue(value);
        else if (this.name != undefined && this.path.indexOf(".") == -1) {
            if (this.indexers != undefined)
                throw new Error("Unable to update source when indexers are specified in binding path");
            if (this.sourceProperty != undefined)
                this.source.setValue(this.sourceProperty, value);
            else
                utils_1.setPropertyValue(this.source, this.name, value); //try update source using default property lookup access
            //this.source[this.name] = value;//try update source using default property lookup access
        }
    };
    PropertyPath.prototype.onDependencyPropertyChanged = function (DependencyObject, DependencyProperty) {
        if (DependencyObject == this.source &&
            DependencyProperty.name == this.name) {
            this.build();
            this.owner.updateTarget();
        }
    };
    PropertyPath.prototype.onChangeProperty = function (source, propertyName, value) {
        if (source == this.source &&
            propertyName == this.name) {
            this.build();
            this.owner.updateTarget();
        }
    };
    return PropertyPath;
}());
exports.PropertyPath = PropertyPath;
