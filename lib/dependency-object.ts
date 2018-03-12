
import { DependencyProperty, Binding, PropertyMap } from '.'
import { typeId, getTypeId, getObjectTypeId } from '.'

import { ISupportDependencyPropertyChange, ISupportPropertyChange, IConverter } from './contracts'
import { isString, hasProperty, getFirstAnchestor } from './utils'

// function getPropertyRegistrationsFromObject(obj: any) : string {
//     return obj[typeIdKey];
// }


// function setPropertiesFromType(type: any) : string {
//     return type.prototype[typeIdKey];
// }

const dpIdKey : string = "__dpId";

export class DependencyObject {
    ///Map of properties for each dependency object
    private static globalPropertyMap: { [typeName: string]: PropertyMap; } = {};

    static finalizePropertyRegistrations(type: any) {
        var depPropertRegistration : DependencyProperty[] = type.prototype[dpIdKey];

        if (depPropertRegistration == undefined)
            return;
        
        var typeName = getTypeId(type);
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            DependencyObject.globalPropertyMap[typeName] = new PropertyMap();


        depPropertRegistration.forEach(dpReg => {
            dpReg.typeName = typeName;
            DependencyObject.globalPropertyMap[typeName].register(name, dpReg);
        });
        
        type.prototype[dpIdKey] = undefined;
    }

    static registerPropertyByType(type: any, name: string, defaultValue?: any, options?: any, converter?: { (value: string): any }): DependencyProperty {

        var typeName = getTypeId(type);

        if (typeName != undefined)
            return DependencyObject.registerProperty(typeName, name, defaultValue, options, converter);

        var depPropertRegistration : DependencyProperty[] = type.prototype[dpIdKey];

        if (depPropertRegistration == undefined)
            type.prototype[dpIdKey] = depPropertRegistration = new Array<DependencyProperty>();
 
        var newProperty = new DependencyProperty(name, undefined, defaultValue, options, converter);
        depPropertRegistration.push(newProperty);
        return newProperty;
    }

    ///Register a dependency property for the object
    static registerProperty(typeName: string, name: string, defaultValue?: any, options?: any, converter?: { (value: string): any }): DependencyProperty {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            DependencyObject.globalPropertyMap[typeName] = new PropertyMap();

        var newProperty = new DependencyProperty(name, typeName, defaultValue, options, converter);
        DependencyObject.globalPropertyMap[typeName].register(name, newProperty);
        return newProperty;
    }

    ///Get the dependency property registered with this type of object (or undefined if property doesn't exist on object)
    static getProperty(typeName: string, name: string): DependencyProperty | null {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return null;

        return DependencyObject.globalPropertyMap[typeName].getProperty(name);
    }

    ///Get only dependency properties registered with this type of object
    static getProperties(typeName: string): DependencyProperty[] | null {
        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return null;

        return DependencyObject.globalPropertyMap[typeName].all();
    }

    ///Iterate over all dependency properties registered with this type of object and its ancestors
    static forAllProperties(obj: DependencyObject, callback: (DependencyProperty: DependencyProperty) => void) {
        if (obj == undefined)
            throw new Error("obj == undefined");

        //var typeName = <string>obj["typeName"];
        var typeName = getObjectTypeId(obj);
        var propertiesOfObject = DependencyObject.getProperties(typeName);

        if (propertiesOfObject != undefined)
            propertiesOfObject.forEach(_=> callback(_));

        if (DependencyObject.globalPropertyMap[typeName] == undefined)
            return;

        var firstAnchestor = getFirstAnchestor(obj);
        if (firstAnchestor != undefined)
            DependencyObject.forAllProperties(firstAnchestor, callback);
    }

    static lookupProperty(obj: DependencyObject, name: string): DependencyProperty | null {
        if (obj == undefined)
            throw new Error("obj == undefined");

        //var typeName = <string>obj["typeName"];
        var typeName = getObjectTypeId(obj);
        var property = DependencyObject.globalPropertyMap[typeName] == undefined ? 
            null : 
            DependencyObject.globalPropertyMap[typeName].getProperty(name);
        var firstAnchestor = getFirstAnchestor(obj);
        if (property == undefined && firstAnchestor != undefined)
            return DependencyObject.lookupProperty(firstAnchestor, name);

        return property;
    }

    protected localPropertyValueMap: { [propertyName: string]: any; } = {};
    
    //Get property value for this object
    getValue(property: DependencyProperty): any {
        if (property.name in this.localPropertyValueMap) {
            return this.localPropertyValueMap[property.name];
        }

        return property.getDefaultValue(this);
    }

    //set property value to this object
    setValue(property: DependencyProperty, value: any) {
        var oldValue = this.getValue(property);
        var valueToSet = property.converter != undefined && isString(value) ? property.converter(value) : value;
        if (oldValue != valueToSet) {
            this.localPropertyValueMap[property.name] = valueToSet;
            this.onDependencyPropertyChanged(property, valueToSet, oldValue);
        }
    }

    //reset property value to its default
    resetValue(property: DependencyProperty) {
        if (property.name in this.localPropertyValueMap) {
            var oldValue = this.getValue(property);
            delete this.localPropertyValueMap[property.name];
            this.onDependencyPropertyChanged(property, undefined, oldValue);
        }
    }

    //Called when a value of a dependency property is changed (manually or by a binding)
    protected onDependencyPropertyChanged(property: DependencyProperty, value: any, oldValue: any) {
        this.dpcHandlers.forEach((h) => {
            h.onDependencyPropertyChanged(this, property);
        });
    }

    private dpcHandlers: ISupportDependencyPropertyChange[] = [];

    //subscribe to dep property change events
    subscribeDependencyPropertyChanges(observer: ISupportDependencyPropertyChange) {
        if (this.dpcHandlers.indexOf(observer) == -1)
            this.dpcHandlers.push(observer);
    }

    //unsubscribe from dep property change events
    unsubscribeDependencyPropertyChanges(observer: ISupportDependencyPropertyChange) {
        var index = this.dpcHandlers.indexOf(observer, 0);
        if (index != -1) {
            this.dpcHandlers.splice(index, 1);
        }
    }

    //Called when a value of a plain property is changed
    protected onPropertyChanged(propertyName: string, value: any, oldValue: any) {
        this.pcHandlers.forEach((h) => {
            h.onChangeProperty(this, propertyName, value);
        });
    }

    private pcHandlers: ISupportPropertyChange[] = [];

    //subscribe to property change events
    subscribePropertyChanges(observer: ISupportPropertyChange) {
        if (this.pcHandlers.indexOf(observer) == -1)
            this.pcHandlers.push(observer);
    }

    //unsubscribe from property change events
    unsubscribePropertyChanges(observer: ISupportPropertyChange) {
        var index = this.pcHandlers.indexOf(observer, 0);
        if (index != -1) {
            this.pcHandlers.splice(index, 1);
        }
    }

    private bindings: Array<Binding> = new Array<Binding>();

    //bind a property of this object to a source object thru a path
    bind(property: DependencyProperty, 
        propertyPath: string, 
        twoway: boolean, 
        source: DependencyObject, 
        converter?: IConverter, 
        converterParameter?: any, 
        format?: string) {
        var newBinding = new Binding(this, property, propertyPath, source, twoway, converter, converterParameter, format);
        this.bindings.push(newBinding);
    }

    static logBindingTraceToConsole: boolean = false;
} 