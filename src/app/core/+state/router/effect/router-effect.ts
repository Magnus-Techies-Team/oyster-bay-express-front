import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '@core/+state/user/state/actions';
import { tap } from 'rxjs';
import { LoginPageRouterService } from '@login-module';
import { MainPageRouterService } from '@main-module';

@Injectable()
export class RouterEffect {

    constructor(private router: Router,
                private actions$: Actions,
                private loginPageRouterService: LoginPageRouterService,
                private mainPageRouterService: MainPageRouterService) {
    }

    signInSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.signInSuccess),
            tap(() => {
                this.mainPageRouterService.toMainPage();
            }),
        );
    },
    { dispatch: false });

    signUpSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.signUpSuccess),
            tap(() => {
                this.mainPageRouterService.toMainPage();
            }),
        );
    },
    { dispatch: false });

    signOutSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.logOutSuccess),
            tap(() => {
                this.loginPageRouterService.toLoginPage();
            }),
        );
    },
    { dispatch: false });
}
