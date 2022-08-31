import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@core/services/user-service';
import * as UserActions from '@core/+state/user/state/actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '@core/services/auth-service';

@Injectable()
export class UserEffect {

    constructor(private readonly actions$: Actions,
                private userService: UserService,
                private authService: AuthService) {
    }

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.initUserState),
            mergeMap(() => {
                return this.userService.getUser().pipe(
                    map(user => {
                        return UserActions.initUserStateSuccess({ user: user });
                    }),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(UserActions.initUserStateFailed({ error: error }));
                    }),
                );
            }),
        );
    });

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.getUser),
            mergeMap(() => {
                return this.userService.getUser().pipe(
                    map(user => {
                        return UserActions.getUserSuccess({ user });
                    }),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(UserActions.getUserFailed({ error: error }));
                    }),
                );
            }),
        );
    });

    signIn = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.signIn),
            mergeMap(({ signInReq }) => {
                return this.authService.signIn(signInReq).pipe(
                    map(user => {
                        return UserActions.signInSuccess({ user: user.user } );
                    }),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(UserActions.signInFailed({ error: error }));
                    }),
                );
            }),
        );
    });

    signUp = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.signUp),
            mergeMap(({ signUpReq }) => {
                return this.authService.signUp(signUpReq).pipe(
                    map(user => {
                        return UserActions.signUpSuccess({ user });
                    }),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(UserActions.signUpFailed({ error: error }));
                    }),
                );
            }),
        );
    });

    logOut = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.logOut),
            mergeMap(() => {
                return this.authService.signOut().pipe(
                    map(() => {
                        return UserActions.logOutSuccess();
                    }),
                    catchError((error) => {
                        setTimeout(() => { throw error; }, 0);
                        return of(UserActions.logOutFailed({ error: error }));
                    }),
                );
            }),
        );
    });
}
