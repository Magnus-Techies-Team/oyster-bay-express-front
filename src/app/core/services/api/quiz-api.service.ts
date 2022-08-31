import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api/api-service';
import { GetAllQuizzesRequest, ICreateQuizRequest } from '@quiz/models/requests';
import { IQuiz, IShortQuiz } from '@quiz/models/data-models';

@Injectable()
export class QuizApiService {

    private apiRoute: string = '/quiz';

    private readonly apiUrl: string;

    constructor(private apiService: ApiService,
                private http: HttpClient) {
        this.apiUrl = this.apiService.apiConfig.api;
    }

    public createQuiz(quiz: ICreateQuizRequest): Observable<unknown> {
        return this.http.post<unknown>(this.apiUrl + this.apiRoute + '/createQuiz', quiz);
    }

    public getQuizByID(quizID: string): Observable<IQuiz> {
        return this.http.get<IQuiz>(this.apiUrl + this.apiRoute + '/getQuiz/' + `${quizID}`);
    }
    
    public getAllAvailableQuizzes(req?: GetAllQuizzesRequest): Observable<IShortQuiz[]> {
        const params: HttpParams = this.apiService.setHttpParams([{
            key: 'tags',
            value: req?.tags,
        }]);
        return this.http.get<IShortQuiz[]>(this.apiUrl + this.apiRoute + '/getAllAvailableQuizzes', { params: params });
    }
    
}
