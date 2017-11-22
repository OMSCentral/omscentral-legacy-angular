import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../firebase/auth.service';

@Component({
  selector: 'oms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  error = '';

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  login() {
    this.authService.login(this.email.value, this.password.value).then((err) => {
      this.password.setValue('');
      if (err) {
        this.error = err;
      } else {
        this.email.setValue('');
        this.error = '';
      }
    });
  }

}
