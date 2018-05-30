import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map, take, switchMap, filter } from 'rxjs/operators';
import { AuthState, getLoggedIn, getLoaded } from '../state/auth/reducers';
import { LoginRedirect } from '../state/auth/actions/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>) {}

  waitForAuthToLoad(): Observable<boolean> {
    return this.store.select(getLoaded).pipe(filter(loaded => loaded), take(1));
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(getLoggedIn).pipe(
      map(authed => {
        if (!authed) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.waitForAuthToLoad().pipe(
      switchMap(() => this.isAuthenticated())
    );
  }
}
