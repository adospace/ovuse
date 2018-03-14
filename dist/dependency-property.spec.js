"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var lib_1 = require("../lib");
var lib_2 = require("../lib");
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    A_1 = A;
    Object.defineProperty(A.prototype, "myProperty", {
        get: function () {
            return this.getValue(A_1.myProperty);
        },
        set: function (value) {
            this.setValue(A_1.myProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    A.myProperty = lib_2.DependencyObject.registerPropertyByType(A_1, "MyProperty", 23);
    A = A_1 = __decorate([
        lib_1.typeId("MyObject")
    ], A);
    return A;
    var A_1;
}(lib_2.DependencyObject));
describe('dependency-property', function () {
    it('it should return initial value 23', function () {
        var result = (new A()).getValue(A.myProperty);
        chai_1.expect(result).equal(23);
    });
});
describe('dependency-property get default value', function () {
    it('it should return initial value 23', function () {
        var result = new A().myProperty;
        chai_1.expect(result).equal(23);
    });
});
describe('dependency-property set and get', function () {
    it('it should return value 12', function () {
        var a = new A();
        a.myProperty = 12;
        var result = a.myProperty;
        chai_1.expect(result).equal(12);
    });
});
