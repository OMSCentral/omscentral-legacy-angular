var fs = require("fs");
var _ = require("lodash");
var rawCurrent = fs.readFileSync("gt-surveyor-export.json");
var current = JSON.parse(rawCurrent);

var anon = current;
Object.keys(anon.users, function (userId) {
    anon.users[userId].email = userId;
    anon.users[userId].name = userId;
    anon.users[userId].profileImageUrl = userId;
});
json = JSON.stringify(anon, null, 4);
fs.writeFile('anonymized-backup.json', json, 'utf8', function () {
    console.log("wrote anonymized");
});