import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../firebase/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SettingsService } from '../settings.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/reducers';
import { getUser } from '../../state/auth/reducers';
import { Observable } from 'rxjs';
import { Logout } from '../../state/auth/actions/auth';

@Component({
  selector: 'oms-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user$: Observable<any> | Promise<Observable<any>>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private settingsService: SettingsService,
    private store: Store<AuthState>
  ) {
    this.user$ = this.store.select(getUser);
    settingsService.getSettings();
  }

  ngOnInit() {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
