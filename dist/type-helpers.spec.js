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
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var utils_1 = require("../lib/utils");
var A = /** @class */ (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "baseProperty", {
        get: function () {
            return "A.basePropertyValue";
        },
        enumerable: true,
        configurable: true
    });
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super.call(this) || this;
    }
    Object.defineProperty(B.prototype, "property", {
        get: function () {
            return "B.propertyValue";
        },
        enumerable: true,
        configurable: true
    });
    return B;
}(A));
describe('getTypeName', function () {
    it('it should return B', function () {
        var result = utils_1.getTypeName(new B());
        chai_1.expect(result).to.equal('B');
    });
});
describe('getFirstAnchestor', function () {
    it("it should return A with property 'baseProperty'", function () {
        var result = utils_1.getFirstAnchestor(new B());
        chai_1.expect(result).to.have.property('baseProperty');
    });
});
describe('getPropertyValue', function () {
    it("it should return B.propertyValue", function () {
        var result = utils_1.getPropertyValue(new B(), "property");
        chai_1.expect(result).to.equal('B.propertyValue');
    });
});
describe('getPropertyValue', function () {
    it("it should return A.basePropertyValue", function () {
        var result = utils_1.getPropertyValue(utils_1.getFirstAnchestor(new B()), "baseProperty");
        chai_1.expect(result).to.equal('A.basePropertyValue');
    });
});
