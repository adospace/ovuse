
import { expect } from 'chai';
import 'mocha';

import { TypeId, getTypeId, getObjectTypeId  } from '../lib'

@TypeId("a-uniqueid")
class A {

}

@TypeId("b-uniqueid")
class B extends A {

}

describe('getPrototypeOf', () => {
    it('it should return true', () => {
        const result = Object.getPrototypeOf(new A()) == Object.getPrototypeOf(new A());
        expect(result).to.be.true;
    });
});

describe('typeId', () => {
    it("it should return 'a-uniqueid'", () => {
        const result = getObjectTypeId(new A());
        expect(result).to.equal('a-uniqueid');
    });
});


describe('typeId of base class', () => {
    it("it should return 'b-uniqueid'", () => {
        const result = getObjectTypeId(new B());
        expect(result).to.equal('b-uniqueid');
    });
});


describe('typeId of type class', () => {
    it("it should return 'a-uniqueid'", () => {
        const result = getTypeId(A);
        expect(result).to.equal('a-uniqueid');
    });
});


describe('componentName of base type class', () => {
    it("it should return 'b-uniqueid'", () => {
        const result = getTypeId(B);
        expect(result).to.equal('b-uniqueid');
    });
});