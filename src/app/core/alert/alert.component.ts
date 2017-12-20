import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'oms-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts$: any = null;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alerts$ = this.alertService.alerts$;
  }

}
