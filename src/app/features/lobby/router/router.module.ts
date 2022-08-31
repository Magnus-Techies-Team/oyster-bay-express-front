import { NgModule } from '@angular/core';
import { RouterModule as Router } from '@angular/router';
import { routes } from '@lobby/router/routes';


@NgModule({
    imports: [
        Router.forChild(routes),
    ],
})
export class RouterModule {
    
}
