import { LobbyStatus, LobbyUserStatus } from '@lobby/models/data-models';

export interface LobbyStatusResponse {
    lobbyStatus: LobbyStatus;
    userStatus: LobbyUserStatus;
}
