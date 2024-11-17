import { createAction, props } from '@ngrx/store';
import { User } from '../../../types/users';
import { HttpFormattedErrorResponse } from '../../../types/http';

export const setUser = createAction('[User] Set User', props<{ user: User }>());
export const setIsLoading = createAction('[User] Set Is Loading', props<{ isLoading: boolean }>());
export const fetchUser = createAction('[User] Fetch User');
export const fetchUserSuccess = createAction('[User] Fetch User Success', props<{ user: User }>());
export const fetchUserError = createAction('[User] Fetch User Failure', props<{ error: HttpFormattedErrorResponse }>());
