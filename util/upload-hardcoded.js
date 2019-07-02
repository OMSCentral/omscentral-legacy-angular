var fs = require('fs');
var _ = require('lodash');
var rawCurrent = fs.readFileSync(
  './backups/2019-05-11T14_34_11Z_gt-surveyor_data.json'
);
var current = JSON.parse(rawCurrent);

var rawCourses = fs.readFileSync('./courses.json');
var courses = JSON.parse(rawCourses);

Object.keys(current.courses).forEach(course => {
  current.courses[course] = {
    ...current.courses[course],
    ...courses[course],
  };
});

json = JSON.stringify(current, null, 4);
fs.writeFile('courses-merged.json', json, 'utf8', function() {
  console.log('wrote courses');
});
