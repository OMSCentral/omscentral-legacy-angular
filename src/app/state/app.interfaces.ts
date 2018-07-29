import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './shared/utils';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}
