import { Component, OnDestroy, OnInit } from '@angular/core';
import { LobbyApiService } from '@core/services/api/lobby-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { LobbyStatus, LobbyUserStatus } from '@lobby/models/data-models';
import { ILobbyUser } from '@lobby/models/data-models/LobbyUser';
import { isDefaultLobbyWSMessageBodyResponse, LobbyWSMessageResponse } from '@lobby/models/responses/LobbyWSMessageResponse';
import { LobbyInfoWSResponse } from '@lobby/models/responses/LobbyInfoWSResponse';
import { LobbyRouterService } from '@lobby/router';

@Component({
    selector: 'app-waiting-room',
    templateUrl: './waiting-room.component.html',
    styleUrls: ['./waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
    
    public lobbyInfo: LobbyInfoWSResponse | undefined;
    
    private lobbyId: string | undefined | null;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    public currentUser: ILobbyUser | undefined;

    public get userStatuses(): typeof LobbyUserStatus {
        return LobbyUserStatus;
    }
    
    constructor(private lobbyApiService: LobbyApiService,
                private route: ActivatedRoute,
                private lobbyRouterService: LobbyRouterService) { }

    ngOnInit(): void {
        this.lobbyApiService.connectionEstablished.pipe(
            takeUntil(this.destroy$),
            filter(v => !!v),
            take(1),
        ).subscribe(() => {
            this.lobbyId = this.route.snapshot.paramMap.get('id');
            if (this.lobbyId) {
                const currentLobbyState: LobbyWSMessageResponse | null = this.lobbyApiService.lobbyMessagesSubject$.getValue();
                console.log(this.lobbyApiService.connectionEstablished.getValue(), currentLobbyState);
                if (currentLobbyState) {
                    this.setLobbyData(currentLobbyState);
                } else {
                    this.lobbyApiService.spectateLobby({ lobbyId: this.lobbyId });
                }
                this.initLobbySubscription();
            }
        });

    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    private initLobbySubscription(): void {
        if (this.lobbyId) {
            this.lobbyApiService.lobbyMessagesObs$.pipe(
                takeUntil(this.destroy$),
            ).subscribe(message => {
                this.setLobbyData(message);
                // if (isDefaultLobbyWSMessageBodyResponse(message.response)) {
                //     this.lobbyInfo = message.response.lobby;
                //     this.currentUser = message.response.currentUser;    
                // }
            });
        }
    }
    
    private setLobbyData(data: LobbyWSMessageResponse): void {
        if (isDefaultLobbyWSMessageBodyResponse(data.response)) {
            if (data.response.lobby.state === LobbyStatus.STARTED) {
                console.log('LOBBY STARTED!!!!!!!!!');
                this.lobbyRouterService.toGameRoom(data.response.lobby.id);   
            } else {
                this.lobbyInfo = data.response.lobby;
                this.currentUser = data.response.currentUser;    
            }
        }
    }

    public onJoinLobbyClick(): void {
        if (this.lobbyId) {
            this.lobbyApiService.joinLobby({ lobbyId: this.lobbyId });
        }
    }

    public onStartLobbyClick(): void {
        console.log(this.lobbyId);
        if (this.lobbyId) {
            this.lobbyApiService.startLobby({ lobbyId: this.lobbyId });
        }
    }

}
