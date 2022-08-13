import { createAction, props } from '@ngrx/store';
import { IHttpErrorResponse } from '@shared';

export const init = createAction('[Init Facade] Start initialization');

export const initSuccess = createAction('[Init Effect] Initialization succeeded');

export const initFailed = createAction('[Init Effect] Initialization failed', props<{ error: IHttpErrorResponse }>());
