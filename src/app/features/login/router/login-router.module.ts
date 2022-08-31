import { NgModule } from '@angular/core';
import { RouterModule as NgRouterModule } from '@angular/router';
import { loginPageRoutes } from '@login/router/routes';

@NgModule({
    imports: [
        NgRouterModule.forChild(loginPageRoutes),
    ],
})
export class LoginRouterModule {}
