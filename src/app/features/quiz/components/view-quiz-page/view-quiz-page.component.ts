import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizApiService } from '@core/services/api/quiz-api.service';

@Component({
    selector: 'app-view-quiz-page',
    templateUrl: './view-quiz-page.component.html',
    styleUrls: ['./view-quiz-page.component.scss'],
})
export class ViewQuizPageComponent implements OnInit {
      
    private quizId: string | undefined;
  
    constructor(private route: ActivatedRoute,
                private quizApiService: QuizApiService) { }

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
                console.log(quiz);
            });
        }
    }

}
