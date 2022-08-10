import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@core/services/base-service';
import { Observable } from 'rxjs';
import { UserResponse } from '@shared/models/DTO/responses/user/user-response';
import { UserSignInRequest } from '@shared/models/DTO/requests/user-auth/user-sign-in-request';
import { UserSignUpRequest } from '@shared/models/DTO/requests/user-auth/user-sign-up-request';

@Injectable()
export class AuthService {

    private apiRoute: string = '/users';

    private readonly apiUrl: string;

    constructor(private http: HttpClient,
                private baseService: BaseService) {
        this.apiUrl = this.baseService.getConfigData('api');
    }

    public signIn(signInReq: UserSignInRequest): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.apiUrl + this.apiRoute + '/login', { signInReq });
    }

    public signUp(signUpReq: UserSignUpRequest): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.apiUrl + this.apiRoute + '/createUser', { signUpReq });
    }

    public logOut(): Observable<void> {
        return this.http.post<void>(this.apiUrl + this.apiRoute + '/logout', {});
    }

}
