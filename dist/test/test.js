"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/index");
var chai_1 = require("chai");
require("mocha");
describe('Hello function', function () {
    it('should return hello world', function () {
        var result = index_1.capitalizeFirstLetter("test!");
        chai_1.expect(result).to.equal('Test!');
    });
});
