import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '@shared/models/DTO/responses/user/user-response';
import { APP_CONFIG } from '@shared/constraints/config-injection-token';
import { IConfig } from '@shared';

@Injectable()
export class UserService {

    private apiRoute: string = '/users';

    private readonly apiUrl: string;

    constructor(@Inject(APP_CONFIG) private config: IConfig,
                private http: HttpClient) {
        this.apiUrl = this.config.api;
    }

    public getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(this.apiUrl + this.apiRoute + '/getUser');
    }
}
