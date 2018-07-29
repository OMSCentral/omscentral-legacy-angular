import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { AppState } from './app.interfaces';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    return reducer(state, action);
  };
}

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
