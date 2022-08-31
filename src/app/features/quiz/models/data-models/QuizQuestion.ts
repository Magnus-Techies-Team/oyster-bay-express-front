import { IQuizQuestionType } from '@quiz/models/data-models/QuizQuestionType';

export interface IQuizQuestion {
    answer: string,
    cost: number;
    question: string;
    topic: string;
    type: IQuizQuestionType;
}

export interface IQuizCreateQuestion extends IQuizQuestion {
    round: number;
    filepath: string | null;
}


