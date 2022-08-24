import { NgModule } from '@angular/core';
import { RouterModule as NgRouterModule } from '@angular/router';
import { routes } from '@create-quiz/router/routes';

@NgModule({
    imports: [
        NgRouterModule.forChild(routes),
    ],
})
export class CreateQuizRouterModule {}
