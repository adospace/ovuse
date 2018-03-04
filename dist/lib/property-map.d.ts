import { DependencyProperty } from './dependency-property';
export declare class PropertyMap {
    constructor();
    private propertyMap;
    getProperty(name: string): DependencyProperty;
    all(): DependencyProperty[];
    register(name: string, property: DependencyProperty): void;
}
