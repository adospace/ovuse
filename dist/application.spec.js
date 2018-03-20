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
const controls_1 = require("./controls");
const _1 = require(".");
const application_1 = require("./application");
require('jsdom-global')("", {
    /* any jsdom options you need, e.g: */
    url: "http://localhost"
});
let App = class App extends _1.Application {
};
App = __decorate([
    application_1.ApplicationElement("my-app")
], App);
let HomePage = class HomePage extends controls_1.Page {
};
HomePage = __decorate([
    _1.DependencyObjectId("tests.Home")
], HomePage);
let Page1 = class Page1 extends controls_1.Page {
};
Page1 = __decorate([
    _1.DependencyObjectId("tests.Page1")
], Page1);
let Page2 = class Page2 extends controls_1.Page {
};
Page2 = __decorate([
    _1.DependencyObjectId("tests.Page2")
], Page2);
describe('Application routing', () => {
    before(() => {
        var app = new App();
    }),
        it('it should return true', () => {
            var app = _1.Application.current;
            chai_1.expect(app.container).null;
        });
});
describe('Application routing', () => {
    before(() => {
        // runs before all tests in this block
        var app = _1.Application.current;
        app.map('/page1', 'tests/Page1');
        app.map('/page2', 'tests/Page2');
        app.map('', 'tests/Home');
    }),
        it('it should return true', () => {
            var app = _1.Application.current;
            app.navigate();
            chai_1.expect(app.page).not.null;
            chai_1.expect(_1.getObjectTypeId(app.page)).to.be.eq("tests.Home");
        }),
        it('it should return true', () => {
            var app = _1.Application.current;
            app.navigate('/page1');
            chai_1.expect(app.page).not.null;
            chai_1.expect(_1.getObjectTypeId(app.page)).to.be.eq("tests.Page1");
        }),
        it('it should return true', () => {
            var app = _1.Application.current;
            app.navigate('/page1');
            app.onBeforeNavigate = (ctx) => {
                //cancel navigation
                if (ctx.nextUri == "/page2")
                    ctx.cancel = true;
            };
            app.navigate('/page2');
            chai_1.expect(app.page).not.null;
            chai_1.expect(_1.getObjectTypeId(app.page)).to.be.eq("tests.Page1");
        });
});
