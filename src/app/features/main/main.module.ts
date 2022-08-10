import { NgModule } from '@angular/core';
import { MainComponent } from '@main-module';
import { MainPageRouterModule } from '@main-module/router/main-page-router.module';

@NgModule({
    imports: [
        MainPageRouterModule,
    ],
    declarations: [
        MainComponent,
    ],
})
export class MainModule {}
