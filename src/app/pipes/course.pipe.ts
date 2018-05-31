import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course';

@Pipe({
  name: 'course',
})
export class CoursePipe implements PipeTransform {
  transform(course: string, courses: any): any {
    if (Object.keys(courses).indexOf(course) !== -1) {
      return courses[course].id + ': ' + courses[course].name;
    } else {
      return course;
    }
  }
}
