import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from '../firebase/auth.service';

@Injectable()
export class UserService {
  userId: string = null;
  user$: ReplaySubject<any> = new ReplaySubject();
  user: any = null;

  constructor(private db: AngularFireDatabase) {}

  getUser() {
    return this.user$.asObservable();
  }

  _format(entity) {
    return Object.assign({}, {
      created: entity.created || new Date(),
      updated: entity.updated || new Date(),
      authProvider: entity.authProvider || 'password',
      email: entity.email,
      name: entity.name,
      profileImageUrl: (entity.profileImageUrl || '').replace(/http:/i, 'https:'),
      anonymous: entity.anonymous,
      specialization: entity.specialization,
      reviews: {}
    });
  }

  retrieveUser(userId) {
    return this.db.database.ref('/users/' + userId).once('value').then((snapshot) => {
      this.user = snapshot.val();
      this.user$.next(snapshot.val());
    });
  }

  set(id, data) {
    const formatted = this._format(data);
    return this.db.database.ref('users').child(id).set(formatted).then(() => {
      this.retrieveUser(id);
    });
  }

  updateInfo(entity, authInfo) {
    const id = authInfo.uid;
    const formatted = this._format(entity);
    const updatedUser = Object.assign(this.user, formatted);
    this.retrieveUser(id).then(() => {
      if (this.user) {
        this.db.database.ref('users').child(id).update(updatedUser).then(() => {
          this.retrieveUser(id);
        });
      } else {
        this.set(id, formatted);
      }
    }, err => {
      console.log(err);
    });
  }
}
