import { createAction, props } from '@ngrx/store';
import { IHttpErrorResponse } from '@shared';

export const init = createAction('[Lobby Facade] Start initialization');

export const initSuccess = createAction('[Lobby Effect] Initialization succeeded', props<{ activeLobbyId: string | null }>());

export const initFailed = createAction('[Lobby Effect] Initialization failed', props<{ error: IHttpErrorResponse }>());
