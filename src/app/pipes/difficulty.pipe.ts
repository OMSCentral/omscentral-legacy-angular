import { Pipe, PipeTransform } from '@angular/core';
import { Difficulty } from '../enums/difficulty.enum';

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Difficulty[value] || value;
  }

}
