import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LobbyActions from '@core/+state/current-lobby/state/actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LobbyApiService } from '@core/services/api/lobby-api.service';

@Injectable()
export class LobbyEffects {

    constructor(private readonly actions$: Actions,
                private lobbyApiService: LobbyApiService) {
    }

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.init),
            mergeMap(() => {
                console.log('in lobby effect');
                return this.lobbyApiService.getUserActiveLobby().pipe(
                    map(activeLobby => LobbyActions.initSuccess({ activeLobbyId: activeLobby.activeLobbyId })),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(LobbyActions.initFailed({ error: error }));
                    }));
            }),
        );
    });
    
}
