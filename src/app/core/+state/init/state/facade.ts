import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '@core/+state/init/state/reducer';
import { Store } from '@ngrx/store';
import * as InitSelectors from '@core/+state/init/state/selectors';
import * as InitActions from '@core/+state/init/state/actions';
import { IHttpErrorResponse } from '@shared';

@Injectable()
export class InitFacade {
    
    state$: Observable<State> = this.store.select(InitSelectors.getInitState);

    isLoaded$: Observable<boolean | null> = this.store.select(InitSelectors.getLoaded);

    error$: Observable<IHttpErrorResponse | null> = this.store.select(InitSelectors.getError);

    constructor(private store: Store) {
    }

    public init(): void {
        this.store.dispatch(InitActions.init());
    }
    
}
