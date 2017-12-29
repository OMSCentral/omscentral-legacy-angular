import { Component, OnInit } from '@angular/core';
import { AlertService } from '../core/alert/alert.service';
import { CourseService } from '../courses/course.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'oms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  alertForm: FormGroup;
  courseForm: FormGroup;
  alerts$: BehaviorSubject<any>;
  alert: any;
  course: any;

  constructor(private courseService: CourseService, private alertService: AlertService, private fb: FormBuilder) {
    this.initAlertForm();
    this.initCourseForm();
  }

  ngOnInit() {
    this.alerts$ = this.alertService.alerts$;
  }

  initAlertForm() {
    this.alertForm = this.fb.group({
      text: ['', Validators.required],
      slack: ''
    });
    this.alertForm.valueChanges.subscribe(changes => {
      this.alert = changes;
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

  removeAlert(alert) {
    this.alertService.removeAlert(alert.id);
  }

}
