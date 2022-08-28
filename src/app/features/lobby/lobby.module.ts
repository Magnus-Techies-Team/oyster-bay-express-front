import { NgModule } from '@angular/core';
import { RouterModule } from '@lobby/router';
import { LobbyGameComponent } from './components/lobby-game/lobby-game.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';

@NgModule({
    imports: [
        RouterModule,
    ],
    declarations: [
        LobbyGameComponent,
        WaitingRoomComponent,
    ],
    providers: [
        
    ],
})
export class LobbyModule {
    
}
