"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
require("./number-extensions");
describe('isCloseTo', () => {
    it('it should return initial true', () => {
        const result = 10.0.isCloseTo(10.00000000000001);
        chai_1.expect(result).to.be.true;
    });
});
