import { NgModule } from '@angular/core';
import { RouterModule } from '@lobby/router';
import { LobbyGameComponent } from './components/lobby-game/lobby-game.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { LobbyWaitingRoomGuard } from '@lobby/guards/lobby-waiting-room.guard';
import { LobbyGameRoomGuard } from '@lobby/guards/lobby-game-room.guard';
import { LobbyRoomsSharedDataService } from '@lobby/services/lobby-rooms-shared-data.service';
import { SharedModule } from '@shared/shared.module';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';

@NgModule({
    imports: [
        RouterModule,
        SharedModule,
        AngularMaterialModule,
    ],
    declarations: [
        // components
        LobbyGameComponent,
        WaitingRoomComponent,
    ],
    providers: [
        // guards
        LobbyWaitingRoomGuard,
        LobbyGameRoomGuard,
        
        // services
        LobbyRoomsSharedDataService,
    ],
})
export class LobbyModule {
    
}
