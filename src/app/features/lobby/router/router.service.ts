import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePathConstraints } from '@shared/constraints/route-path-constraints';

@Injectable()
export class LobbyRouterService {

    private featurePath: string = RoutePathConstraints.LOBBY.fullPath;
    
    constructor(private router: Router) {
    }
    
    public toWaitingRoom(lobbyId: string): void {
        this.router.navigate([this.featurePath + `/${lobbyId}/waiting-room`]);
    }

    public toGameRoom(lobbyId: string): void {
        this.router.navigate([this.featurePath + `/${lobbyId}/game-room`]);
    }
    
}
