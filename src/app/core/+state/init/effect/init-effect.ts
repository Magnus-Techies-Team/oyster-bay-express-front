import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InitActions from '@core/+state/init/state/actions';
import { catchError, filter, forkJoin, map, mergeMap, of } from 'rxjs';
import { UserFacade } from '@core/+state/user/state/facade';

@Injectable()
export class InitEffect {

    constructor(private readonly actions$: Actions,
                private userFacade: UserFacade) {
    }

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(InitActions.init),
            mergeMap(() => {
                // list there all the facade inits
                this.userFacade.initState();

                // forkJoin is used for afterwards multi inits
                return forkJoin({
                    user: this.userFacade.userState$.pipe(filter(userState => userState.isLoaded)),
                }).pipe(
                    map(() => InitActions.initSuccess()),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(InitActions.initFailed({ error: error }));
                    }),
                );
            }),
        );
    });
}
