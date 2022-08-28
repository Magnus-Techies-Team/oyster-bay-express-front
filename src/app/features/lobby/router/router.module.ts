import { NgModule } from '@angular/core';
import { RouterModule as Router } from '@angular/router';
import { routes } from '@lobby/router/routes';
import { LobbyService } from '@lobby/services';


@NgModule({
    imports: [
        Router.forChild(routes),
    ],
    providers : [
        LobbyService,
    ],
})
export class RouterModule {
    
}
