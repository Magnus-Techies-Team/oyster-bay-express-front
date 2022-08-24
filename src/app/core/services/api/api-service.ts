import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shared/constraints/config-injection-token';
import { IApiConfig, IConfig } from '@shared';

@Injectable()
export class ApiService {

    public apiConfig: IApiConfig;

    constructor(@Inject(APP_CONFIG) private config: IConfig) {
        this.apiConfig = config as IApiConfig;
    }
    
    
}
