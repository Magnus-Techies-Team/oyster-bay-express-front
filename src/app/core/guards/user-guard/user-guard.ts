import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { filter, mergeMap, Observable, of } from 'rxjs';
import { UserFacade } from '@core/+state/user/state/facade';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(private userFacade: UserFacade) {
    }

    private waitForDataToLoad(): Observable<boolean | null> {
        return this.userFacade.isLoaded$.pipe(
            filter(isLoaded => !!isLoaded),
        );
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userFacade.isLoaded$.pipe(
            mergeMap(isLoaded => {
                console.log('in user guard', isLoaded);
                if (isLoaded) {
                    return of(true);
                } else {
                    this.userFacade.initState();
                    return this.waitForDataToLoad().pipe(
                        mergeMap(() => of(true)),
                    );
                }
            }),
        );
    }
}
