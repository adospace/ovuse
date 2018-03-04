/* import { capitalizeFirstLetter } from '../lib/index'
import { expect } from 'chai';
import 'mocha';

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = capitalizeFirstLetter("test!");
    expect(result).to.equal('Test!');
  });

}); */
import { expect } from 'chai';
import 'mocha';

import { getTypeName  } from '../lib/utils'

class A {

}

class B extends A {

}

describe('getTypeName', () => {
  it('it should return A', () => {
    const result = getTypeName(new A());
    expect(result).to.equal('A');
  });

});