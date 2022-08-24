import { IQuestion } from '@shared/models/DTO/data-models/quiz-creation/quiz-question';

export interface IQuiz {
    title: string,
    private: boolean,
    tags: string[],
    questions: IQuestion[]
}

