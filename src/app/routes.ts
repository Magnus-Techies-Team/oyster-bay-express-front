import { Routes } from '@angular/router';
import { InitGuard } from '@core/guards/init-guard/init-guard';
import { PublicGuard } from '@core/guards/public-guard/public-guard';
import { PrivateGuard } from '@core/guards/private-guard/private-guard';

export const routes:Routes = [
    {
        path: '',
        canActivate: [InitGuard],
        children: [
            {
                path: 'login',
                loadChildren: () => import('@login-module').then(m => m.LoginPageModule),
                canActivate: [PublicGuard],
            },
            {
                path: '',
                loadChildren: () => import('@main-module').then(m => m.MainModule),
                canActivate: [PrivateGuard],
            },
        ],
    },
];
