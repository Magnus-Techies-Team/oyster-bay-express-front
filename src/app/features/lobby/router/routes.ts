import { Routes } from '@angular/router';
import { LobbyGameComponent } from '@lobby/components/lobby-game/lobby-game.component';
import { WaitingRoomComponent } from '@lobby/components/waiting-room/waiting-room.component';

export const routes: Routes = [
    {
        path: ':id',
        canActivate: [
            
        ],
        children: [
            {
                path: 'waiting-room',
                component: WaitingRoomComponent,
            },
            {
                path: 'game',
                component: LobbyGameComponent,
            },
        ],
    },
];
