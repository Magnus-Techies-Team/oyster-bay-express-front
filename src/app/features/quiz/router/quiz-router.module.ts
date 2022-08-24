import { NgModule } from '@angular/core';
import { RouterModule as NgRouterModule } from '@angular/router';
import { routes } from './routes';

@NgModule({
    imports: [
        NgRouterModule.forChild(routes),
    ],
})
export class QuizRouterModule {}
