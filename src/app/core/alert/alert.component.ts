import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'oms-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alert: any = null;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert();
    
    this.alertService.alert$.subscribe(newAlert => {
      if (newAlert && newAlert.type !== 'hide') {
        this.alert = newAlert;
      } else {
        this.alert = null;
      }
    });
  }

}
