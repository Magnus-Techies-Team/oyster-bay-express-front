import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  IQuizTag } from '@shared';
import { QuizTagsConstraints } from '@shared/constraints/quiz-tags-constraints';
import { validationPatternConstraints } from '@shared/constraints/validation-numeric-constraints';
import { CreateQuizService } from '@create-quiz/services/create-quiz.service';
import {
    IQuizForm, IQuizQuestion,
    IQuizRound,
    IQuizRounds,
    IQuizTopic,
    IQuizTopicName,
} from '@create-quiz/models/quiz-form';
import { IQuiz } from '@shared/models/DTO/data-models/quiz-creation/quiz';
import { IQuestion } from '@shared/models/DTO/data-models/quiz-creation/quiz-question';
import { IQuizQuestionType } from '@shared/models/DTO/data-models/quiz-creation/quiz-question-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConstraints } from '@shared/constraints/snackbar-constraints';

@Component({
    selector: 'app-create-quiz-page',
    templateUrl: './create-quiz-page.component.html',
    styleUrls: ['./create-quiz-page.component.scss'],
})
export class CreateQuizPageComponent implements OnInit {

    public formConfig = {
        roundsAmount: 3,
        topicsAmount: 4,
        questionsPerTopicAmount: 4,
        initialQuestionScore: 100,
        questionScoreDiffByRound: 100,
        questionPlaceholder: 'Your question',
        answerPlaceholder: 'Your answer',
    };

    // @ts-ignore
    public quizCreationForm: FormGroup<IQuizForm>;

    public newTopicsPerRoundAmount: number = this.formConfig.topicsAmount;
    
    public get tags(): Array<IQuizTag> {
        return Object.values(QuizTagsConstraints);
    }

    constructor(private formBuilder: FormBuilder,
                private createQuizService: CreateQuizService,
                private snackBar: MatSnackBar) {
        this.initForm();
    }

    private initForm(): void {
        const config = this.formConfig;
        let form: FormGroup<IQuizForm> = this.formBuilder.group({
            title: new FormControl<string | null>(null, [Validators.required]),
            isPrivate: new FormControl<boolean | null>(true, [Validators.required]),
            tags: new FormControl<IQuizTag[] | null>([]),
            rounds: new FormArray<IQuizRound | never>([], [Validators.required]),
        });

        for (let i = 0; i < config.roundsAmount; i++) {
            (form.controls.rounds as IQuizRounds).push(this.getNewRound({ roundNumber: i }));
        }
        
        this.quizCreationForm = form;
    }
    
    private getNewRound(params: { roundNumber: number, roundData?: IQuizRound }): FormArray {
        const config = this.formConfig;
        let round: IQuizRound = this.formBuilder.array<IQuizTopic>([]);
        for (let j = 0; j < config.topicsAmount; j++) {
            round.push(
                this.getNewTopic({ 
                    roundNumber: params.roundNumber, 
                    topicNumber: j, 
                    topicData: params.roundData ? params.roundData.controls[j] : undefined,
                }));
        }
        return round;
    }
    
    private getNewTopic(params: { roundNumber: number, topicNumber: number, topicData?: IQuizTopic }): IQuizTopic {
        const config = this.formConfig;
        let topic: IQuizTopic = this.formBuilder.group({
            topicName: new FormControl(null, [Validators.required]) as IQuizTopicName,
            questions: this.formBuilder.array<IQuizQuestion>([]),
        });

        if (params.topicData) {
            topic.controls.topicName.patchValue(params.topicData.controls.topicName.value as string);
        } else {
            topic.controls.topicName.patchValue(`Topic${params.topicNumber + 1}`);
        }

        for (let k = 0; k < config.questionsPerTopicAmount; k++) {
            const currentRoundScore: number = config.initialQuestionScore + config.questionScoreDiffByRound * params.roundNumber;
            const score: number = currentRoundScore * (k + 1);
            let question: string | null;
            let answer: string | null;

            if (params.topicData) {
                const topicQuestion: IQuizQuestion = params.topicData.controls.questions.controls[k];
                question = topicQuestion.controls.question.value;
                answer = topicQuestion.controls.answer.value;
            } else {
                question = this.formConfig.questionPlaceholder;
                answer = this.formConfig.answerPlaceholder;
            }

            topic.controls.questions.push(new FormGroup({
                score: new FormControl(score, [
                    Validators.required,
                    Validators.pattern(validationPatternConstraints.NUMERIC),
                ]),
                question: new FormControl(question, [Validators.required]),
                answer: new FormControl(answer, [Validators.required]),
            }));
        }
        return topic;
    }
    
    public onAddRoundClick(): void {
        this.formConfig.roundsAmount += 1;
        this.quizCreationForm.controls.rounds.push(
            this.getNewRound({ 
                roundNumber: this.formConfig.roundsAmount, 
            }),
        );
    }

    public onRemoveRoundClick(roundNumber: number): void {
        this.formConfig.roundsAmount -= 1;
        this.quizCreationForm.controls.rounds.removeAt(roundNumber);
        this.updateRounds({ startRoundIndex: roundNumber });
    }
    
    private updateRounds(params: { startRoundIndex: number } = { startRoundIndex: 0 }): void {
        for (let i = params.startRoundIndex; i < this.formConfig.roundsAmount; i++) {
            this.quizCreationForm.controls.rounds.controls[i].patchValue(
                this.getNewRound({
                    roundNumber: i,
                    roundData: this.quizCreationForm.controls.rounds.controls[i],
                }).value,
            );
        }
    }

    public onTopicsAmountApply(): void {
        for (let i = 0; i < this.formConfig.roundsAmount; i++) {
            if (this.newTopicsPerRoundAmount < this.formConfig.topicsAmount) {
                for (let j = this.newTopicsPerRoundAmount; j < this.formConfig.topicsAmount; j++) {
                    this.quizCreationForm.controls.rounds.controls[i].removeAt(-1);
                }
            } else {
                for (let j = this.formConfig.topicsAmount; j < this.newTopicsPerRoundAmount; j++) {
                    this.quizCreationForm.controls.rounds.controls[i].push(
                        this.getNewTopic({ 
                            roundNumber: i, 
                            topicNumber: j, 
                        }),
                    );
                }
            }
        }
        this.formConfig.topicsAmount = this.newTopicsPerRoundAmount;
    }
    
    public onCreateQuizClick(): void {
        if (this.quizCreationForm.valid) {
            const form: FormGroup<IQuizForm> = this.quizCreationForm;
            let quiz: IQuiz = {
                title: form.controls.title.value,
                private: form.controls.isPrivate.value,
                tags: form.controls.tags.value?.map(tag => tag.type),
                questions: this.getQuizQuestions(),
            } as IQuiz;  
            // form`s controls can have null values, but it is validated throw quizCreationForm.valid condition. 
            // But TS compile cannot accept this as valid check
            
            this.createQuizService.createQuiz(quiz).subscribe(() => {
                this.snackBar.open('Quiz was successfully created!', 'OK', SnackbarConstraints['DEFAULT_POSITION']);
            });
        } else {
            this.quizCreationForm.markAllAsTouched();
        }
        
    }
    
    private getQuizQuestions(): IQuestion[] {
        let questions: IQuestion[] = [];
        
        for (let i = 0; i < this.formConfig.roundsAmount; i++) {
            const round: IQuizRound = this.quizCreationForm.controls.rounds.controls[i];
            
            for (let j = 0; j < this.formConfig.topicsAmount; j++) {
                const topic: IQuizTopic = round.controls[j];
                
                for (let k = 1; k < this.formConfig.questionsPerTopicAmount; k++) {
                    const topicQuestionItem: IQuizQuestion = topic.controls.questions.controls[k];
                    const topicName: string = topic.controls.topicName.value as string;
                    
                    questions.push({
                        question: topicQuestionItem.controls.question.value,
                        round: i + 1,
                        answer: topicQuestionItem.controls.answer.value,
                        cost: topicQuestionItem.controls.score.value,
                        topic: topicName,
                        type: IQuizQuestionType.text,
                        filepath: null,
                    } as IQuestion);
                }
            }
        }
        return questions;
    }

    ngOnInit(): void {
    }

}
