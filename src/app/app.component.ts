import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './core/settings.service';

@Component({
  selector: 'oms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'oms';
  downloaded = false;
  maintenance = false;
  constructor(public router: Router, private settingsService: SettingsService) {
    this.settingsService.settings$.subscribe(settings => {
      if (settings !== null) {
        this.downloaded = true;
        this.maintenance = settings.maintenance || false;
      }
    });
  }
}
