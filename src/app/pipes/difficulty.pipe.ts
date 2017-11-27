import { Pipe, PipeTransform } from '@angular/core';

const difficulty = {
  '1': 'Very Easy',
  '2': 'Easy',
  '3': 'Medium',
  '4': 'Hard',
  '5': 'Very Hard'
};

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return difficulty[value] || value;
  }

}
