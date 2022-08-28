import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IQuizTag } from '@quiz/models/data-models/quiz-tag';


export interface IQuizForm {
    title: FormControl<string | null>; 
    isPrivate: FormControl<boolean | null>; 
    tags: FormControl<IQuizTag[] | null>; 
    rounds: IQuizFormRounds
}

export type IQuizFormRounds = FormArray<IQuizFormRound | never>;

export type IQuizFormRound = FormArray<IQuizFormTopic>;

export type IQuizFormTopic = FormGroup<{
    topicName: IQuizFormTopicName;
    questions: FormArray<IQuizFormQuestion>;
}>;

export type IQuizFormQuestion = FormGroup<{
    score: FormControl<number | null>,
    question: FormControl<string | null>,
    answer: FormControl<string | null>
}>;

export type IQuizFormTopicName = FormControl<string | null>;

