import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../firebase/auth.service';

@Injectable()
export class UserService {
  user$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    auth.user.subscribe(user => {
      this.retrieveUser(user.uid);
    });
  }

  getUser() {
    return this.user$.asObservable();
  }

  retrieveUser(userId) {
    this.db.database.ref('/users/' + userId).once('value').then((snapshot) => {
      this.user$.next(snapshot.val());
    });
  }

}
