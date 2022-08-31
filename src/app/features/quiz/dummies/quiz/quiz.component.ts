import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuizForm } from '@quiz/models/data-models/QuizForm';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {

    @Input() isViewOnly: boolean | undefined;

    @Input() quizCreationForm: FormGroup<IQuizForm> | undefined;

    @Output() addRound: EventEmitter<never> = new EventEmitter<never>();

    @Output() removeRound: EventEmitter<number> = new EventEmitter<number>();

    constructor() {

    }

    ngOnInit(): void {
    }

    public onAddRoundClick(): void {
        this.addRound.emit();
    }

    public onRemoveRoundClick(roundNumber: number): void {
        this.removeRound.emit(roundNumber);
    }

}
