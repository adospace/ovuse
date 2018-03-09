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
var A = /** @class */ (function () {
    function A() {
    }
    A = __decorate([
        lib_1.component('my-component-a')
    ], A);
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B = __decorate([
        lib_1.component('my-component-b')
    ], B);
    return B;
}(A));
describe('getPrototypeOf', function () {
    it('it should return true', function () {
        var result = Object.getPrototypeOf(new A()) == Object.getPrototypeOf(new A());
        chai_1.expect(result).to.be.true;
    });
});
describe('componentName', function () {
    it("it should return 'my-component-a'", function () {
        var result = lib_1.componentName(new A());
        chai_1.expect(result).to.equal('my-component-a');
    });
});
describe('componentName of base class', function () {
    it("it should return 'my-component-b'", function () {
        var result = lib_1.componentName(new B());
        chai_1.expect(result).to.equal('my-component-b');
    });
});
