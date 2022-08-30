import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LobbyActions from '@core/+state/current-lobby/state/actions';

import { LobbyApiService } from '@core/services/api/lobby-api.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LobbyEffects {

    constructor(private readonly actions$: Actions,
                private lobbyApiService: LobbyApiService) {
    }

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.init),
            mergeMap(() => {
                return this.lobbyApiService.getUserActiveLobby().pipe(
                    map(activeLobby => {
                        return LobbyActions.initSuccess({
                            activeLobbyId: activeLobby.activeLobbyId,
                        });
                    }),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(LobbyActions.initFailed({ error: error }));
                    }));
            }),
        );
    });
    
}
