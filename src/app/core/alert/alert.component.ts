import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'oms-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts$: BehaviorSubject<any>;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlerts();
    this.alerts$ = this.alertService.alerts$;
  }

}
