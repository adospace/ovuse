
import { expect } from 'chai';
import 'mocha';

import { DependencyObjectId, getTypeId, getObjectTypeId  } from '../lib'
import { DependencyObject, DependencyProperty  } from '../lib'

@DependencyObjectId("ObjectTypeA")
class A extends DependencyObject {

    static myProperty = DependencyObject.registerProperty(A, "MyProperty", 23);
    get myProperty(): number {
        return <number>this.getValue(A.myProperty);
    }
    set myProperty(value: number) {
        this.setValue(A.myProperty, value);
    }
}

@DependencyObjectId("ObjectTypeB")
class B extends A {

    private static initProperties() {
        A.myProperty.overrideDefaultValue(B, -1);
    }
    private static _init = B.initProperties();

    static myProperty = DependencyObject.registerProperty(B, "MyProperty", 1);
    get myProperty(): number {
        return <number>this.getValue(B.myProperty);
    }
    set myProperty(value: number) {
        this.setValue(B.myProperty, value);
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

describe('dependency-property for derived type', () => {
    it('it should return initial value for type B -> 1', () => {
        const result = (new B()).getValue(B.myProperty);
        expect(result).equal(1);
    });
});


describe('dependency-property for derived type default value changed for parent type', () => {
    it('it should return initial value for type B of A.myProperty -> -1', () => {
        const result = (new B()).getValue(A.myProperty);
        expect(result).equal(-1);
    });
});