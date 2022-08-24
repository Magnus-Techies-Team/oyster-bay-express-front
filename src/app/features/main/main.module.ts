import { NgModule } from '@angular/core';
import { MainPageComponent } from '@main-module';
import { MainRouterModule } from '@main-module/router/main-router.module';
import { SharedModule } from '@shared/shared.module';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';

@NgModule({
    imports: [
        MainRouterModule,
        SharedModule,
        AngularMaterialModule,
    ],
    declarations: [
        MainPageComponent,
    ],
})
export class MainPageModule {}
