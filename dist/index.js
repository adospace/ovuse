"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @Method: Capitalize first letter
* @Param {string}
* @Return {string}
*/
function capitalizeFirstLetter(str) {
    if (str == null)
        throw new Error("'str' can't be null");
    if (str.length == 0)
        return str;
    return str[0].toUpperCase() + str.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
