import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
    IQuiz,
    IQuizForm, IQuizFormQuestion,
    IQuizFormRound,
    IQuizFormRounds,
    IQuizFormTopic,
    IQuizFormTopicName, IQuizQuestion,
    IQuizTag,
} from '@quiz/models/data-models';
import { validationPatternConstraints } from '@shared/constraints/validation-numeric-constraints';

@Injectable()
export class QuizService {

    constructor(private formBuilder: FormBuilder) {
    }

    public initForm(quiz: IQuiz): FormGroup<IQuizForm> {
        let form: FormGroup<IQuizForm> = this.formBuilder.group({
            title: new FormControl<string | null>(null, [Validators.required]),
            isPrivate: new FormControl<boolean | null>(true, [Validators.required]),
            tags: new FormControl<IQuizTag[] | null>([]),
            rounds: new FormArray<IQuizFormRound | never>([], [Validators.required]),
        });

        for (let i = 0; i < quiz.totalRounds; i++) {
            (form.controls.rounds as IQuizFormRounds).push(this.getNewRound({ roundNumber: i, quiz: quiz }));
        }

        return form;
    }

    private getNewRound(params: { roundNumber: number, quiz: IQuiz }): FormArray {
        let round: IQuizFormRound = this.formBuilder.array<IQuizFormTopic>([]);
        for (let j = 0; j < params.quiz.roundTopics; j++) {
            round.push(
                this.getNewTopic({
                    roundNumber: params.roundNumber,
                    topicNumber: j,
                    quiz: params.quiz,
                }));
        }
        return round;
    }

    private getNewTopic(params: { roundNumber: number, topicNumber: number, quiz: IQuiz }): IQuizFormTopic {
        const roundQuestions: IQuizQuestion[] = params.quiz.rounds[params.roundNumber + 1];
        let topic: IQuizFormTopic = this.formBuilder.group({
            topicName: new FormControl(null, [Validators.required]) as IQuizFormTopicName,
            questions: this.formBuilder.array<IQuizFormQuestion>([]),
        });

        topic.controls.topicName.patchValue(roundQuestions[0].topic);

        for (let k = 0; k < params.quiz.topicQuestions; k++) {
            topic.controls.questions.push(new FormGroup({
                score: new FormControl(roundQuestions[k].cost, 
                    [
                        Validators.required,
                        Validators.pattern(validationPatternConstraints.NUMERIC),
                    ]),
                question: new FormControl(roundQuestions[k].question, [Validators.required]),
                answer: new FormControl(roundQuestions[k].answer, [Validators.required]),
            }));
        }
        return topic;
    }
}
