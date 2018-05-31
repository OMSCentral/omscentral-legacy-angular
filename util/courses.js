var fs = require("fs");
var _ = require("lodash");
var rawBase = fs.readFileSync("./backups/20180107.json");
var base = JSON.parse(rawBase);

var courses = {};
var firebase = _.cloneDeep(base);
firebase.courses = {};

Object.keys(base.courses).forEach(baseId => {
    var newKey = (base.courses[baseId].department || 'CS') + '-' + baseId;
    var newCourse = {
        id: newKey,
        name: base.courses[baseId].name,
        department: base.courses[baseId].department || 'CS',
        foundational: base.courses[baseId].foundational,
        number: baseId,
    };
    var newFirebase = {
        average: base.courses[baseId].average || {
            difficulty: null,
            rating: null,
            workload: null
        },
        reviews: base.courses[baseId].reviews || {}
    };
    courses[newKey] = newCourse;
    firebase.courses[newKey] = newFirebase;
    Object.keys(newFirebase.reviews).forEach(revId => {
        if (firebase.reviews[revId]) {
            firebase.reviews[revId].course = newKey;
        }
    });
});


var json = JSON.stringify(courses, null, 4);
fs.writeFile('courses.json', json, 'utf8', function () {
    console.log("wrote courses");
});

var firebaseJson = JSON.stringify(firebase, null, 4);
fs.writeFile('./backups/firebase-courses.json', firebaseJson, 'utf8', function () {
    console.log("wrote firebase");
});