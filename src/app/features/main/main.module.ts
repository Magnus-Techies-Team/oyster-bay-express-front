import { NgModule } from '@angular/core';
import { MainComponent, MainPageRouterModule } from '@main-module';

@NgModule({
    imports: [
        MainPageRouterModule,
    ],
    declarations: [
        MainComponent,
    ],
})
export class MainModule {}
