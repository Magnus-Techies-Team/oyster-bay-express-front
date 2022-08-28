import { IQuizQuestion } from '@quiz/models/data-models/quiz-question';

export interface IShortQuiz {
    author: string;
    author_username: string;
    id: string;
    private: boolean;
    tags: string[];
    title: string;
}

export interface IQuiz extends IShortQuiz {
    roundTopics: number;
    topicQuestions: number;
    totalRounds: number;
    rounds: {
        [key: number] : IQuizQuestion[]
    }
}

