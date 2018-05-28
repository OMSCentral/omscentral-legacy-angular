import { AuthActionsUnion, AuthActionTypes } from '../actions/auth';
import { User, UserDetails } from '../../../models/user';

export interface State {
  loading: boolean;
  loggedIn: boolean;
  user: User | null;
  details: UserDetails | null;
  loginError: string | null;
  registerError: string | null;
}

export const initialState: State = {
  loading: false,
  loggedIn: false,
  user: null,
  details: null,
  loginError: null,
  registerError: null
};

export function reducer(state = initialState, action: AuthActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.GetUser: {
      return {
        ...state,
        loading: true
      };
    }
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload.user,
        loginError: null,
        registerError: null
      };
    }
    case AuthActionTypes.RegisterSuccess: {
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload.user,
        loginError: null,
        registerError: null
      };
    }
    case AuthActionTypes.DetailsSuccess: {
      return {
        ...state,
        loading: false,
        details: action.payload.details,
        loginError: null,
        registerError: null
      };
    }

    case AuthActionTypes.LoginFailure: {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        loginError: action.payload.message
      };
    }

    case AuthActionTypes.RegisterFailure: {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        registerError: action.payload.message
      };
    }

    case AuthActionTypes.LogoutSuccess: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getDetails = (state: State) => state.details;
export const getLoginError = (state: State) => state.loginError;
export const getRegisterError = (state: State) => state.registerError;