
import { DependencyObject, DependencyProperty  } from '..'

export class ConverterContext {
    constructor(public target: DependencyObject,
        public targetProperty: DependencyProperty,
        public source?: DependencyObject,
        public sourceProperty?: DependencyProperty,
        public parameter?: any) {
    }
}
