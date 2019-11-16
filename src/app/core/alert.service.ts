import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable()
export class AlertService {
  systemAlert: MatSnackBarRef<any> = null;
  alert$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private db: AngularFireDatabase,
    private matSnackBar: MatSnackBar
  ) {
    // this.db.database.ref('/alerts').on('value', snapshot => {
    //   const alertsObj = snapshot.val();
    //   this.alert$.next(alertsObj[Object.keys(alertsObj)[0]]);
    //   console.log(this.alert$.value);
    // });
  }

  addAlert(content) {
    this.matSnackBar.open(content, null, {
      announcementMessage: content,
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }

  addSystemAlert(content) {
    this.systemAlert = this.matSnackBar.open(content, 'Dismiss', {
      announcementMessage: content,
      verticalPosition: 'top',
      duration: 5000,
    });
  }
}
