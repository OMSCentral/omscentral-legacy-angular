import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../firebase/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth/reducers';
import { Login, SocialLogin } from '../state/auth/actions/auth';
import { Observable } from 'rxjs';
import { getLoginError } from '../state/auth/reducers';

@Component({
  selector: 'oms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  error$: Observable<any> | Promise<Observable<any>>;
  reset = false;

  constructor(public authService: AuthService, private router: Router, private store: Store<AuthState>) {}

  ngOnInit() {
    this.error$ = this.store.select(getLoginError);
    
  }

  resetPassword() {
    return this.authService
      .sendPasswordResetEmail(this.email.value)
      .then(() => {
        // this.error = '';
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
    this.store.dispatch(new SocialLogin(authProvider));
  }

  login() {
    this.store.dispatch(new Login({email: this.email.value, password: this.password.value}));
  }

  forgotEmail() {
    if (this.email) {
      this.authService.sendPasswordResetEmail(this.email.value).then(() => {
        // this.error = 'A password reset email has been sent';
      });
    }
  }
}
