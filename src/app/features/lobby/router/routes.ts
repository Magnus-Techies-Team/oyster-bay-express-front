import { Routes } from '@angular/router';
import { LobbyGameComponent } from '@lobby/components/lobby-game/lobby-game.component';
import { WaitingRoomComponent } from '@lobby/components/waiting-room/waiting-room.component';
import { LobbyWaitingRoomGuard } from '@lobby/guards/lobby-waiting-room.guard';
import { LobbyGameRoomGuard } from '@lobby/guards/lobby-game-room.guard';

export const routes: Routes = [
    {
        path: ':id',
        children: [
            {
                path: 'waiting-room',
                component: WaitingRoomComponent,
                canActivate: [LobbyWaitingRoomGuard],
            },
            {
                path: 'game-room',
                component: LobbyGameComponent,
                canActivate: [LobbyGameRoomGuard],
            },
            {
                path: '',
                redirectTo: 'game-room',
                pathMatch: 'prefix',
            },
        ],
    },
];
