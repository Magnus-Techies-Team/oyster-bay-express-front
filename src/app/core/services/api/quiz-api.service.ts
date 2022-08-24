import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuiz } from '@quiz/models/data-models/quiz';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api/api-service';

@Injectable()
export class QuizApiService {

    private apiRoute: string = '/quiz';

    private readonly apiUrl: string;

    constructor(private apiService: ApiService,
                private http: HttpClient) {
        this.apiUrl = this.apiService.apiConfig.api;
    }

    public createQuiz(quiz: IQuiz): Observable<unknown> {
        return this.http.post<unknown>(this.apiUrl + this.apiRoute + '/createQuiz', quiz);
    }

    public getQuizByID(quizID: string): Observable<IQuiz> {
        return this.http.get<IQuiz>(this.apiUrl + this.apiRoute + '/getQuiz/' + `${quizID}`);
    }
    
    public getAllAvailableQuizzes(): Observable<IQuiz[]> {
        return this.http.get<IQuiz[]>(this.apiUrl + this.apiRoute + '/getAllAvailableQuizzes');
    }
    
}
