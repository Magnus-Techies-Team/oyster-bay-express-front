import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@shared/constraints/config-injection-token';
import { IConfig } from '@shared';
import { Observable } from 'rxjs';
import { IQuiz } from '@shared/models/DTO/data-models/quiz-creation/quiz';

@Injectable()
export class CreateQuizService {

    private apiRoute: string = '/quiz';

    private readonly apiUrl: string;
    
    constructor(@Inject(APP_CONFIG) private config: IConfig,
                private http: HttpClient) {
        this.apiUrl = this.config.api;
    }
    
    public createQuiz(quiz: IQuiz): Observable<unknown> {
        return this.http.post<unknown>(this.apiUrl + this.apiRoute + '/createQuiz', quiz);
    }
    
}
