import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../firebase/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState, getRegisterError } from '../state/auth/reducers';
import { Login, SocialLogin, Register } from '../state/auth/actions/auth';
import { Observable } from 'rxjs';
import { getLoginError } from '../state/auth/reducers';

@Component({
  selector: 'oms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  resetForm: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  error$: Observable<any> | Promise<Observable<any>>;

  oobCode: string;
  mode: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<AuthState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.mode = params.get('mode');
      this.oobCode = params.get('oobCode');
    });
    this.error$ = this.store.select(getRegisterError);
  }

  social(authProvider) {
    const self = this;
    this.store.dispatch(new SocialLogin(authProvider));
  }

  resetPassword() {
    if (this.oobCode) {
      this.authService
        .resetPassword(this.oobCode, this.resetForm.value.password)
        .then(() => {
          this.oobCode = null;
          this.router.navigate(['login']);
        });
    }
  }

  register() {
    this.store.dispatch(new Register(this.registerForm.value));
  }

  login() {
    this.router.navigate(['login']);
  }
}
