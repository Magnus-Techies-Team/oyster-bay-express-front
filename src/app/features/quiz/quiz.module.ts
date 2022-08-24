import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { QuizRouterModule } from './router/quiz-router.module';
import { SharedModule } from '@shared/shared.module';
import { QuizService } from './services/quiz.service';
import { ViewQuizPageComponent } from './components/view-quiz-page/view-quiz-page.component';
import { CreateQuizPageComponent } from '@quiz/components/create-quiz-page/create-quiz-page.component';
import { QuizComponent } from './dummies/quiz/quiz.component';

@NgModule({
    imports: [
        QuizRouterModule,
        AngularMaterialModule,
        SharedModule,
    ],
    declarations: [
        CreateQuizPageComponent,
        ViewQuizPageComponent,
        QuizComponent,
    ],
    providers: [
        QuizService,
    ],
})
export class QuizModule {}
