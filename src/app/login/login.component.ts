import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
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
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error$: Observable<any> | Promise<Observable<any>>;
  reset = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<AuthState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.error$ = this.store.select(getLoginError);
  }

  resetPassword() {
    return this.authService
      .sendPasswordResetEmail(this.loginForm.value.email)
      .then(() => {
        // this.error = '';
        this.reset = true;
      });
  }

  social(authProvider) {
    const self = this;
    this.store.dispatch(new SocialLogin(authProvider));
  }

  login() {
    this.store.dispatch(
      new Login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
    );
  }
}
