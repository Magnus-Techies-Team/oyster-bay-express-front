import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loginPageRoutes } from '@login-module/router/routes';

@NgModule({
    imports: [
        RouterModule.forChild(loginPageRoutes),
    ],
})
export class LoginPageRouterModule {}
