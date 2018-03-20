import { expect } from 'chai';
import 'mocha';

import { XamlReader, Page  } from '.'
import { getTypeId, getObjectTypeId } from '..';


describe('Xaml page', () => {
    it('it should return true', () => {
        
        var xamlReader = new XamlReader();
        var page = <Page>xamlReader.Parse(`
          <Page>
          </Page>
        `);

        expect(page).not.null;
        expect(getObjectTypeId(page)).to.be.eq("ovuse.controls.Page");
      });
});

describe('Xaml page with one textblock as child', () => {
  it('it should return true', () => {
      
      var xamlReader = new XamlReader();
      var page = <Page>xamlReader.Parse(`
        <Page>
          <TextBlock>Some HTML here</TextBlock>
        </Page>
      `);

      expect(page).not.null;
      expect(getObjectTypeId(page)).to.be.eq("ovuse.controls.Page");
      expect(page.child).not.null;
      expect(getObjectTypeId(page.child)).to.be.eq("ovuse.controls.TextBlock");
  });
});