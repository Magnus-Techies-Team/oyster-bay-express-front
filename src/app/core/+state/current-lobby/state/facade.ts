import { Injectable } from '@angular/core';
import { IHttpErrorResponse } from '@shared';
import { Store } from '@ngrx/store';
import { State } from '@core/+state/current-lobby/state/reducer';
import { getError, getLoaded, getLobbyState } from '@core/+state/current-lobby/state/selectors';
import { init } from '@core/+state/current-lobby/state/actions';
import { Observable } from 'rxjs';

@Injectable()
export class LobbyFacade {

    state$: Observable<State> = this.store.select(getLobbyState);

    isLoaded$: Observable<boolean | null> = this.store.select(getLoaded);

    error$: Observable<IHttpErrorResponse | null> = this.store.select(getError);

    constructor(private store: Store) {
    }

    public initState(): void {
        this.store.dispatch(init());
    }

}
