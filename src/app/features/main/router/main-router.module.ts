import { NgModule } from '@angular/core';
import { RouterModule as NgRouterModule }  from '@angular/router';
import { mainPageRoutes } from '@main-module/router/routes';



@NgModule({
    imports: [
        NgRouterModule.forChild(mainPageRoutes),
    ],
})

export class MainRouterModule {}
