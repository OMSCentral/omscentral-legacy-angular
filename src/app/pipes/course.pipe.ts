import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'course',
})
export class CoursePipe implements PipeTransform {
  transform(courses: any[], args: string): any {
    if (args.length === 0) {
      return courses;
    } else {
      return courses.filter(course => {
        if (course.combined) {
          return (
            course.combined.toLowerCase().indexOf(args.toLowerCase()) !== -1
          );
        } else {
          return false;
        }
      });
    }
  }
}
