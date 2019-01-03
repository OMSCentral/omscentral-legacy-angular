import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../core/course.service';
import { GradeService } from '../core/grade.service';
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
    'abpercent',
    'cdfpercent',
    'withdrew',
  ];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
