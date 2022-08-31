import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InitActions from '@core/+state/init/state/actions';
import { LobbyFacade } from '@core/+state/current-lobby/state';
import { LobbyApiService } from '@core/services/api/lobby-api.service';
import { catchError, combineLatest, filter, map, mergeMap, of } from 'rxjs';

@Injectable()
export class InitEffect {

    constructor(private readonly actions$: Actions,
                private lobbyFacade: LobbyFacade,
                private lobbyApiService: LobbyApiService) {
    }

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(InitActions.init),
            mergeMap(() => {
                // list there all the inits
                this.lobbyFacade.initState();
                this.lobbyApiService.setLobbyConnection();

                // combineLatest is used for afterwards multi inits
                return combineLatest({
                    activeLobby: this.lobbyFacade.isLoaded$.pipe(filter(isLoaded => !!isLoaded)),
                    connection : this.lobbyApiService.connectionEstablished.pipe(filter(v => v)),
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
