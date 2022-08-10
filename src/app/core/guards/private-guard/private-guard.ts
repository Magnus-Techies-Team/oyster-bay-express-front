import { Injectable } from '@angular/core';
import { UserFacade } from '@core/+state/user/state/facade';
import { map, Observable } from 'rxjs';
import { UrlTree } from '@angular/router';
import { LoginPageRouterService } from '@login-module';

@Injectable()
export class PrivateGuard {
    
    constructor(private userFacade: UserFacade,
                private loginPageRouterService: LoginPageRouterService) {
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userFacade.user$.pipe(map(user => {
            if (user) {
                return true;
            } else {
                this.loginPageRouterService.toLoginPage();
                return false;
            }
        }));
    }
}
