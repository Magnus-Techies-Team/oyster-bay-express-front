import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shared/constraints/config-injection-token';
import { HttpParameter, IApiConfig, IConfig } from '@shared';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService {

    public apiConfig: IApiConfig;

    constructor(@Inject(APP_CONFIG) private config: IConfig) {
        this.apiConfig = config as IApiConfig;
    }

    public setHttpParams(params: HttpParameter[]): HttpParams {
        let httpParams: HttpParams = new HttpParams();
        params.forEach(p => {
            if (Array.isArray(p.value)) {
                httpParams = httpParams.append(p.key, p.value.join(', '));
            } else {
                httpParams = httpParams.append(p.key, p.value);
            }
        });
        return httpParams;
    }
    
    
}
