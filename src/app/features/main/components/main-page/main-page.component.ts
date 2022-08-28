import { Component, OnInit } from '@angular/core';
import { QuizRouterService } from '@quiz';
import { MainRouterService } from '@main/router/main-router.service';

@Component({
    selector: 'app-main',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    constructor(private createQuizRouterService: QuizRouterService,
                private mainRouterService: MainRouterService) { }

    ngOnInit(): void {
    }
    
    public onCreateQuizClick(): void {
        this.createQuizRouterService.toCreateQuizPage();
    }

    public onPlayClick(): void {
        this.mainRouterService.toPlayGamePage();
    }

}
