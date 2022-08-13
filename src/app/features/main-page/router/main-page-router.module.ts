import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainPageRoutes } from '@main-module/router/routes';



@NgModule({
    imports: [
        RouterModule.forChild(mainPageRoutes),
    ],
})

export class MainPageRouterModule {}
