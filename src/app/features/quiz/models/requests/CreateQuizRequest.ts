import { IQuizCreateQuestion } from '@quiz/models/data-models';

export interface ICreateQuizRequest {
    title: string,
    private: boolean,
    tags: string[],
    questions: IQuizCreateQuestion[]
}
