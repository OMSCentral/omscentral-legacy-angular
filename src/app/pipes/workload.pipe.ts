import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workload'
})
export class WorkloadPipe implements PipeTransform {

  transform(workload: number, args?: any): any {
    if (workload === 1) {
      return workload + ' hour/week';
    }
    if (workload > 1) {
      return workload + ' hours/week';
    }
    return '';
  }

}
