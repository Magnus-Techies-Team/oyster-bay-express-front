import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainPageRoutes } from '@main-module';



@NgModule({
    imports: [
        RouterModule.forChild(mainPageRoutes),
    ],
})
export class MainPageRouterModule {}
