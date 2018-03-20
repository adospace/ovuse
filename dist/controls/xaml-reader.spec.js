"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const _1 = require(".");
const __1 = require("..");
describe('Xaml page', () => {
    it('it should return true', () => {
        var xamlReader = new _1.XamlReader();
        var page = xamlReader.Parse(`
          <Page>
          </Page>
        `);
        chai_1.expect(page).not.null;
        chai_1.expect(__1.getObjectTypeId(page)).to.be.eq("ovuse.controls.Page");
    });
});
describe('Xaml page with one textblock as child', () => {
    it('it should return true', () => {
        var xamlReader = new _1.XamlReader();
        var page = xamlReader.Parse(`
        <Page>
          <TextBlock>Some HTML here</TextBlock>
        </Page>
      `);
        chai_1.expect(page).not.null;
        chai_1.expect(__1.getObjectTypeId(page)).to.be.eq("ovuse.controls.Page");
        chai_1.expect(page.child).not.null;
        chai_1.expect(__1.getObjectTypeId(page.child)).to.be.eq("ovuse.controls.TextBlock");
    });
});
