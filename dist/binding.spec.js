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
let A = A_1 = class A extends lib_1.DependencyObject {
};
A.propertyOnSource = lib_1.DependencyObject.registerProperty(A_1, "PropertyOnSource");
A = A_1 = __decorate([
    lib_1.TypeId("TypeA")
], A);
let B = B_1 = class B extends lib_1.DependencyObject {
};
B.propertyOnTarget = lib_1.DependencyObject.registerProperty(B_1, "PropertyOnTarget");
B = B_1 = __decorate([
    lib_1.TypeId("TypeB")
], B);
describe('Source A -> Target B', () => {
    it('it should return true', () => {
        var a = new A();
        var b = new B();
        var binding = new lib_1.Binding(b, B.propertyOnTarget, "PropertyOnSource", a);
        //change value on source
        a.setValue(A.propertyOnSource, "my-value");
        //after binding both contains same value
        const result = a.getValue(A.propertyOnSource) == b.getValue(B.propertyOnTarget);
        chai_1.expect(result).to.be.true;
    });
});
describe('Source A <-> Target B', () => {
    it('it should return true', () => {
        var a = new A();
        var b = new B();
        var binding = new lib_1.Binding(b, B.propertyOnTarget, "PropertyOnSource", a, true);
        //change value on target
        b.setValue(B.propertyOnTarget, "my-value");
        //after binding both contains same value
        const result = a.getValue(A.propertyOnSource) == b.getValue(B.propertyOnTarget);
        chai_1.expect(result).to.be.true;
    });
});
var A_1, B_1;
