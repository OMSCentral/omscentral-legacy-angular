import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable()
export class AlertService {
  systemAlert: MatSnackBarRef<any> = null;

  constructor(
    private db: AngularFireDatabase,
    private matSnackBar: MatSnackBar
  ) {}

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
