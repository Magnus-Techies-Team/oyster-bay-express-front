import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { MainRouterModule } from '@main/router/main-router.module';
import { MainPageComponent } from '@main/components/main-page/main-page.component';
import { PlayGameComponent } from './components/play-game/play-game.component';

@NgModule({
    imports: [
        MainRouterModule,
        SharedModule,
        AngularMaterialModule,
    ],
    declarations: [
        MainPageComponent,
        PlayGameComponent,
    ],
})
export class MainModule {}
