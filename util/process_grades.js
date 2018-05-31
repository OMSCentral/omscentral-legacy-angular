var fs = require('fs');

var rawGrades = fs.readFileSync("grades_raw_summer2017.json");
var grades = JSON.parse(rawGrades).grades;

var courses = {};
grades.forEach(function(row) {
    var split = row.toLowerCase().split(',');
    if (split[0].indexOf('o01') !== -1) {
        // OMSCS class...
        var seasonFull = split[2].split(' - ')[1];
        var season = 1;
        if (seasonFull.indexOf('summer')) {
            season = 2;
        }
        if (seasonFull.indexOf('fall')) {
            season = 3;
        }

        var year = seasonFull.split(' ')[0];
        if (Number(year) >= 2014) {
            // valid year
            var course = [
                split[0].split(' ')[0],
                split[0].split(' ')[1]
            ].join('-');
            if (split[1] !== 'total') {
                if (Object.keys(courses).indexOf(course) === -1) {
                    courses[course] = {};
                }
                var seasonId = year + '-' + season;

                if (Object.keys(courses[course]).indexOf(seasonId) === -1) {
                    courses[course][seasonId] = {};
                }
                courses[course][seasonId][split[1]] = split[3];
            }
        }
    }
});

var output = {};

Object.keys(courses).forEach(function(courseLower) {
    var course = courseLower.toUpperCase();
    output[course] = {};
    output[course].totals = {
        "a": 0,
        "b": 0,
        "c": 0,
        "d": 0,
        "f": 0,
        "w": 0,
        "ab": 0,
        "cdf": 0,
        "total": 0
    };
    output[course].semesterGrades = [];
    output[course].semesterPercents = [];
    Object.keys(courses[courseLower]).forEach(function(semester) {
        var temp = {
            "a": Number(courses[courseLower][semester].a) || 0,
            "b": Number(courses[courseLower][semester].b) || 0,
            "c": Number(courses[courseLower][semester].c) || 0,
            "d": Number(courses[courseLower][semester].d) || 0,
            "f": Number(courses[courseLower][semester].f) || 0,
            "w": Number(courses[courseLower][semester].w) || 0,
            "ab": 0,
            "cdf": 0,
            "total": 0,
            "semester": semester
        };
        temp.ab = temp.a + temp.b;
        temp.cdf = temp.c + temp.d + temp.f;
        temp.total = temp.ab + temp.cdf;
        output[course].totals.a = output[course].totals.a + temp.a;
        output[course].totals.b = output[course].totals.b + temp.b;
        output[course].totals.c = output[course].totals.c + temp.c;
        output[course].totals.d = output[course].totals.d + temp.d;
        output[course].totals.f = output[course].totals.f + temp.f;
        output[course].totals.w = output[course].totals.w + temp.w;
        output[course].totals.ab = output[course].totals.ab + temp.ab;
        output[course].totals.cdf = output[course].totals.cdf + temp.cdf;
        output[course].totals.total = output[course].totals.total + temp.total;
        output[course].semesterGrades.push(temp);

        var tempPercents = {
            "a": temp.a / temp.total,
            "b": temp.b / temp.total,
            "c": temp.c / temp.total,
            "d": temp.d / temp.total,
            "f": temp.f / temp.total,
            "w": temp.w / temp.total,
            "ab": temp.ab / temp.total,
            "cdf": temp.cdf / temp.total,
            "total": 1
        };
        output[course].semesterPercents.push(tempPercents);
    });
    output[course].percents = {
        "a": output[course].totals.a / output[course].totals.total,
        "b": output[course].totals.b / output[course].totals.total,
        "c": output[course].totals.c / output[course].totals.total,
        "d": output[course].totals.d / output[course].totals.total,
        "f": output[course].totals.f / output[course].totals.total,
        "w": output[course].totals.w / output[course].totals.total,
        "ab": output[course].totals.ab / output[course].totals.total,
        "cdf": output[course].totals.cdf / output[course].totals.total,
        "total": 1
    };
});

json = JSON.stringify(output, null, 4);
fs.writeFile('grades.json', json, 'utf8', function () {
    console.log("wrote grades");
});

/*
"CS-6035": {
        "totals": {
            "a": 1034,
            "b": 330,
            "c": 39,
            "d": 14,
            "f": 7,
            "i": 1,
            "s": 1,
            "t": 1597,
            "u": 0,
            "v": 0,
            "w": 171,
            "ab": 1364,
            "cdf": 60,
            "total": 1424
        },
        "percents": {
            "a": 0.726123595505618,
            "b": 0.23174157303370788,
            "c": 0.027387640449438203,
            "d": 0.009831460674157303,
            "f": 0.0049157303370786515,
            "i": 0.0007022471910112359,
            "s": 0.0007022471910112359,
            "t": 1597,
            "u": 0,
            "v": 0,
            "w": 171,
            "ab": 0.9578651685393258,
            "cdf": 0.042134831460674156,
            "total": 1
        },
        "semesterGrades": [
            {
                "a": 126,
                "b": 97,
                "c": 6,
                "d": 0,
                "f": 0,
                "i": 0,
                "s": 0,
                "t": 245,
                "u": 0,
                "v": 0,
                "w": 16,
                "ab": 223,
                "cdf": 6,
                "total": 229,
                "semester": "2015-3"
            },
*/