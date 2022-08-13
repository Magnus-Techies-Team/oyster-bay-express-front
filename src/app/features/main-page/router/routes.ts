import { Routes } from '@angular/router';
import { MainPageComponent } from '@main-module/components/main-page/main-page.component';
import { RootComponent } from '../../root/root.component';

export const mainPageRoutes: Routes = [
    {
        path: '',
        component: RootComponent,
        children: [
            {
                path: '',
                component: MainPageComponent,
            },
        ],
    }];
