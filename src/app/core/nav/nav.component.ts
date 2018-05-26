import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../firebase/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'oms-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  authenticated = false;
  user: any = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private settingsService: SettingsService
  ) {
    // userService.user$.subscribe(storedUser => {
    //   if (storedUser && storedUser.admin) {
    //     this.user.admin = storedUser.admin;
    //   }
    // });
    // auth.user.subscribe(user => {
    //   this.user = Object.assign(this.user, user);
    //   if (user) {
    //     this.authenticated = true;
    //   } else {
    //     this.authenticated = false;
    //   }
    // });
    settingsService.getSettings();
  }

  ngOnInit() {}

  logout() {
    // this.auth.logout();
    // this.router.navigate(['login']);
  }
}
