import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>('user');
export const getUser = createSelector(getUserState, (state: UserState) => state.user);
export const getIsFetchingUser = createSelector(getUserState, (state: UserState) => state.isLoading);
export const getFetchUserError = createSelector(getUserState, (state: UserState) => state.error);
