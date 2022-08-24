import { Routes } from '@angular/router';
import { CreateQuizPageComponent } from '@quiz/components/create-quiz-page/create-quiz-page.component';
import { ViewQuizPageComponent } from '@quiz/components/view-quiz-page/view-quiz-page.component';

export const routes: Routes = [
    {
        path: 'create',
        component: CreateQuizPageComponent,
    },
    {
        path: ':id',
        component: ViewQuizPageComponent,
    },
];
