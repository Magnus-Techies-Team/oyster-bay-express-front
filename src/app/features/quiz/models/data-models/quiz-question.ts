import { IQuizQuestionType } from '@quiz/models/data-models/quiz-question-type';

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


