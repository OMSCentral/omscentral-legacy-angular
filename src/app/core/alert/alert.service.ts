import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlertService {
  alerts$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase) {
    this.db.database.ref('/alerts').on('value', snapshot => {
      const alertObj = snapshot.val();
      if (alertObj !== null) {
        this.alerts$.next(Object.keys(alertObj).forEach(alert => {
          return alertObj[alert].active;
        }));
      }
    });
  }

  addAlert(alert: any) {
    this.db.database.ref('/alerts').push({
      type: alert.type || 'info',
      text: alert.text || '',
      slack: alert.slack || false,
      active: true
    });
  }

  disableAlert(alertId) {
    this.db.database.ref('/alerts/' + alertId + '/active').set(false);
  }

}
