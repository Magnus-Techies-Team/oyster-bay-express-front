import { IQuizQuestionType } from '@quiz/models/data-models/quiz-question-type';

export interface IQuestion {
    question: string,
    round: number,
    answer: string,
    cost: number,
    topic: string,
    type: IQuizQuestionType,
    filepath: string | null,
}
