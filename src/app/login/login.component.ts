import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../firebase/auth.service';
import { Router } from '@angular/router';

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

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user && user.uid) {
        this.router.navigate(['courses']);
      }
    });
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
    this.authService.social(authProvider).then(
      () => {
        this.router.navigate(['courses']);
      },
      err => {
        console.log(err);
      }
    );
  }

  login() {
    this.authService.login(this.email.value, this.password.value).then(
      err => {
        this.password.setValue('');
        if (err) {
          this.error = err;
        } else {
          this.email.setValue('');
          this.error = '';
          this.router.navigate(['courses']);
        }
      },
      err => {
        this.error = err.message;
      }
    );
  }

  forgotEmail() {
    if (this.email) {
      this.authService.sendPasswordResetEmail(this.email.value).then(() => {
        this.error = 'A password reset email has been sent';
      });
    }
  }
}
