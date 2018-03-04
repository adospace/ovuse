
import { DependencyProperty } from './dependency-property'


export class PropertyMap {
    constructor() {
    }

    private propertyMap: { [propertyName: string]: DependencyProperty; } = {};

    getProperty(name: string): DependencyProperty {
        return this.propertyMap[name];
    }

    all(): DependencyProperty[]{
        var keys = Object.keys(this.propertyMap);
        return keys.map(v => this.propertyMap[v]);
    }

    register(name: string, property: DependencyProperty) {
        if (this.propertyMap[name] != undefined)
            throw new Error("Property already registered");
        this.propertyMap[name] = property;
    }
}