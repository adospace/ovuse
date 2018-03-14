"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
require("./number-extensions");
describe('isCloseTo', function () {
    it('it should return initial true', function () {
        var result = 10.0.isCloseTo(10.00000000000001);
        chai_1.expect(result).to.be.true;
    });
});
