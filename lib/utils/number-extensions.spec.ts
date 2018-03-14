
import { expect } from 'chai';
import 'mocha';

import './number-extensions'


describe('isCloseTo', () => {
    it('it should return initial true', () => {
        const result = 10.0.isCloseTo(10.00000000000001);
        expect(result).to.be.true;
    });
});
