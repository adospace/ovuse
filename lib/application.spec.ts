import { expect } from 'chai';
import 'mocha';

import { XamlReader, Page  } from './controls'
import { Application, DependencyObjectId, getObjectTypeId } from '.'
import { ApplicationElement } from './application';

require('jsdom-global')("", {
    /* any jsdom options you need, e.g: */
    url: "http://localhost"
});

@ApplicationElement("my-app")
class App extends Application{

}

@DependencyObjectId("tests.Home")
class HomePage extends Page { }

@DependencyObjectId("tests.Page1")
class Page1 extends Page { }

@DependencyObjectId("tests.Page2")
class Page2 extends Page { }

describe('Application routing', () => {

    before(() => {
        var app = new App();
      }),

    it('it should return true', () => {
        var app = Application.current;
        expect(app.container).null;
    })
});

describe('Application routing', () => {

    before(() => {
        // runs before all tests in this block
        var app = Application.current;

        app.map('/page1', 'tests/Page1');
        app.map('/page2', 'tests/Page2');
        app.map('', 'tests/Home');

      }),

    it('it should return true', () => {
        var app = Application.current;

        app.navigate();

        expect(app.page).not.null;
        expect(getObjectTypeId(app.page)).to.be.eq("tests.Home");
      }),

    it('it should return true', () => {
        var app = Application.current;

        app.navigate('/page1');

        expect(app.page).not.null;
        expect(getObjectTypeId(app.page)).to.be.eq("tests.Page1");
      }),

    it('it should return true', () => {
        var app = Application.current;

        app.navigate('/page1');

        app.onBeforeNavigate = (ctx)=>{
            //cancel navigation
            if (ctx.nextUri == "/page2")
                ctx.cancel = true;
        };

        app.navigate('/page2');

        expect(app.page).not.null;
        expect(getObjectTypeId(app.page)).to.be.eq("tests.Page1");
      });
});