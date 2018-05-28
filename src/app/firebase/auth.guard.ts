import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthState, getLoggedIn } from '../state/auth/reducers';
import { LoginRedirect } from '../state/auth/actions/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getLoggedIn),
      map(authed => {
        console.log(authed);
        if (!authed) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}