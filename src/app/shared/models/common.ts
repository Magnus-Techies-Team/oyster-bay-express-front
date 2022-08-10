export interface IError {
    status: number;
    type: string;
    message: string;
}

export interface ICommonState {
    isLoaded: boolean;
    error: IError | null
}

export interface Config {
    api: string;
}
