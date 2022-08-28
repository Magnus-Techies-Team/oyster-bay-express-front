import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, USER_FEATURE_KEY } from '@core/+state/user/state/reducer';

export const getUserState = createFeatureSelector<State>(USER_FEATURE_KEY);

export const isLoaded = createSelector(
    getUserState,
    (state) => (state.isLoaded),
);

export const getUser = createSelector(
    getUserState,
    (state) => (state.currentUser),
);
