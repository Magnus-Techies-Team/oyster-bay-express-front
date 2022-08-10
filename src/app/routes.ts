import { Routes } from '@angular/router';
import { InitGuard } from '@core/guards/init-guard/init-guard';

export const routes:Routes = [
    {
        path: '',
        canActivate: [InitGuard],
        children: [
            {
                path: 'login',
                loadChildren: () => import('@login-module').then(m => m.LoginPageModule),
            },
            {
                path: '',
                loadChildren: () => import('@main-module').then(m => m.MainModule),
            },
        ],
    },
];
