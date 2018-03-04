import { DependencyObject } from '../dependency-object';
import { DependencyProperty } from '../dependency-property';
export interface ISupportDependencyPropertyChange {
    onDependencyPropertyChanged(depObject: DependencyObject, depProperty: DependencyProperty): void;
}
