import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '@shared/models/DTO/responses/user/user-response';
import { UserSignInRequest } from '@shared/models/DTO/requests/user-auth/user-sign-in-request';
import { UserSignUpRequest } from '@shared/models/DTO/requests/user-auth/user-sign-up-request';
import { APP_CONFIG } from '@shared/constraints/config-injection-token';
import { IConfig } from '@shared';
import { ISignInResponse } from '@shared/models/DTO/responses/signin/sign-in-response';

@Injectable()
export class AuthService {

    private apiRoute: string = '/users';

    private readonly apiUrl: string;

    constructor(@Inject(APP_CONFIG) private config: IConfig,
                private http: HttpClient) {
        this.apiUrl = this.config.api;
    }

    public signIn(signInReq: UserSignInRequest): Observable<ISignInResponse> {
        return this.http.post<ISignInResponse>(this.apiUrl + this.apiRoute + '/signIn', signInReq);
    }

    public signUp(signUpReq: UserSignUpRequest): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.apiUrl + this.apiRoute + '/signUp', signUpReq );
    }

    public signOut(): Observable<void> {
        return this.http.post<void>(this.apiUrl + this.apiRoute + '/signOut', {});
    }

}
