import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courses',
})
export class CoursesPipe implements PipeTransform {
  transform(courses: any, sortObj: any): any {
    let sorted = courses;
    if (
      sortObj.type.length > 0 &&
      Object.keys(courses[0]).indexOf(sortObj.type) !== -1
    ) {
      sorted = courses.sort((a, b) => {
        return (a[sortObj.type] - b[sortObj.type]) * sortObj.dir;
      });
    }
    return sorted;
  }
}
