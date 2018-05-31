var fs = require("fs");
var _ = require("lodash");
var rawCurrent = fs.readFileSync("./backups/2018-05-28T00_15_43Z_gt-surveyor_data.json");
var current = JSON.parse(rawCurrent);

var anon = _.cloneDeep(current);
Object.keys(anon.users).forEach(userId => {
    anon.users[userId].email = userId;
    anon.users[userId].name = userId;
    anon.users[userId].profileImageUrl = userId;
});
json = JSON.stringify(anon, null, 4);
fs.writeFile('anonymized-backup.json', json, 'utf8', function () {
    console.log("wrote anonymized");
});