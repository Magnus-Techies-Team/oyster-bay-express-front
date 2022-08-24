import { Component, OnInit } from '@angular/core';
import { QuizRouterService } from '../../../quiz';

@Component({
    selector: 'app-main',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    constructor(private createQuizRouterService: QuizRouterService) { }

    ngOnInit(): void {
    }
    
    onCreateQuizClick(): void {
        this.createQuizRouterService.toCreateQuizPage();
    }

}
