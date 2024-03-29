import { Routes } from '@angular/router';
import { InitGuard } from '@core/guards/init-guard/init-guard';
import { PublicGuard } from '@core/guards/public-guard/public-guard';
import { PrivateGuard } from '@core/guards/private-guard/private-guard';
import { RootComponent } from '@root';
import { RoutePathConstraints } from '@shared/constraints/route-path-constraints';
import { NotfoundComponent } from '@notfound';
import { UserGuard } from '@core/guards/user-guard/user-guard';

export const routes:Routes = [
    {
        path: '',
        canActivate: [UserGuard],
        children: [
            {
                path: RoutePathConstraints.LOGIN.routeName,
                loadChildren: () => import('@login').then(m => m.LoginModule),
                canActivate: [PublicGuard],
            },
            {
                path: RoutePathConstraints.APP.routeName,
                component: RootComponent,
                canActivate: [InitGuard, PrivateGuard],
                children: [
                    {
                        path: RoutePathConstraints.MAIN.routeName,
                        loadChildren: () => import('@main').then(m => m.MainModule),
                    },
                    {
                        path: RoutePathConstraints.CREATE_QUIZ.routeName,
                        loadChildren: () => import('@quiz').then(m => m.QuizModule),
                    },
                    {
                        path: RoutePathConstraints.LOBBY.routeName,
                        loadChildren: () => import('@lobby').then(m => m.LobbyModule),
                    },
                    {
                        path: RoutePathConstraints.NOT_FOUND_PAGE.routeName,
                        pathMatch: 'prefix',
                        component: NotfoundComponent,
                    },
                    {
                        path: '',
                        pathMatch: 'prefix',
                        redirectTo: RoutePathConstraints.MAIN.routeName,
                    },
                    {
                        path: '**',
                        pathMatch: 'prefix',
                        redirectTo: RoutePathConstraints.NOT_FOUND_PAGE.routeName,
                    },
                ],
            },
            {
                path: '**',
                redirectTo: RoutePathConstraints.APP.routeName,
            },
        ],
    },
];
