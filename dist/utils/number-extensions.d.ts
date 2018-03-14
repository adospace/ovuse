export {  };
declare global  {
    interface Number {
        isEpsilon(): boolean;
        isCloseTo(other: number): boolean;
        isLessThen(other: number): boolean;
        isGreaterThen(other: number): boolean;
        isCloseTo(other: number): boolean;
        minMax(min: number, max: number): number;
    }
}
