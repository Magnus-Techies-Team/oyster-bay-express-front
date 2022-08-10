import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { filter, mergeMap, Observable, of } from 'rxjs';
import { InitFacade } from '@core/+state/init/state/facade';

@Injectable()
export class InitGuard implements CanActivate {
    
    constructor(private initFacade: InitFacade) {
    }

    private waitForDataToLoad(): Observable<boolean | null> {
        return this.initFacade.isLoaded$.pipe(
            filter(isLoaded => !!isLoaded),
        );
    }
    
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.initFacade.isLoaded$.pipe(
            mergeMap(isLoaded => {
                if (isLoaded) {
                    return of(true);
                } else {
                    this.initFacade.init();
                    return this.waitForDataToLoad().pipe(
                        mergeMap(() => of(true)),
                    );
                }
            }),
        );
    }
}
