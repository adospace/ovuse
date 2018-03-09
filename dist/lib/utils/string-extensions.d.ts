export {  };
declare global  {
    interface String {
        format(...replacements: string[]): string;
        toUpperFirstLetter(): string;
        toLowerFirstLetter(): string;
        startsWith(other: string): boolean;
    }
}
