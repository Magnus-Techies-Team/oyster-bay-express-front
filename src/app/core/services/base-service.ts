import { Injectable } from '@angular/core';
import { Config } from '@shared';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseService {

    private config: Config | undefined;

    constructor(private http: HttpClient) {
    }

    public initConfig(): Promise<boolean> {
        return new Promise<boolean>(((resolve, reject) => {
            this.http.get<Config>('./assets/configs/config.json').subscribe(config => {
                this.config = config;
                resolve(true);
            },
            error => {
                reject(error);
                throw error;
            });
        }));
    }

    getConfigData(dataName: keyof Config): any {
        return this.config ? this.config[dataName] : null;
    }

}
