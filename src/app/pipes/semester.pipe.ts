import { Pipe, PipeTransform } from '@angular/core';

const sem = {
  '0000-0' : {
    'season' : 0,
    'year' : 0
  },
  '2014-1' : {
    'season' : 1,
    'year' : 2014
  },
  '2014-2' : {
    'season' : 2,
    'year' : 2014
  },
  '2014-3' : {
    'season' : 3,
    'year' : 2014
  },
  '2015-1' : {
    'season' : 1,
    'year' : 2015
  },
  '2015-2' : {
    'season' : 2,
    'year' : 2015
  },
  '2015-3' : {
    'season' : 3,
    'year' : 2015
  },
  '2016-1' : {
    'season' : 1,
    'year' : 2016
  },
  '2016-2' : {
    'season' : 2,
    'year' : 2016
  },
  '2016-3' : {
    'season' : 3,
    'year' : 2016
  },
  '2017-1' : {
    'season' : 1,
    'year' : 2017
  },
  '2017-2' : {
    'season' : 2,
    'year' : 2017
  },
  '2017-3' : {
    'season' : 3,
    'year' : 2017
  }
};

const season = {
  '1': 'Spring',
  '2': 'Summary',
  '3': 'Fall'
};

@Pipe({
  name: 'semester'
})
export class SemesterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const semester = sem[value];
    if (semester) {
      return season[semester.season] + ' ' + semester.year;
    } else {
      return '';
    }
  }

}
