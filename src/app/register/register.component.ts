import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../firebase/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'oms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error = '';
  socialError = '';
  success = false;
  formValues: any = {};

  constructor(public authService: AuthService, private router: Router,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user && user.uid) {
        this.router.navigate(['reviews']);
      }
    });
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
