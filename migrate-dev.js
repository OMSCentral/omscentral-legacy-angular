var fs = require("fs");
var _ = require("lodash");
var rawCurrent = fs.readFileSync("gt-course-surveys-dev-export.json");
var rawArchive = fs.readFileSync("gt-course-surveys-dev-archive-export.json");
var current = JSON.parse(rawCurrent);
var archive = JSON.parse(rawArchive);

current.RVW = Object.assign(current.RVW, archive.RVW);

var grades = {};
var specializations = current.SPC;

var merged = {};
merged.reviews = current.RVW;
merged.users = {};
merged.courses = {};

Object.keys(current.USR).forEach(function (userId) {
    var user = current.USR[userId];
    user.reviews = {};
    merged.users[userId] = user;
});

Object.keys(current.CRS).forEach(function (courseId) {
    var course = current.CRS[courseId];
    course.average = {};
    course.reviews = {};
    merged.courses[courseId] = course;
});

Object.keys(merged.reviews).forEach(function (reviewId) {
    var review = merged.reviews[reviewId];
    if (merged.courses[review.course]) {
        merged.courses[review.course].reviews[reviewId] = true;
    }
    if (merged.users[review.author]) {
        merged.users[review.author].reviews[reviewId] = true;
    }
});

function processGrades(grades) {
    const totals = {};
    if (grades) {
        Object.keys(grades).forEach(grade => {
            Object.keys(grades[grade]).forEach(letter => {
                if (Object.keys(totals).indexOf(letter) !== -1) {
                    totals[letter] += grades[grade][letter];
                } else {
                    totals[letter] = grades[grade][letter];
                }
            });
        });
    }
    return totals;
}

var courseGrades = current.GRD;
Object.keys(courseGrades).forEach(courseId => {
    grades[courseId] = {};
    grades[courseId].totals = processGrades(courseGrades[courseId]);
    grades[courseId].semesterGrades = Object.keys(courseGrades[courseId]).map(semGrade => {
        const grade = courseGrades[courseId][semGrade];
        grade.semester = semGrade;
        return grade;
    });
});


// recalculate averages and such
Object.keys(merged.courses).forEach(function (courseId) {
    var difficulty = 0;
    var diffNum = 0;
    var rating = 0;
    var ratingNum = 0;
    var workload = 0;
    var workNum = 0;

    if (merged.courses[courseId].reviews.length == 0) {
        merged.courses[courseId].average.difficulty = 0;
        merged.courses[courseId].average.rating = 0;
        merged.courses[courseId].average.workload = 0;
    } else {
        Object.keys(merged.courses[courseId].reviews).forEach(function (reviewId) {
            if (merged.reviews[reviewId].difficulty) {
                difficulty = difficulty + merged.reviews[reviewId].difficulty;
                diffNum++;
            }
            if (merged.reviews[reviewId].rating) {
                rating = rating + merged.reviews[reviewId].rating;
                ratingNum++;
            }
            if (merged.reviews[reviewId].workload) {
                workload = workload + merged.reviews[reviewId].workload;
                workNum++;
            }
        });
        if (diffNum == 0) {
            merged.courses[courseId].average.difficulty = 0;
        } else {
            merged.courses[courseId].average.difficulty = difficulty / diffNum;
        }
        if (ratingNum == 0) {
            merged.courses[courseId].average.rating = 0;
        } else {
            merged.courses[courseId].average.rating = rating / ratingNum;
        }
        if (workNum == 0) {
            merged.courses[courseId].average.workload = 0;
        } else {
            merged.courses[courseId].average.workload = workload / workNum;
        }
    }
});

var json = JSON.stringify(merged, null, 4);
fs.writeFile('merged-dev.json', json, 'utf8', function () {
    console.log("wrote merged-dev");
});

var tempDev = Object.assign(current, merged);
tempDev.alert = {
    type: 'info',
    text: 'OMS Central is under new management (@martzcodes).  Talk to me on slack in #OMSCentral',
    slack: true
};
var json = JSON.stringify(tempDev);
fs.writeFile('temp-merged-dev.json', json, 'utf8', function () {
    console.log("wrote temp-merged-dev");
});

json = JSON.stringify(grades, null, 4);
fs.writeFile('grades.json', json, 'utf8', function () {
    console.log("wrote grades");
});

json = JSON.stringify(specializations, null, 4);
fs.writeFile('specializations.json', json, 'utf8', function () {
    console.log("wrote specializations");
});
/*
{
    reviews: {
        "-KzQ51QJUPS8VK5naPrQ": {
            "author" : "IoEyvOStggUiM8ueeeTKqF8wuSA3",
            "course" : "6250",
            "created" : "2017-11-20T20:21:47Z",
            "difficulty" : 2,
            "rating" : 5,
            "semester" : "2017-3",
            "text" : "Learned a lot",
            "workload" : 10
        }
    },
    courses: {
        "6035" : {
            "department" : "CS",
            "foundational" : true,
            "icon" : "security",
            "name" : "Intro to Information Security",
            "number" : 6035,
            "reviews": {},
            "grades": {

            },
            "average" : {
                "difficulty" : 2.4,
                "rating" : 3.7,
                "workload" : 47.7
            }
        }
    },
    users: {
        "009c63e6-7f63-4bcb-9797-77b28f20b8d8" : {
            "anonymous" : false,
            "authProvider" : "password",
            "created" : "2016-06-23T16:22:10Z",
            "email" : "dfrakes3@gatech.edu",
            "name" : "dfrakes3",
            "profileImageUrl" : "https://secure.gravatar.com/avatar/da4b0c4591d4f1ee7ae6b54aa82c4e66?s=200&d=mm",
            "reviews": {}
        }
    }
}
*/

/*
    Remove Specializations from firebase, hard code them (they don't change)
    specializations: {
        
    }
    Remove semesters from firebase (easy to do with a code change)
*/