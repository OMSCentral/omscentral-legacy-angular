import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlertService {
  alert$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase) {}

  getAlert() {
    return this.db.database.ref('/alerts').once('value').then((snapshot) => {
      this.alert$.next(snapshot.val());
    });
  }

  setAlert() {
    this.db.database.ref('/alerts').set({
      type: 'info',
      text: 'insert text here'
    });
  }

}
