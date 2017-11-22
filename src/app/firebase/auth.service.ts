import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(auth => {
      console.log("user subscribe: ", auth);
      this.authState = auth;
    });
  }

  get authenticated(): boolean {
    console.log("get authenticated", this.authState);
    return this.authState !== null;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        console.log(auth);
        this.authState = auth;
        return;
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        return err.message;
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
