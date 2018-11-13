import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable()
export class SettingsService {
  settings: any = null;
  settings$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private db: AngularFireDatabase,
    private alertService: AlertService
  ) {}

  getSettings() {
    if (this.settings === null) {
      this.db.database.ref('/settings').on('value', snapshot => {
        const settingsObj = snapshot.val();
        this.settings = settingsObj;
        if (this.settings.alert) {
          this.alertService.addSystemAlert(this.settings.alert);
        }
        this.settings$.next(this.settings);
      });
    }
  }

  get downloaded() {
    if (this.settings === null) {
      this.getSettings();
      return false;
    } else {
      return true;
    }
  }
}
