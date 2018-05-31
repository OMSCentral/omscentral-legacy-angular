import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../firebase/auth.service';
import { User, UserDetails, WriteableUser } from '../models/user';

@Injectable()
export class UserService {
  userId: string = null;
  user$: ReplaySubject<User> = new ReplaySubject();
  user: any = null;

  constructor(private db: AngularFireDatabase) {}

  getUser() {
    return this.user$.asObservable();
  }

  retrieveUser(user: User): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('/users/' + user.uid)
        .once('value')
        .then(snapshot => {
          const details = snapshot.val();
          if (details !== null) {
            resolve(new UserDetails(details));
          } else {
            resolve(this.set(user.uid, user));
          }
        });
    });
  }

  set(id, data): Promise<UserDetails> {
    const formatted = new WriteableUser(data);
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('users')
        .child(id)
        .set(formatted)
        .then(snapshot => {
          resolve(this.retrieveUser(new User({ uid: id })));
        });
    });
  }

  updateInfo(entity, authInfo) {
    const id = authInfo.uid;
    const formatted = new UserDetails(entity);
    const updatedUser = Object.assign(this.user, formatted);
    this.retrieveUser(id).then(
      () => {
        if (this.user) {
          this.db.database
            .ref('users')
            .child(id)
            .update(updatedUser);
        } else {
          this.set(id, formatted);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
