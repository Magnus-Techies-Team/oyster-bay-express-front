import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizApiService } from '@core/services/api/quiz-api.service';
import { IQuiz, IQuizForm } from '@quiz/models/data-models';
import { FormGroup } from '@angular/forms';
import { QuizService } from '@quiz/services/quiz.service';
import { QuizTagsConstraints } from '@shared/constraints/quiz-tags-constraints';

@Component({
    selector: 'app-view-quiz-page',
    templateUrl: './view-quiz-page.component.html',
    styleUrls: ['./view-quiz-page.component.scss'],
})
export class ViewQuizPageComponent implements OnInit {
      
    private quizId: string | undefined;
    
    public quizForm: FormGroup<IQuizForm> | undefined;

    public quiz: IQuiz | undefined;
  
    constructor(private route: ActivatedRoute,
                private quizApiService: QuizApiService,
                private quizService: QuizService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const quizId: string | null = params.get('id');
            if (quizId) {
                this.quizId = quizId;
                this.initQuiz();
            }
        });
    }

    private initQuiz(): void {
        if (this.quizId) {
            this.quizApiService.getQuizByID(this.quizId).subscribe(quiz => {
                this.quiz = quiz;
                this.quizForm = this.quizService.initForm(quiz);
            });
        }
    }

    public getQuizTagsForDisplay(): string | null {
        if (this.quiz) {
            return this.quiz.tags.map(tag => QuizTagsConstraints[tag.toUpperCase()].displayName).join(', ');
        }
        return null;
    }
}
