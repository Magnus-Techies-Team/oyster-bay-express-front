import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '@core/+state/user/state/reducer';
import * as UserActions from '@core/+state/user/state/actions';
import * as UserSelectors from '@core/+state/user/state/selectors';
import { UserResponse } from '@shared/models/DTO/responses/user/user-response';
import { UserSignInRequest } from '@shared/models/DTO/requests/user-auth/user-sign-in-request';
import { UserSignUpRequest } from '@shared/models/DTO/requests/user-auth/user-sign-up-request';

@Injectable()
export class UserFacade {
    
    public userState$: Observable<State> = this.store.select(UserSelectors.getUserState);

    public user$: Observable<UserResponse | null> = this.store.select(UserSelectors.getUser);
    
    constructor(private store: Store) {
    }

    public initState(): void {
        this.store.dispatch(UserActions.initUserState());
    }

    public getCurrentUser(): void {
        this.store.dispatch(UserActions.getUser());
    }
    
    public signIn(signInReq: UserSignInRequest): void {
        this.store.dispatch(UserActions.signIn({ signInReq }));
    }

    public signUp(signUpReq: UserSignUpRequest): void {
        this.store.dispatch(UserActions.signUp({ signUpReq }));
    }

    public logOut(): void {
        this.store.dispatch(UserActions.logOut());
    }
}
