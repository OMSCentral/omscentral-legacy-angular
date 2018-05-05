import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsService {
  settings: any = null;
  settings$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase) {}

  getSettings() {
    if (this.settings === null) {
      this.db.database.ref('/settings').on('value', snapshot => {
        const settingsObj = snapshot.val();
        this.settings = settingsObj;
        this.settings$.next(this.settings);
      });
    }
  }

  update(newSettings) {
    this.db.database.ref('/settings').set(newSettings);
  }

  get downloaded() {
    if (this.settings === null) {
      this.getSettings();
      return false;
    } else {
      return true;
    }
  }

  get cacheLength() {
    if (this.settings === null) {
      this.getSettings();
      return 24 * 60 * 60 * 1000;
    } else {
      if (!this.settings.cacheLength && this.settings.cacheLength !== 0) {
        return 24 * 60 * 60 * 1000;
      } else {
        return Number(this.settings.cacheLength) * 1000 * 60;
      }
    }
  }
}
