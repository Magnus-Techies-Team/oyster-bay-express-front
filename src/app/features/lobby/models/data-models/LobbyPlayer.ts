import { ILobbyUser } from '@lobby/models/data-models/LobbyUser';

export interface ILobbyPlayer extends ILobbyUser {
    points: number;
}
