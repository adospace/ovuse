"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../lib/utils");
class A {
    get baseProperty() {
        return "A.basePropertyValue";
    }
}
class B extends A {
    constructor() {
        super();
    }
    get property() {
        return "B.propertyValue";
    }
}
describe('getTypeName', () => {
    it('it should return B', () => {
        const result = utils_1.getTypeName(new B());
        chai_1.expect(result).to.equal('B');
    });
});
describe('getFirstAnchestor', () => {
    it("it should return A with property 'baseProperty'", () => {
        const result = utils_1.getFirstAnchestor(new B());
        chai_1.expect(result).to.have.property('baseProperty');
    });
});
describe('getPropertyValue', () => {
    it("it should return B.propertyValue", () => {
        const result = utils_1.getPropertyValue(new B(), "property");
        chai_1.expect(result).to.equal('B.propertyValue');
    });
});
describe('getPropertyValue', () => {
    it("it should return A.basePropertyValue", () => {
        const result = utils_1.getPropertyValue(utils_1.getFirstAnchestor(new B()), "baseProperty");
        chai_1.expect(result).to.equal('A.basePropertyValue');
    });
});
