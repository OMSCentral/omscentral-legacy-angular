import { Component, OnInit } from '@angular/core';
import { AlertService } from '../core/alert/alert.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'oms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  alertForm: FormGroup;
  alerts$: BehaviorSubject<any>;
  alert: any;

  constructor(private alertService: AlertService, private fb: FormBuilder) {
    this.initAlertForm();
  }

  ngOnInit() {
  }

  initAlertForm() {
    this.alertForm = this.fb.group({
      text: ['', Validators.required],
      slack: ''
    });
    this.alertForm.valueChanges.subscribe(changes => {
      this.alert = changes;
      console.log(changes);
    });
  }

  save() {
    this.alertService.addAlert(this.alert);
    this.initAlertForm();
  }

}
