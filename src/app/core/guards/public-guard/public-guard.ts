import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserFacade } from '@core/+state/user/state/facade';
import { MainRouterService } from '@main';

@Injectable()
export class PublicGuard implements CanActivate {

    constructor(private userFacade: UserFacade,
                private mainPageRouterService: MainRouterService) {
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userFacade.user$.pipe(map(user => {
            if (user) {
                this.mainPageRouterService.toMainPage();
                return false;
            } else {
                return true;
            }
        }));
    }
}
