import { Routes } from '@angular/router';
import { MainPageComponent } from '@main/components/main-page/main-page.component';
import { PlayGameComponent } from '@main/components/play-game/play-game.component';

export const mainPageRoutes: Routes = [
    {
        path: '',
        component: MainPageComponent,
    },
    {
        path: 'play',
        component: PlayGameComponent,
    },
];
