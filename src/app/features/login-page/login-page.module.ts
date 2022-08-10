import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { SharedModule } from '@shared/shared.module';
import { LoginPageRouterModule } from '@login-module/router/login-page-router.module';


@NgModule({
    imports: [
        LoginPageRouterModule,
        AngularMaterialModule,
        SharedModule,
    ],
    declarations: [
        LoginPageComponent,
    ],
})
export class LoginPageModule {}
