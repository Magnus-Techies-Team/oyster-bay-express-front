import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INIT_FEATURE_KEY, State } from '@core/+state/init/state/reducer';

export const getInitState = createFeatureSelector<State>(INIT_FEATURE_KEY);

export const getLoaded = createSelector(
    getInitState,
    (state) => state.isLoaded,
);

export const getError = createSelector(
    getInitState,
    (state) => state.error,
);
