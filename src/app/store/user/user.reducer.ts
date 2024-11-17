import { createReducer, on } from '@ngrx/store';
import { HttpFormattedErrorResponse } from '../../../types/http';
import { User } from '../../../types/users';
import { fetchUser, fetchUserError, fetchUserSuccess, setIsLoading, setUser } from './user.actions';

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: HttpFormattedErrorResponse | null;
}

export const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, action) => ({ ...state, user: action.user })),
  on(setIsLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
  on(fetchUser, (state) => ({ ...state, isLoading: true, error: null })),
  on(fetchUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isLoading: false,
    error: null,
  })),
  on(fetchUserError, (state, action) => ({
    ...state,
    user: null,
    isLoading: false,
    error: action.error,
  })),
);
