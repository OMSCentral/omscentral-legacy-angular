var fs = require("fs");
var _ = require("lodash");
var rawCurrent = fs.readFileSync("anonymized-backup.json");
var current = JSON.parse(rawCurrent);

Object.keys(current.courses).forEach(courseId => {
    var reviews = Object.keys(current.courses[courseId].reviews || {});
    if (reviews) {
        reviews = reviews.filter(rev => {
            return rev;
        });
        var difficulty = 0;
        var diffNum = 0;
        var rating = 0;
        var ratingNum = 0;
        var workload = 0;
        var workNum = 0;
        reviews.forEach(revId => {
            var review = current.reviews[revId];
            if (review && review !== null) {
                if (review.difficulty) {
                    difficulty += review.difficulty;
                    diffNum++;
                }
                if (review.rating) {
                    rating += review.rating;
                    ratingNum++;
                }
                if (review.workload) {
                    workload += review.workload;
                    workNum++;
                }
            }
        });
        var update = {
            difficulty: difficulty / diffNum,
            rating: rating / ratingNum,
            workload: workload / workNum
        };
        current.courses[courseId].average = update;
    }
});

var json = JSON.stringify(current, null, 4);
fs.writeFile('temp-count-update.json', json, 'utf8', function () {
    console.log("wrote temp-count-update");
});