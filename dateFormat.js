var fs = require("fs");
var _ = require("lodash");
var rawCurrent = fs.readFileSync("./backups/2018-03-24T19_36_12Z_gt-surveyor_data.json");
var current = JSON.parse(rawCurrent);

var dateFormat = _.cloneDeep(current);
Object.keys(dateFormat.reviews).forEach(reviewId => {
    console.log(dateFormat.reviews[reviewId].created, new Date(dateFormat.reviews[reviewId].created).getTime());
    dateFormat.reviews[reviewId].created = new Date(dateFormat.reviews[reviewId].created).getTime();
    dateFormat.reviews[reviewId].updated = new Date(dateFormat.reviews[reviewId].updated).getTime();
});
json = JSON.stringify(dateFormat, null, 4);
fs.writeFile('./backups/dateFormat.json', json, 'utf8', function () {
    console.log("wrote");
});
