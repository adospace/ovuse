

/**
* @Method: Capitalize first letter
* @Param {string}
* @Return {string}
*/
export function capitalizeFirstLetter (str: string) : string {
    if (str == null)
        throw new Error("'str' can't be null");

    if (str.length == 0)
        return str;

    return str[0].toUpperCase() + str.slice(1);
  }