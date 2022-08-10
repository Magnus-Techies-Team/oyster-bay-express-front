import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@core/services/user-service';
import * as UserActions from '@core/+state/user/state/actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '@core/services/auth-service';
import { UserSignInRequest } from '@shared/models/DTO/requests/user-auth/user-sign-in-request';

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
                        return UserActions.initUserStateSuccess({ user });
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(UserActions.initUserStateFailed({ error: { type: 'asd', message: 'asdsadsad', status: 500 } }));
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
                        console.log(error);
                        return of(UserActions.getUserFailed({ error: { type: 'asd', message: 'asdsadsad', status: 500 } }));
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
                        return UserActions.signInSuccess({ user });
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(UserActions.signInFailed({ error: { type: 'asd', message: 'asdsadsad', status: 500 } }));
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
                        console.log(error);
                        return of(UserActions.signUpFailed({ error: { type: 'asd', message: 'asdsadsad', status: 500 } }));
                    }),
                );
            }),
        );
    });

    logOut = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.logOut),
            mergeMap(() => {
                return this.authService.logOut().pipe(
                    map(() => {
                        return UserActions.logOutSuccess();
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(UserActions.logOutFailed({ error: { type: 'asd', message: 'asdsadsad', status: 500 } }));
                    }),
                );
            }),
        );
    });
}
