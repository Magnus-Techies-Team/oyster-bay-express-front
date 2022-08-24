import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { CreateQuizPageComponent } from './components/create-quiz-page/create-quiz-page.component';
import { CreateQuizRouterModule } from '@create-quiz/router/create-quiz-router.module';
import { SharedModule } from '@shared/shared.module';
import { CreateQuizService } from '@create-quiz/services/create-quiz.service';

@NgModule({
    imports: [
        CreateQuizRouterModule,
        AngularMaterialModule,
        SharedModule,
    ],
    declarations: [
        CreateQuizPageComponent,
    ],
    providers: [
        CreateQuizService,
    ],
})
export class CreateQuizModule {}
