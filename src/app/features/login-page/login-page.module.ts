import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRouterModule } from '@login-module';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { SharedModule } from '@shared/shared.module';


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
