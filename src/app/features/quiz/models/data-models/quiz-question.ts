import { IQuizQuestionType } from '@shared/models/DTO/data-models/quiz-creation/quiz-question-type';

export interface IQuestion {
    question: string,
    round: number,
    answer: string,
    cost: number,
    topic: string,
    type: IQuizQuestionType,
    filepath: string | null,
}
