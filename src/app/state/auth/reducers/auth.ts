import { AuthActionsUnion, AuthActionTypes } from '../actions/auth';
import { User, UserDetails } from '../../../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
  details: UserDetails | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  details: null
};

export function reducer(state = initialState, action: AuthActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };
    }
    case AuthActionTypes.DetailsSuccess: {
      return {
        ...state,
        details: action.payload.details
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getDetails = (state: State) => state.details;