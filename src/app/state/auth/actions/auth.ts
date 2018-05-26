import { Action } from '@ngrx/store';
import { User, Authenticate, UserDetails } from '../../../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Details = '[Auth] Details',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  DetailsSuccess = '[Auth] Details Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class Details implements Action {
  readonly type = AuthActionTypes.Details;

  constructor(public payload: User) {}
}

export class DetailsSuccess implements Action {
  readonly type = AuthActionTypes.DetailsSuccess;

  constructor(public payload: { details: UserDetails }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | Login
  | LoginSuccess
  | Details
  | DetailsSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;