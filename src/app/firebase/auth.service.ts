import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../core/user.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(auth => {
      if (auth && auth.uid !== null) {
        this.authState = auth;
        this.userService.retrieveUser(auth.uid);
      }
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserObservable(): any {
    return this.firebaseAuth.auth;
  }

  sendPasswordResetEmail(email) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  resetPassword(oobCode, password) {
    return this.firebaseAuth.auth.confirmPasswordReset(oobCode, password);
  }

  signup(values) {
    const email = values.email.toLowerCase();
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, values.password)
      .then(auth => {
        this.authState = auth;
        const entity = {
          name: values.name,
          email: email
        };
        return this.userService.updateInfo(entity, auth);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  social(providerName) {
    let provider;
    switch (providerName) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        break;

      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        provider.addScope('public_profile');
        break;

      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;

      case 'github':
        provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('user:email');
        break;

      default:
        throw new Error('Invalid provider.');
    }

    return this.firebaseAuth.auth.signInWithPopup(provider);
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        this.authState = auth;
        return;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        return err.message;
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
