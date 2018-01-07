import { Component, OnInit } from '@angular/core';
import { AlertService } from '../core/alert/alert.service';
import { CourseService } from '../courses/course.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SettingsService } from '../core/settings.service';

@Component({
  selector: 'oms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  alertForm: FormGroup;
  courseForm: FormGroup;
  settingsForm: FormGroup;
  alerts$: BehaviorSubject<any>;
  alert: any;
  settings: any;
  course: any;

  constructor(private courseService: CourseService, private alertService: AlertService,
    private fb: FormBuilder, private settingsService: SettingsService) {
    this.initAlertForm();
    this.initCourseForm();
    this.initSettingsForm();
  }

  ngOnInit() {
    this.alerts$ = this.alertService.alerts$;
  }

  initAlertForm() {
    this.alertForm = this.fb.group({
      text: ['', Validators.required],
      type: ['info', Validators.required],
      slack: ''
    });
    this.alertForm.valueChanges.subscribe(changes => {
      this.alert = changes;
    });
  }

  initSettingsForm() {
    this.settingsForm = this.fb.group({
      cacheLength: [this.settingsService.cacheLength / 60 / 1000, Validators.required]
    });
    this.settingsForm.valueChanges.subscribe(changes => {
      this.settings = changes;
    });
  }

  initCourseForm() {
    this.courseForm = this.fb.group({
      department: ['', Validators.required],
      foundational: '',
      name: ['', Validators.required],
      number: ['', Validators.required],
      program: ['', Validators.required]
    });
    this.courseForm.valueChanges.subscribe(changes => {
      this.course = changes;
    });
  }

  saveAlert() {
    this.alertService.addAlert(this.alert);
    this.initAlertForm();
  }

  saveCourse() {
    this.courseService.push(this.course);
    this.initCourseForm();
  }

  saveSettings() {
    this.settingsService.update(this.settings);
    this.initSettingsForm();
  }

  removeAlert(alert) {
    this.alertService.removeAlert(alert.id);
  }

}
