"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const lib_1 = require("../lib");
let A = class A {
};
A = __decorate([
    lib_1.TypeId("a-uniqueid")
], A);
let B = class B extends A {
};
B = __decorate([
    lib_1.TypeId("b-uniqueid")
], B);
describe('getPrototypeOf', () => {
    it('it should return true', () => {
        const result = Object.getPrototypeOf(new A()) == Object.getPrototypeOf(new A());
        chai_1.expect(result).to.be.true;
    });
});
describe('typeId', () => {
    it("it should return 'a-uniqueid'", () => {
        const result = lib_1.getObjectTypeId(new A());
        chai_1.expect(result).to.equal('a-uniqueid');
    });
});
describe('typeId of base class', () => {
    it("it should return 'b-uniqueid'", () => {
        const result = lib_1.getObjectTypeId(new B());
        chai_1.expect(result).to.equal('b-uniqueid');
    });
});
describe('typeId of type class', () => {
    it("it should return 'a-uniqueid'", () => {
        const result = lib_1.getTypeId(A);
        chai_1.expect(result).to.equal('a-uniqueid');
    });
});
describe('componentName of base type class', () => {
    it("it should return 'b-uniqueid'", () => {
        const result = lib_1.getTypeId(B);
        chai_1.expect(result).to.equal('b-uniqueid');
    });
});
