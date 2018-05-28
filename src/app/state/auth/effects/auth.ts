import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap, flatMap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  Details,
  DetailsSuccess,
  Register,
  SocialLogin,
  RegisterSuccess,
  RegisterFailure,
  GetUser,
  Logout,
  LogoutSuccess,
} from '../actions/auth';
import { Authenticate, User } from '../../../models/user';
import { AuthService } from '../../../firebase/auth.service';
import { Action } from '@ngrx/store';
import { UserService } from '../../../core/user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  getUser: Observable<Action> = this.actions
    .ofType<GetUser>(AuthActionTypes.GetUser)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.afAuth.authState),
      map(authData => {
        if (authData) {
          const user = new User(authData);
          console.log(user);
          return new LoginSuccess({ user });
        } else {
          return new LogoutSuccess();
        }
      })
    );

  @Effect()
  register: Observable<Action> = this.actions
    .ofType<Register>(AuthActionTypes.Register)
    .pipe(
      map(action => {
        return action.payload;
      }),
      switchMap(auth => this.authService.register(auth)),
      flatMap(user => [
        new RegisterSuccess({ user }),
        new Details(user),
      ]),
      catchError(err => of(new RegisterFailure(err)))
    );

  @Effect()
  login: Observable<Action> = this.actions
    .ofType<Login>(AuthActionTypes.Login)
    .pipe(
      map(action => {
        return action.payload;
      }),
      switchMap(auth => this.authService.login(auth)),
      flatMap(user => [
        new LoginSuccess({ user }),
        new Details(user),
      ]),
      catchError(err => of(new LoginFailure(err)))
    );

  @Effect()
  logout: Observable<Action> = this.actions
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      map(action => action.payload),
      switchMap(auth => this.authService.logout()),
      map(logout => new LogoutSuccess())
    );

  @Effect()
  socialLogin: Observable<Action> = this.actions
    .ofType<SocialLogin>(AuthActionTypes.SocialLogin)
    .pipe(
      map(action => {
        return action.payload;
      }),
      switchMap(provider => this.authService.social(provider)),
      flatMap(user => [
        new LoginSuccess({ user }),
        new Details(user),
      ]),
      catchError(err => of(new LoginFailure(err)))
    );

  @Effect()
  details: Observable<Action> = this.actions
    .ofType<Details>(AuthActionTypes.Details)
    .pipe(
      map(action => {
        return action.payload;
      }),
      switchMap(user => this.userService.retrieveUser(user)),
      map(details => new DetailsSuccess({ details }))
    );

  @Effect({ dispatch: false })
  detailsSuccess$ = this.actions.pipe(
    ofType(AuthActionTypes.DetailsSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private afAuth: AngularFireAuth
  ) { }
}
