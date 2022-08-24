import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IQuizTag } from '@shared';

export interface IQuizForm {
    title: FormControl<string | null>; 
    isPrivate: FormControl<boolean | null>; 
    tags: FormControl<IQuizTag[] | null>; 
    rounds: IQuizRounds
}

export type IQuizRounds = FormArray<IQuizRound | never>;

export type IQuizRound = FormArray<IQuizTopic>;

export type IQuizTopic = FormGroup<{
    topicName: IQuizTopicName;
    questions: FormArray<IQuizQuestion>;
}>;

export type IQuizQuestion = FormGroup<{
    score: FormControl<number | null>,
    question: FormControl<string | null>,
    answer: FormControl<string | null>
}>;

export type IQuizTopicName = FormControl<string | null>;

