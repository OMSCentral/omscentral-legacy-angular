import { Component, OnInit } from '@angular/core';
import * as jsonData from '../../../merged-dev.json';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../core/course.service';

@Component({
  selector: 'oms-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  courses$: Observable<any[]>;
  users = [
    {
      id: 'safd',
      name: 'asdf',
      creation: new Date(),
      pokemon: {
        name: 'qwerty'
      },
      color: 'blue'
    }];

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.courses$ = this.courseService.getCourses();
  }

  goToCourse(course) {
    this.router.navigate(['/reviews', course]);
  }

}
