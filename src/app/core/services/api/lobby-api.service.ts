import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api/api-service';
import { IAvailableLobbiesResponse } from '@lobby/models/responses';
import { ActiveLobbyIdResponse } from '@lobby/models/responses/ActiveLobbyIdResponse';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
    CreateLobbyWSRequestBody,
    JoinLobbyWSRequestBody,
    LobbyWSMessageRequest,
    SetLobbyQuestionWSRequestBody,
    SpectateLobbyWSRequestBody,
    StartLobbyWSRequestBody,
    TakeLobbyQuestionWSRequestBody,
    ValidateLobbyAnswerWSRequestBody,
} from '@lobby/models/requests/LobbyWSMessageRequest';
import { LobbyStatusResponse } from '@lobby/models/responses/LobbyStatusResponse';
import { LobbyMethods } from '@lobby/models/data-models';
import {
    isLobbyWSConnectionEstablishedResponse, isLobbyWSMessageError,
    LobbyWSMessageError,
    LobbyWSMessageResponse,
} from '@lobby/models/responses/LobbyWSMessageResponse';
import { WSError } from '@shared/utils/error-util';
import { IError } from '@shared';
import { LobbyQuizResponse } from '@lobby/models/responses/LobbyQuizResponse';

@Injectable()
export class LobbyApiService {
    
    private readonly apiRoute: string = '/lobby';

    private readonly apiUrl: string;

    private readonly wsApiUrl: string;
    
    private lobbyConnection: WebSocketSubject<any> | undefined;
    
    public lobbyMessagesSubject$: BehaviorSubject<LobbyWSMessageResponse | null> = new BehaviorSubject<LobbyWSMessageResponse | null>(null);

    public lobbyMessagesObs$: Observable<LobbyWSMessageResponse> = (this.lobbyMessagesSubject$ as BehaviorSubject<LobbyWSMessageResponse>)
        .asObservable()
        .pipe(filter(message => !!message));

    public connectionEstablished: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    constructor(private http: HttpClient,
                private apiService: ApiService) {
        this.apiUrl = this.apiService.apiConfig.api;
        this.wsApiUrl = this.apiService.apiConfig.ws_api;
    }
    
    public getAllAvailableLobbies(): Observable<IAvailableLobbiesResponse> {
        return this.http.get<IAvailableLobbiesResponse>(this.apiUrl + this.apiRoute + '/getAllAvailableLobbies');
    }
    
    public getUserActiveLobby(): Observable<ActiveLobbyIdResponse> {
        return this.http.get<ActiveLobbyIdResponse>(this.apiUrl + this.apiRoute + '/getUserActiveLobby');
    }
    
    public getLobbyStatus(lobbyId: string): Observable<LobbyStatusResponse> {
        return this.http.get<LobbyStatusResponse>(this.apiUrl + this.apiRoute + `/getCurrentLobbyStatus/${lobbyId}`);
    }

    public getLobbyByID(lobbyId: string): Observable<LobbyQuizResponse> {
        return this.http.get<LobbyQuizResponse>(this.apiUrl + this.apiRoute + `/getLobby/${lobbyId}`);
    }

    public setLobbyConnection(): void {
        this.lobbyConnection = webSocket(this.wsApiUrl);
        this.lobbyConnection.subscribe((message: LobbyWSMessageResponse) => {
            if (isLobbyWSConnectionEstablishedResponse(message.response)) {
                this.connectionEstablished.next(true);
            } else if (!isLobbyWSMessageError(message.response)) {
                this.lobbyMessagesSubject$.next(message);
                this.connectionEstablished.next(true);
            }

            const error: IError = (message.response as LobbyWSMessageError)?.error; 
            if (error) {
                throw new WSError(error);
            }
        });
    }

    private sendMessage(message: LobbyWSMessageRequest<
        CreateLobbyWSRequestBody |
        JoinLobbyWSRequestBody |
        SpectateLobbyWSRequestBody |
        StartLobbyWSRequestBody |
        SetLobbyQuestionWSRequestBody |
        TakeLobbyQuestionWSRequestBody |
        ValidateLobbyAnswerWSRequestBody>): void {
        this.lobbyConnection?.next(message);
    }

    public createLobby(createLobbyRequestBody: CreateLobbyWSRequestBody): void {
        this.sendMessage({
            request: {
                method: LobbyMethods.CREATE_LOBBY,
                body: createLobbyRequestBody,
            },
        });
    }

    public spectateLobby(spectateLobbyRequestBody: SpectateLobbyWSRequestBody): void {
        this.sendMessage({
            request: {
                method: LobbyMethods.SPECTATE_LOBBY,
                body: spectateLobbyRequestBody,
            },
        });
    }

    public joinLobby(joinLobbyRequestBody: JoinLobbyWSRequestBody): void {
        this.sendMessage({
            request: {
                method: LobbyMethods.JOIN_LOBBY,
                body: joinLobbyRequestBody,
            },
        });
    }

    public startLobby(startLobbyRequestBody: StartLobbyWSRequestBody): void {
        this.sendMessage({
            request: {
                method: LobbyMethods.START_LOBBY,
                body: startLobbyRequestBody,
            },
        });
    }

    public setLobbyQuestion(setLobbyQuestionRequestBody: SetLobbyQuestionWSRequestBody): void {
        this.sendMessage({
            request: {
                method: LobbyMethods.SET_QUESTION,
                body: setLobbyQuestionRequestBody,
            },
        });
    }

    public takeLobbyQuestion(takeLobbyQuestionRequestBody: TakeLobbyQuestionWSRequestBody): void {
        this.sendMessage({
            request: {
                method: LobbyMethods.TAKE_QUESTION,
                body: takeLobbyQuestionRequestBody,
            },
        });
    }

    public validateLobbyAnswer(validateLobbyAnswerRequestBody: ValidateLobbyAnswerWSRequestBody): void {
        this.sendMessage({
            request: {
                method: LobbyMethods.VALIDATE_ANSWER,
                body: validateLobbyAnswerRequestBody,
            },
        });
    }

    public breakTheConnection(): void {
        this.lobbyConnection?.complete();
    }

}
