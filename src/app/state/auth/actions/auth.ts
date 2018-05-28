import { Action } from '@ngrx/store';
import { User, Authenticate, UserDetails } from '../../../models/user';

export enum AuthActionTypes {
  GetUser = '[Auth] Get User',
  Login = '[Auth] Login',
  SocialLogin = '[Auth] Social Login',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  Details = '[Auth] Details',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LoginSuccess = '[Auth] Login Success',
  DetailsSuccess = '[Auth] Details Success',
  LoginFailure = '[Auth] Login Failure',
  RegisterFailure = '[Auth] Register Failure',
  LoginRedirect = '[Auth] Login Redirect',
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GetUser;

  constructor(public payload?: any) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class SocialLogin implements Action {
  readonly type = AuthActionTypes.SocialLogin;

  constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;

  constructor(public payload: Authenticate) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;

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

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
  constructor(public payload?: any) {}
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
  constructor(public payload?: any) {}
}

export type AuthActionsUnion =
  | GetUser
  | Login
  | LoginSuccess
  | SocialLogin
  | Register
  | RegisterSuccess
  | Details
  | DetailsSuccess
  | LoginFailure
  | RegisterFailure
  | LoginRedirect
  | Logout
  | LogoutSuccess;