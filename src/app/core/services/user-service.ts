import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '@shared/models/DTO/responses/user/user-response';
import { BaseService } from '@core/services/base-service';

@Injectable()
export class UserService {

    private apiRoute: string = '/users';

    private readonly apiUrl: string;

    constructor(private http: HttpClient,
                private baseService: BaseService) {
        this.apiUrl = this.baseService.getConfigData('api');
    }

    public getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(this.apiUrl + this.apiRoute + '/getUser');
    }
}
