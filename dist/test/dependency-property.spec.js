"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
require("reflect-metadata");
var formatMetadataKey = "default-value";
function dependencyProperty(defaultValue, options, converter) {
    console.log("evaliuating {0}");
    return Reflect.metadata(formatMetadataKey, defaultValue);
}
function dependencyObject(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
var A = /** @class */ (function () {
    function A() {
        this.myProperty = null;
    }
    __decorate([
        dependencyProperty(10),
        __metadata("design:type", Object)
    ], A.prototype, "myProperty", void 0);
    A = __decorate([
        dependencyObject
    ], A);
    return A;
}());
describe('getPrototypeOf', function () {
    it('it should return true', function () {
        var result = (new A()).myProperty;
        chai_1.expect(result).equal(10);
    });
});
