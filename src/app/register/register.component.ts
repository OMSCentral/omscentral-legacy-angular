import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../firebase/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthState } from '../state/auth/reducers';
import { Store } from '@ngrx/store';
import { Register } from '../state/auth/actions/auth';
import { getRegisterError } from '../state/auth/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'oms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  resetForm: FormGroup;
  error$: Observable<any> | Promise<Observable<any>>;
  success = false;
  formValues: any = {};
  oobCode: string;
  mode: string;
  password: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AuthState>
  ) {
    this.createForm();
  }

  ngOnInit() {
    // https://omscentral.com/set-password?mode=%3Caction%3E&oobCode=%3Ccode%3E
    // this.sessionId = this.route
    //   .queryParamMap
    //   .map(params => params.get('session_id') || 'None');
    this.route.queryParamMap.subscribe(params => {
      this.mode = params.get('mode');
      this.oobCode = params.get('oobCode');
    });
    this.error$ = this.store.select(getRegisterError);
  }

  resetPassword() {
    console.log('here');
    if (this.oobCode) {
      console.log(this.oobCode);
      this.authService.resetPassword(this.oobCode, this.password).then(() => {
        console.log('here');
        this.oobCode = null;
        this.router.navigate(['login']);
      });
    }
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.registerForm.valueChanges.subscribe(changes => {
      this.formValues = changes;
    });
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.resetForm.valueChanges.subscribe(changes => {
      this.password = changes.password;
    });
  }

  register() {
    this.store.dispatch(new Register(this.formValues));

    // this.authService.signup(this.formValues).then(
    //   () => {
    //     this.success = true;
    //   },
    //   err => {
    //     this.error = err.message;
    //   }
    // );
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
    this.router.navigate(['login']);
  }
}
