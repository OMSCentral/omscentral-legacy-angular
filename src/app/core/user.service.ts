import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../firebase/auth.service';
import { User, UserDetails } from '../models/user';

@Injectable()
export class UserService {
  userId: string = null;
  user$: ReplaySubject<User> = new ReplaySubject();
  user: any = null;

  constructor(private db: AngularFireDatabase) {}

  getUser() {
    return this.user$.asObservable();
  }

  _format(entity) {
    return Object.assign(
      {},
      {
        created: entity.created || new Date(),
        updated: entity.updated || new Date(),
        authProvider: entity.authProvider || 'password',
        email: entity.email,
        name: entity.name,
        profileImageUrl: (entity.profileImageUrl || '').replace(
          /http:/i,
          'https:'
        ),
        anonymous: entity.anonymous,
        specialization: entity.specialization,
        reviews: {},
      }
    );
  }

  retrieveUser(user: User): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      this.db.database
      .ref('/users/' + user.uid)
      .once('value')
      .then(snapshot => {
        const details = snapshot.val();
        resolve(new UserDetails(details));
      });
    });
  }

  set(id, data) {
    const formatted = this._format(data);
    return this.db.database
      .ref('users')
      .child(id)
      .set(formatted)
      .then(() => {
        this.retrieveUser(id);
      });
  }

  updateInfo(entity, authInfo) {
    const id = authInfo.uid;
    const formatted = this._format(entity);
    const updatedUser = Object.assign(this.user, formatted);
    this.retrieveUser(id).then(
      () => {
        if (this.user) {
          this.db.database
            .ref('users')
            .child(id)
            .update(updatedUser)
            .then(() => {
              this.retrieveUser(id);
            });
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
