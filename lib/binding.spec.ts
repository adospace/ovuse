
import { expect } from 'chai';
import 'mocha';

import { TypeId, DependencyProperty, DependencyObject, Binding  } from '../lib'

@TypeId("TypeA")
class A extends DependencyObject {
    static propertyOnSource = DependencyObject.registerProperty(A, "PropertyOnSource");
}

@TypeId("TypeB")
class B extends DependencyObject {
    static propertyOnTarget = DependencyObject.registerProperty(B, "PropertyOnTarget");
}

describe('Source A -> Target B', () => {
    it('it should return true', () => {
        var a = new A();
        var b = new B();
        var binding = new Binding(b, B.propertyOnTarget, "PropertyOnSource", a);
        //change value on source
        a.setValue(A.propertyOnSource, "my-value");
        //after binding both contains same value
        const result = a.getValue(A.propertyOnSource) == b.getValue(B.propertyOnTarget);
        expect(result).to.be.true;
    });
});

describe('Source A <-> Target B', () => {
    it('it should return true', () => {
        var a = new A();
        var b = new B();
        var binding = new Binding(b, B.propertyOnTarget, "PropertyOnSource", a, true);
        //change value on target
        b.setValue(B.propertyOnTarget, "my-value");
        //after binding both contains same value
        const result = a.getValue(A.propertyOnSource) == b.getValue(B.propertyOnTarget);
        expect(result).to.be.true;
    });
});