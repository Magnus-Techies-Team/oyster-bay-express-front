import { LobbyMethods } from '@lobby/models/data-models';

export interface LobbyWSMessageRequest<T> {
    request: LobbyWSMessageRequestBody<T>;
}

export interface LobbyWSMessageRequestBody<T> {
    method: LobbyMethods;
    body: T;
}

export interface CreateLobbyWSRequestBody {
    quizId: string;
}

export interface JoinLobbyWSRequestBody {
    lobbyId: string;
}

export interface SpectateLobbyWSRequestBody {
    lobbyId: string;
}

export interface StartLobbyWSRequestBody {
    lobbyId: string;
}

export interface SetLobbyQuestionWSRequestBody {
    lobbyId: string;
    questionId: number;
}

export interface TakeLobbyQuestionWSRequestBody {
    lobbyId: string;
}

export interface ValidateLobbyAnswerWSRequestBody {
    lobbyId: string;
    isRight: boolean;
}


