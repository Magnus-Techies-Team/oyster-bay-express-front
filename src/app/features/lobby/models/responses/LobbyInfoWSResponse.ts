import { ILobbyUser } from '@lobby/models/data-models/LobbyUser';
import { ILobbyPlayer } from '@lobby/models/data-models/LobbyPlayer';
import { LobbyStatus } from '@lobby/models/data-models';
import { LobbyCondition } from '@lobby/models/data-models/LobbyCondition';
import { LobbyShortQuestion } from '@lobby/models/data-models/LobbyShortQuestion';
import { IQuizLobbyQuestion } from '@quiz/models/data-models/ILobbyQuizRoundsTitle';
// import { IError } from '@shared';

export interface LobbyInfoWSResponse {
    id: string;
    host: ILobbyUser;
    users: ILobbyPlayer[];
    spectators: ILobbyUser[]
    quizId: string;
    maxPlayers: number;
    state: LobbyStatus;
    currentRound: number;
    assignee: string;
    condition: LobbyCondition,
    questions: LobbyShortQuestion[];
    currentQuestion: IQuizLobbyQuestion;
    // error?: IError;
}
