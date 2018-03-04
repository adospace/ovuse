import { expect } from 'chai';
import 'mocha';

import { getTypeName, getFirstAnchestor, getPropertyValue  } from '../lib/utils'

class A {
  get baseProperty(): string {
      return "A.basePropertyValue";
  }
}

class B extends A {
  constructor() {
    super();
  }
  get property(): string {
    return "B.propertyValue";
}
}

describe('getTypeName', () => {
  it('it should return B', () => {
    const result = getTypeName(new B());
    expect(result).to.equal('B');
  });

});

describe('getFirstAnchestor', () => {
  it("it should return A with property 'baseProperty'", () => {
    const result = getFirstAnchestor(new B());
    expect(result).to.have.property('baseProperty');
  });
});

describe('getPropertyValue', () => {
  it("it should return B.propertyValue", () => {
    const result = getPropertyValue(new B(), "property");
    expect(result).to.equal('B.propertyValue');
  });
});


describe('getPropertyValue', () => {
  it("it should return A.basePropertyValue", () => {
    const result = getPropertyValue(getFirstAnchestor(new B()), "baseProperty");
    expect(result).to.equal('A.basePropertyValue');
  });
});