import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../core/user.service';

import { Observable, of } from 'rxjs';
import { User, Authenticate } from '../models/user';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authState: any = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService
  ) {}

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

  register(values: Authenticate): Promise<User> {
    const email = values.email.toLowerCase();
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .createUserWithEmailAndPassword(email, values.password)
        .then(auth => {
          resolve(new User(auth.user));
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
          reject(err);
        });
    });
  }

  social(providerName): Promise<User> {
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

    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signInWithPopup(provider).then(auth => {
        const entity = {
          name: auth.user.providerData[0].displayName,
          email: auth.user.providerData[0].email,
          anonymous: true,
          profileImageUrl: auth.user.providerData[0].photoURL,
          authProvider: providerName,
        };
        console.log(entity);
        // this.userService.updateInfo(entity, auth.user);
        resolve(new User(auth.user));
      });
    });
  }

  login(auth: Authenticate): Promise<User> {
    console.log(auth);
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .signInWithEmailAndPassword(auth.email, auth.password)
        .then(auth => {
          resolve(new User(auth.user));
          return;
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
          reject(err);
          return err.message;
        });
    });
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }
}
