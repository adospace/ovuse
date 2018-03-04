import { ISupportDependencyPropertyChange, ISupportPropertyChange } from './contracts';
import { Binding, DependencyObject, DependencyProperty } from '.';
export declare class PropertyPath implements ISupportDependencyPropertyChange, ISupportPropertyChange {
    owner: Binding;
    path: string;
    name: string | undefined;
    source: DependencyObject;
    private next;
    private prev;
    sourceProperty: DependencyProperty | undefined;
    indexers: string[] | undefined;
    constructor(owner: Binding, path: string, source: DependencyObject);
    private attachShource();
    private detachSource();
    private lookForIndexers();
    private build();
    private onPathChanged();
    getValue(): any;
    setValue(value: any): void;
    onDependencyPropertyChanged(DependencyObject: DependencyObject, DependencyProperty: DependencyProperty): void;
    onChangeProperty(source: any, propertyName: string, value: any): void;
}
