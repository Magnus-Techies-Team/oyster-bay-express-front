import { createAction, props } from '@ngrx/store';
import { UserResponse } from '@shared/models/DTO/responses/user/UserResponse';
import { IHttpErrorResponse } from '@shared';
import { UserSignInRequest } from '@shared/models/DTO/requests/user-auth/UserSignInRequest';
import { UserSignUpRequest } from '@shared/models/DTO/requests/user-auth/UserSignUpRequest';

export const initUserState = createAction('[User Facade] Init user state');
export const initUserStateSuccess = createAction('[User Effect] Init user state succeeded', props<{ user: UserResponse }>());
export const initUserStateFailed = createAction('[User Effect] Init user state failed', props<{ error: IHttpErrorResponse }>());

export const getUser = createAction('[User Facade] Get current user');
export const getUserSuccess = createAction('[User Effect] Get current user succeeded', props<{ user: UserResponse }>());
export const getUserFailed = createAction('[User Effect] Get current user failed', props<{ error: IHttpErrorResponse }>());

export const signIn = createAction('[User Facade] Sign in current user', props<{ signInReq: UserSignInRequest }>());
export const signInSuccess = createAction('[User Effect] Sign in current user succeeded', props<{ user: UserResponse }>());
export const signInFailed = createAction('[User Effect] Sign in current user failed', props<{ error: IHttpErrorResponse }>());

export const signUp = createAction('[User Facade] Sign up current user', props<{ signUpReq: UserSignUpRequest }>());
export const signUpSuccess = createAction('[User Effect] Sign up current user succeeded', props<{ user: UserResponse }>());
export const signUpFailed = createAction('[User Effect] Sign up current user failed', props<{ error: IHttpErrorResponse }>());

export const logOut = createAction('[User Facade] Log out current user');
export const logOutSuccess = createAction('[User Effect] Log out current user succeeded');
export const logOutFailed = createAction('[User Effect] Log out current user failed', props<{ error: IHttpErrorResponse }>());
