import { Component, OnInit } from '@angular/core';
import * as jsonData from '../../../merged-dev.json';

@Component({
  selector: 'oms-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  courses = [];

  constructor() {
    this.courses = Object.keys((<any>jsonData).courses).map(function (courseId) {
      const course = (<any>jsonData).courses[courseId];
      course.numReviews = Object.keys(course.reviews).length;
      course.id = courseId;
      return course;
    });
  }

  ngOnInit() {
  }

}
