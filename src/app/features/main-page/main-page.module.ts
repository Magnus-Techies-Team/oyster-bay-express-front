import { NgModule } from '@angular/core';
import { MainPageComponent } from '@main-module';
import { MainPageRouterModule } from '@main-module/router/main-page-router.module';
import { SharedModule } from '@shared/shared.module';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';

@NgModule({
    imports: [
        MainPageRouterModule,
        SharedModule,
        AngularMaterialModule,
    ],
    declarations: [
        MainPageComponent,
    ],
})
export class MainPageModule {}
