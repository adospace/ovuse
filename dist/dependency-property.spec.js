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
const lib_2 = require("../lib");
let A = A_1 = class A extends lib_2.DependencyObject {
    get myProperty() {
        return this.getValue(A_1.myProperty);
    }
    set myProperty(value) {
        this.setValue(A_1.myProperty, value);
    }
};
A.myProperty = lib_2.DependencyObject.registerProperty(A_1, "MyProperty", 23);
A = A_1 = __decorate([
    lib_1.DependencyObjectId("ObjectTypeA")
], A);
let B = B_1 = class B extends A {
    static initProperties() {
        A.myProperty.overrideDefaultValue(B_1, -1);
    }
    get myProperty() {
        return this.getValue(B_1.myProperty);
    }
    set myProperty(value) {
        this.setValue(B_1.myProperty, value);
    }
};
B._init = B_1.initProperties();
B.myProperty = lib_2.DependencyObject.registerProperty(B_1, "MyProperty", 1);
B = B_1 = __decorate([
    lib_1.DependencyObjectId("ObjectTypeB")
], B);
describe('dependency-property', () => {
    it('it should return initial value 23', () => {
        const result = (new A()).getValue(A.myProperty);
        chai_1.expect(result).equal(23);
    });
});
describe('dependency-property get default value', () => {
    it('it should return initial value 23', () => {
        const result = new A().myProperty;
        chai_1.expect(result).equal(23);
    });
});
describe('dependency-property set and get', () => {
    it('it should return value 12', () => {
        var a = new A();
        a.myProperty = 12;
        const result = a.myProperty;
        chai_1.expect(result).equal(12);
    });
});
describe('dependency-property for derived type', () => {
    it('it should return initial value for type B -> 1', () => {
        const result = (new B()).getValue(B.myProperty);
        chai_1.expect(result).equal(1);
    });
});
describe('dependency-property for derived type default value changed for parent type', () => {
    it('it should return initial value for type B of A.myProperty -> -1', () => {
        const result = (new B()).getValue(A.myProperty);
        chai_1.expect(result).equal(-1);
    });
});
var A_1, B_1;
