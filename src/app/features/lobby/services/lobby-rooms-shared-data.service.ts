import { Injectable } from '@angular/core';
import { LobbyStatusResponse } from '@lobby/models/responses/LobbyStatusResponse';

@Injectable()
export class LobbyRoomsSharedDataService {

    public currentLobbyStatus: LobbyStatusResponse | undefined;

    constructor() {
    }

}
