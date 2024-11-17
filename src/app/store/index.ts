import { ActionReducerMap } from '@ngrx/store';
import { LayoutState, layoutReducer } from './layout/layout.reducer';
import { UserState, userReducer } from './user/user.reducer';

export interface RootReducerState {
  layout: LayoutState;
  user: UserState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  user: userReducer,
};
