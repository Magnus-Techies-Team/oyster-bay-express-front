import { ICommonState } from '@shared';
import { createReducer, on } from '@ngrx/store';
import * as LobbyActions from './actions';

export const CURRENT_LOBBY_FEATURE_KEY = 'current-lobby';

export interface State extends ICommonState {
    activeLobbyId: string | null;
}

export const initialState: State = {
    isLoaded: false,
    error: null,
    activeLobbyId: null,
};

export const lobbyReducer = createReducer(
    initialState,
    on(LobbyActions.init, (state) => ({
        ...state,
        isLoaded: false,
        error: null,
    })),
    on(LobbyActions.initSuccess, (state, params ) => ({
        ...state,
        isLoaded: true,
        error: null,
        activeLobbyId: params.activeLobbyId,
        
    })),
    on(LobbyActions.initFailed, (state, { error }) => ({
        ...state,
        isLoaded: true,
        error: error,
    })),
);

