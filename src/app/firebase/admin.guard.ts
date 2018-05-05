import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { User } from '../models/user';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.user && this.userService.user.admin) {
      return this.userService.user.admin ? true : false;
    }
    return this.userService.user$.pipe(
      map((user: User) => {
        if (user.admin) {
          return user.admin;
        } else {
          this.router.navigate(['/courses']);
          return false;
        }
      })
    );
  }
}
