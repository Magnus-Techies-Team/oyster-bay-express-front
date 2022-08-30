import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { LobbyApiService } from '@core/services/api/lobby-api.service';
import { mergeMap, Observable, of } from 'rxjs';
import { LobbyStatus } from '@lobby/models/data-models';
import { Injectable } from '@angular/core';
import { LobbyRouterService } from '@lobby/router';
import { NotfoundRouterService } from '@notfound/services/notfound-router.service';
import { LobbyRoomsSharedDataService } from '@lobby/services/lobby-rooms-shared-data.service';

@Injectable()
export class LobbyWaitingRoomGuard implements CanActivate {

    constructor(private lobbyApiService: LobbyApiService,
                private lobbyRouterService: LobbyRouterService,
                private notfoundRouterService: NotfoundRouterService,
                private lobbyRoomsSharedDataService: LobbyRoomsSharedDataService) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const lobbyId: string | null = route.paramMap.get('id');
        if (lobbyId) {
            const lobbyStatus: LobbyStatus | undefined = this.lobbyRoomsSharedDataService.currentLobbyStatus?.lobbyStatus;
            if (lobbyStatus) {
                return this.validateLobbyStatus(lobbyStatus, lobbyId);
            } else {
                return this.lobbyApiService.getLobbyStatus(lobbyId).pipe(
                    mergeMap(response => {
                        this.lobbyRoomsSharedDataService.currentLobbyStatus = response;
                        return this.validateLobbyStatus(response.lobbyStatus, lobbyId);
                    }),
                );
            }
        } else {
            this.notfoundRouterService.toNotfoundPage();
            return of(false);
        }
    }

    private validateLobbyStatus(lobbyStatus: LobbyStatus, lobbyId: string): Observable<boolean> {
        if (lobbyStatus === LobbyStatus.WAITING) {
            this.lobbyRoomsSharedDataService.currentLobbyStatus = undefined;
            return of(true);
        } else {
            this.lobbyRouterService.toGameRoom(lobbyId);
            return of(false);
        }
    }
}
