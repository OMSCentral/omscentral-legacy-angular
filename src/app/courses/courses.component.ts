import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../courses/course.service';
import { GradeService } from '../grades/grade.service';
import { Course } from '../models/course';

@Component({
  selector: 'oms-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'combined',
    'numReviews',
    'work',
    'difficulty',
    'rating',
    'enrolled',
    'ab',
    'cdf',
    'withdrew'
  ];

  constructor() {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onSearchKeyup($event) {
    const name = $event.target.value;
    this.changeSpecialization(this.specialization);
    if (name !== "") {
        this.courses = this.courses.filter(course => {
            return course.combined.toUpperCase().indexOf(name.toUpperCase()) !== -1;
        });
    }
  }
}
