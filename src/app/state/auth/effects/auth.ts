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
} from '../actions/auth';
import { Authenticate } from '../../../models/user';
import { AuthService } from '../../../firebase/auth.service';
import { Action } from '@ngrx/store';
import { UserService } from '../../../core/user.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login: Observable<Action> = this.actions
    .ofType<Login>(AuthActionTypes.Login)
    .pipe(
      map(action => {
        return action.payload;
      }),
      switchMap(auth => this.authService.login(auth)),
      flatMap(user => [
        new LoginSuccess({user}),
        new Details(user),
      ])
    );

    @Effect()
    details: Observable<Action> = this.actions
      .ofType<Details>(AuthActionTypes.Details)
      .pipe(
        map(action => {
          return action.payload;
        }),
        switchMap(user => this.userService.retrieveUser(user)),
        map(details => new DetailsSuccess({details}))
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
    private userService: UserService
  ) {}
}
