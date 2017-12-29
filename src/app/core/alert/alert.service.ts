import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlertService {
  alerts$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase) {
    this.db.database.ref('/alerts').orderByChild('active').equalTo(1).on('value', snapshot => {
      const alertObj = snapshot.val();
      if (alertObj !== null) {
        this.alerts$.next(Object.keys(alertObj).map(alertId => {
          const alert = alertObj[alertId];
          alert.id = alertId;
          return alert;
        }));
      } else {
        this.alerts$.next([]);
      }
    });
  }

  addAlert(alert: any) {
    this.db.database.ref('/alerts').push({
      type: alert.type || 'info',
      text: alert.text || '',
      slack: alert.slack ? 1 : 0 || 0,
      created: new Date().getTime(),
      active: 1
    });
  }

  removeAlert(alertId) {
    this.db.database.ref('/alerts/' + alertId).remove();
  }

}
