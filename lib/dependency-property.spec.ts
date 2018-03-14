
import { expect } from 'chai';
import 'mocha';

import { typeId, getTypeId, getObjectTypeId  } from '../lib'
import { DependencyObject, DependencyProperty  } from '../lib'

@typeId("MyObject")
class A extends DependencyObject {

    static myProperty = DependencyObject.registerPropertyByType(A, "MyProperty", 23);
    get myProperty(): number {
        return <number>this.getValue(A.myProperty);
    }
    set myProperty(value: number) {
        this.setValue(A.myProperty, value);
    }
}


describe('dependency-property', () => {
    it('it should return initial value 23', () => {
        const result = (new A()).getValue(A.myProperty);
        expect(result).equal(23);
    });
});

describe('dependency-property get default value', () => {
    it('it should return initial value 23', () => {
        const result = new A().myProperty;
        expect(result).equal(23);
    });
});

describe('dependency-property set and get', () => {
    it('it should return value 12', () => {
        var a = new A();
        a.myProperty = 12;
        const result = a.myProperty;
        expect(result).equal(12);
    });
});