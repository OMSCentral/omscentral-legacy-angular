import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../firebase/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'oms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  resetForm: FormGroup;
  error = '';
  socialError = '';
  success = false;
  formValues: any = {};
  oobCode: string;
  mode: string;
  password: string;

  constructor(public authService: AuthService, private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user && user.uid) {
        this.router.navigate(['reviews']);
      }
    });
    // https://omscentral.com/set-password?mode=%3Caction%3E&oobCode=%3Ccode%3E
    // this.sessionId = this.route
    //   .queryParamMap
    //   .map(params => params.get('session_id') || 'None');
    this.route.queryParamMap.subscribe(params => {
      this.mode = params.get('mode');
      this.oobCode = params.get('oobCode');
    });
  }

  resetPassword() {
    if (this.oobCode) {
      this.authService.resetPassword(this.oobCode, this.password).then(() => {
        this.oobCode = null;
        this.router.navigate(['login']);
      });
    }
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.registerForm.valueChanges.subscribe(changes => {
      this.formValues = changes;
    });
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.resetForm.valueChanges.subscribe(changes => {
      this.password = changes.password;
    });
  }

  register() {
    this.authService.signup(this.formValues).then(() => {
      this.success = true;
    }, (err) => {
      this.error = err.message;
    });
  }

  social(authProvider) {
    const self = this;
    this.authService.social(authProvider).then(() => {
      this.router.navigate(['reviews']);
    }, (err) => {
      console.log(err);
    });
  }

  login() {
    this.router.navigate(['login']);
  }

}
