import { Routes } from '@angular/router';
import { LoginPageComponent } from '@login-module/components/login-page/login-page.component';
import { RootComponent } from '../../root/root.component';

export const loginPageRoutes: Routes = [
    {
        path: '',
        component: RootComponent,
        children: [
            {
                path: '',
                component: LoginPageComponent,
            },
        ],
    },
];
