import { IQuestion } from '@quiz/models/data-models/quiz-question';

export interface IQuiz {
    title: string,
    private: boolean,
    tags: string[],
    questions: IQuestion[]
}

