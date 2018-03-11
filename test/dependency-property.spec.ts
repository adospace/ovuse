
/* import { expect } from 'chai';
import 'mocha';

import "reflect-metadata";

const formatMetadataKey = "default-value";

function dependencyProperty(
    defaultValue?: any, 
    options?: any, 
    converter?: 
    { 
        (value: string): any 
    }) {
    console.log("evaliuating {0}", );
    return Reflect.metadata(formatMetadataKey, defaultValue);
}

function dependencyObject(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@dependencyObject
class A {

    @dependencyProperty(10)
    myProperty: number | null = null;


}

describe('getPrototypeOf', () => {
    it('it should return true', () => {
        const result = (new A()).myProperty;
        expect(result).equal(10);
    });
}); */