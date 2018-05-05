import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AlertService {
  alerts: any = null;
  alerts$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase) {}

  getAlerts() {
    if (this.alerts === null) {
      this.db.database
        .ref('/alerts')
        .orderByChild('active')
        .equalTo(1)
        .on('value', snapshot => {
          const alertObj = snapshot.val();
          if (alertObj !== null) {
            this.alerts = Object.keys(alertObj).map(alertId => {
              const alert = alertObj[alertId];
              alert.id = alertId;
              return alert;
            });
            this.alerts$.next(this.alerts);
          } else {
            this.alerts = [];
            this.alerts$.next([]);
          }
        });
    }
  }

  addAlert(alert: any) {
    this.db.database.ref('/alerts').push({
      type: alert.type || 'info',
      text: alert.text || '',
      slack: alert.slack ? 1 : 0 || 0,
      created: new Date().getTime(),
      active: 1,
    });
  }

  removeAlert(alertId) {
    this.db.database.ref('/alerts/' + alertId).remove();
  }
}
