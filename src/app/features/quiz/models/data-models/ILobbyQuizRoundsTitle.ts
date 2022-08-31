import { IQuizQuestion } from '@quiz/models/data-models/QuizQuestion';
import { LobbyShortQuestionStatus } from '@lobby/models/data-models/LobbyShortQuestion';

export interface ILobbyQuizRoundsTitle {
    title: string;
    rounds: {
        [key: number] : IQuizLobbyQuestion[]
    }
}

export interface IQuizLobbyQuestion extends IQuizQuestion {
    id :number;
    questionStatus: LobbyShortQuestionStatus;
}
