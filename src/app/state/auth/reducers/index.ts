import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromAuth from './auth';
import { AppState } from '../../app.interfaces';

export interface AuthState {
  status: fromAuth.State;
}

export interface State extends AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);
export const getLoading = createSelector(selectAuthStatusState, fromAuth.getLoading);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const getUserDetails = createSelector(selectAuthStatusState, fromAuth.getDetails);
export const getLoginError = createSelector(selectAuthStatusState, fromAuth.getLoginError);
export const getRegisterError = createSelector(selectAuthStatusState, fromAuth.getRegisterError);