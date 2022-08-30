import { HttpHeaders } from '@angular/common/http';

export interface IError {
    type: string;
    message: string;
}

export interface IHttpErrorResponse {
    error: IError | any;
    headers: HttpHeaders;
    message: string;
    name: string;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
}

export interface ICommonState {
    isLoaded: boolean;
    error: IHttpErrorResponse | null
}

export interface IApiConfig {
    api: string;
    ws_api: string;
}

export interface IConfig extends IApiConfig {
    test: string;
}

export interface HttpParameter {
    key: string;
    value: any
}


