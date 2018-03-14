export {  };
declare global  {
    interface Array<T> {
        firstOrDefault(callback: (item: T, index: number) => boolean, defaultValue: T | null): T;
    }
}
