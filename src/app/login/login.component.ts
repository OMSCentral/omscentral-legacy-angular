import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../firebase/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth/reducers';
import { Login } from '../state/auth/actions/auth';

@Component({
  selector: 'oms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  error = '';
  socialError = '';
  reset = false;

  constructor(public authService: AuthService, private router: Router, private store: Store<AuthState>) {}

  ngOnInit() {
    // this.authService.user.subscribe(user => {
    //   if (user && user.uid) {
    //     this.router.navigate(['courses']);
    //   }
    // });
  }

  resetPassword() {
    return this.authService
      .sendPasswordResetEmail(this.email.value)
      .then(() => {
        this.error = '';
        this.reset = true;
      });
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  social(authProvider) {
    const self = this;
    // this.authService.social(authProvider).then(
    //   () => {
    //     this.router.navigate(['courses']);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  login() {
    this.store.dispatch(new Login({username: this.email.value, password: this.password.value}));
  }

  forgotEmail() {
    if (this.email) {
      // this.authService.sendPasswordResetEmail(this.email.value).then(() => {
      //   this.error = 'A password reset email has been sent';
      // });
    }
  }
}
