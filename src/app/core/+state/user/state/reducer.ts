import { UserResponse } from '@shared/models/DTO/responses/user/user-response';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions';
import { ICommonState } from '@shared';

export const USER_FEATURE_KEY = 'user';

export interface State extends ICommonState {
    currentUser: UserResponse | null;
}

export const initialState: State = {
    isLoaded: false,
    error: null,
    currentUser: null,
};

export const userReducer = createReducer(
    initialState,
    
    // Init actions handlers
    on(UserActions.initUserState, (state) => ({
        ...state,
        isLoaded: false,
        error: null,
        currentUser: null,
    })),
    on(UserActions.initUserStateSuccess, (state, { user }) => ({
        ...state,
        isLoaded: true,
        error: null,
        currentUser: user,
    })),
    on(UserActions.initUserStateFailed, (state, { error }) => ({
        ...state,
        isLoaded: true,
        error: error,
        currentUser: null,
    })),

    // Get user actions handlers
    on(UserActions.getUser, (state) => ({
        ...state,
        isLoaded: false,
        error: null,
        currentUser: null,
    })),
    on(UserActions.getUserSuccess, (state, { user }) => ({
        ...state,
        isLoaded: true,
        error: null,
        currentUser: user,
    })),
    on(UserActions.getUserFailed, (state, { error }) => ({
        ...state,
        isLoaded: true,
        error: error,
        currentUser: null,
    })),

    // Sign in actions handlers
    on(UserActions.signIn, (state) => ({
        ...state,
        isLoaded: false,
        error: null,
        currentUser: null,
    })),
    on(UserActions.signInSuccess, (state, { user }) => ({
        ...state,
        isLoaded: true,
        error: null,
        currentUser: user,
    })),
    on(UserActions.signUpFailed, (state, { error }) => ({
        ...state,
        isLoaded: true,
        error: error,
        currentUser: null,
    })),

    // Sign up actions handlers
    on(UserActions.signUp, (state) => ({
        ...state,
        isLoaded: false,
        error: null,
        currentUser: null,
    })),
    on(UserActions.signUpSuccess, (state, { user }) => ({
        ...state,
        isLoaded: true,
        error: null,
        currentUser: user,
    })),
    on(UserActions.signUpFailed, (state, { error }) => ({
        ...state,
        isLoaded: true,
        error: error,
        currentUser: null,
    })),

    // Log out actions handlers
    on(UserActions.logOut, (state) => ({
        ...state,
        isLoaded: false,
        error: null,
        currentUser: null,
    })),
    on(UserActions.logOutSuccess, (state) => ({
        ...state,
        isLoaded: true,
        error: null,
        currentUser: null,
    })),
    on(UserActions.logOutFailed, (state, { error }) => ({
        ...state,
        isLoaded: true,
        error: error,
    })),
);
