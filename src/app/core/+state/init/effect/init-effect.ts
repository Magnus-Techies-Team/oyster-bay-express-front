import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InitActions from '@core/+state/init/state/actions';
import { catchError, filter, forkJoin, map, mergeMap, of } from 'rxjs';
import { LobbyFacade } from '@core/+state/current-lobby/state';

@Injectable()
export class InitEffect {

    constructor(private readonly actions$: Actions,
                private lobbyFacade: LobbyFacade) {
    }

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(InitActions.init),
            mergeMap(() => {
                // list there all the facade inits
                console.log('in init effect');
                this.lobbyFacade.initState();

                // forkJoin is used for afterwards multi inits
                return forkJoin({
                    activeLobby: this.lobbyFacade.state$.pipe(filter(lobbyState => lobbyState.isLoaded)),
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
