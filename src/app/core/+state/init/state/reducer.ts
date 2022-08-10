import { ICommonState } from '@shared';
import { createReducer, on } from '@ngrx/store';
import * as InitActions from './actions';

export const INIT_FEATURE_KEY = 'user';

export interface State extends ICommonState {}

export const initialState: State = {
    isLoaded: false,
    error: null,
};

export const initReducer = createReducer(
    initialState,
    on(InitActions.init, (state) => ({
        ...state,
        isLoaded: false,
        error: null,
    })),
    on(InitActions.initSuccess, (state) => ({
        ...state,
        isLoaded: true,
        error: null,
    })),
    on(InitActions.initFailed, (state, { error }) => ({
        ...state,
        isLoaded: true,
        error: error,
    })),
);

