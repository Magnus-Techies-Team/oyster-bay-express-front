import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { SharedModule } from '@shared/shared.module';
import { LoginRouterModule } from '@login/router/login-router.module';

@NgModule({
    imports: [
        LoginRouterModule,
        AngularMaterialModule,
        SharedModule,
    ],
    declarations: [
        LoginPageComponent,
    ],
})
export class LoginModule {}
