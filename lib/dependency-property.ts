
import { DependencyObject, getObjectTypeId } from '.'

export class DependencyProperty {
    private _defaultValue: any;
    constructor(public name: string, 
        public typeName?:string, 
        defaultValue?: any, 
        public options?: any, 
        public converter?: 
        { 
            (value: string): any 
        }) {

        this._defaultValue = defaultValue;
        this.options = options;
        this.converter = converter;
    }

    //default value map
    private _defaultValueMap: { [typeName: string]: any; } = {};
    overrideDefaultValue(typeName: string, defaultValue: any) {
        this._defaultValueMap[typeName] = defaultValue;
    }

    //get default value of this property for passed object
    getDefaultValue(depObject: DependencyObject) {
        //var typeName = depObject["typeName"];
        var typeName = getObjectTypeId(depObject);
        
        if (typeName in this._defaultValueMap)
            return this._defaultValueMap[typeName];

        return this._defaultValue;
    }
}