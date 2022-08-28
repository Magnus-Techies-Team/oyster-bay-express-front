import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURRENT_LOBBY_FEATURE_KEY, State } from '@core/+state/current-lobby/state/reducer';

export const getLobbyState = createFeatureSelector<State>(CURRENT_LOBBY_FEATURE_KEY);

export const getLoaded = createSelector(
    getLobbyState,
    (state) => state.isLoaded,
);

export const getError = createSelector(
    getLobbyState,
    (state) => state.error,
);

export const getActiveLobbyId = createSelector(
    getLobbyState,
    (state) => state.activeLobbyId,
);
