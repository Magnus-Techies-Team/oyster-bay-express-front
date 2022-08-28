import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api/api-service';
import { Observable } from 'rxjs';
import { IAvailableLobbiesResponse } from '@lobby/models/responses';
import { ActiveLobbyId } from '@lobby/models/responses/ActiveLobbyId';


@Injectable()
export class LobbyApiService {

    private apiRoute: string = '/lobby';

    private readonly apiUrl: string;
    
    constructor(private http: HttpClient,
                private apiService: ApiService) {
        this.apiUrl = this.apiService.apiConfig.api;
    }
    
    public getAllAvailableLobbies(): Observable<IAvailableLobbiesResponse> {
        return this.http.get<IAvailableLobbiesResponse>(this.apiUrl + this.apiRoute + '/getAllAvailableLobbies');
    }
    
    public getUserActiveLobby(): Observable<ActiveLobbyId> {
        return this.http.get<ActiveLobbyId>(this.apiUrl + this.apiRoute + '/getUserActiveLobby');
    }
    
}
