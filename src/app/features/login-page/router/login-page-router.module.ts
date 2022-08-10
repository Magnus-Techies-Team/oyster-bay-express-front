import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loginPageRoutes } from '@login-module';



@NgModule({
    imports: [
        RouterModule.forChild(loginPageRoutes),
    ],
})
export class LoginPageRouterModule {}
