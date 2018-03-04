

export function format(input: string, ...args: any[]) : string {
    return input.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
}

export function toUpperFirstLetter(input: string) : string {
    return input.charAt(0).toUpperCase() + input.slice(1);    
}

export function toLowerFirstLetter(input: string) : string {
    return input.charAt(0).toLowerCase() + input.slice(1);    
}

export function startsWith(input: string, startsWith : string) : boolean {
    return input.lastIndexOf(startsWith, 0) == 0;
}
