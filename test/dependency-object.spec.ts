
import { expect } from 'chai';
import 'mocha';

import { component, componentName } from '../lib'

@component('my-component-a')
class A {

}

@component('my-component-b')
class B extends A {

}

describe('getPrototypeOf', () => {
    it('it should return true', () => {
        const result = Object.getPrototypeOf(new A()) == Object.getPrototypeOf(new A());
        expect(result).to.be.true;
    });
});

describe('componentName', () => {
    it("it should return 'my-component-a'", () => {
        const result = componentName(new A());
        expect(result).to.equal('my-component-a');
    });
});


describe('componentName of base class', () => {
    it("it should return 'my-component-b'", () => {
        const result = componentName(new B());
        expect(result).to.equal('my-component-b');
    });
});