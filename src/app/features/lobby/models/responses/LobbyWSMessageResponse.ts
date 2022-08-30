import { LobbyInfoWSResponse } from '@lobby/models/responses/LobbyInfoWSResponse';
import { IError } from '@shared';
import { ILobbyUser } from '@lobby/models/data-models/LobbyUser';
import { ILobbyPlayer } from '@lobby/models/data-models/LobbyPlayer';

export interface LobbyWSMessageResponse {
    response: LobbyWSMessageResponseType;
}

export type LobbyWSMessageResponseType = DefaultLobbyWSMessageBodyResponse | 
    LobbyWSConnectionEstablishedResponse | 
    LobbyWSMessageError | 
    LobbyEndWSResponse;


export interface DefaultLobbyWSMessageBodyResponse {
    lobby: LobbyInfoWSResponse;
    currentUser: ILobbyUser;
}

export interface LobbyWSConnectionEstablishedResponse {
    connection: string;
}

export interface LobbyEndWSResponse extends DefaultLobbyWSMessageBodyResponse {
    winner: ILobbyPlayer;
}

// export interface ValidateLobbyAnswerWSMessageBodyResponse extends DefaultLobbyWSMessageBodyResponse {
//     actionInfo: {
//         playerId: string;
//         questionId: string;
//         playerScore: number;
//         isRight :boolean
//     }
// }

export interface LobbyWSMessageError {
    error: IError;
}

export function isLobbyWSMessageError(object: LobbyWSMessageResponseType): object is LobbyWSMessageError {
    return 'error' in object;
}

export function isDefaultLobbyWSMessageBodyResponse(object: LobbyWSMessageResponseType): object is DefaultLobbyWSMessageBodyResponse {
    return 'lobby' in object && 'currentUser' in object;
}

export function isLobbyWSConnectionEstablishedResponse(object: LobbyWSMessageResponseType): object is LobbyWSConnectionEstablishedResponse {
    return 'connection' in object;
}

export function isLobbyEndWSResponse(object: LobbyWSMessageResponseType): object is LobbyEndWSResponse {
    return 'winner' in object;
}
