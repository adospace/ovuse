
import { ConverterContext } from '.'

export interface IConverter {
    convert(fromValue: any, context: ConverterContext): any;

    convertBack(fromValue: any, context: ConverterContext): any;
}