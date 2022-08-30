import { ILobbyQuizRoundsTitle } from '@quiz/models/data-models/ILobbyQuizRoundsTitle';

export interface LobbyQuizResponse {
    lobby: {
        quiz: ILobbyQuizRoundsTitle;
    }
}

