import { ISupportCommandCanExecuteChanged } from './contracts';
export declare class Command {
    executeHandler: ((command: Command, parameter: any) => void) | undefined;
    canExecuteHandler: ((command: Command, parameter: any) => boolean) | undefined;
    constructor(executeHandler?: ((command: Command, parameter: any) => void) | undefined, canExecuteHandler?: ((command: Command, parameter: any) => boolean) | undefined);
    canExecute(parameter: any): boolean;
    execute(parameter: any): void;
    private handlers;
    onCanExecuteChangeNotify(handler: ISupportCommandCanExecuteChanged): void;
    offCanExecuteChangeNotify(handler: ISupportCommandCanExecuteChanged): void;
    canExecuteChanged(): void;
}
