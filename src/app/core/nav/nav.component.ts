import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../firebase/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'oms-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  authenticated = false;

  constructor(private auth: AuthService, private router: Router) {
    auth.user.subscribe(user => {
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
