import { Command } from '../';
export interface ISupportCommandCanExecuteChanged {
    onCommandCanExecuteChanged(command: Command): void;
}
