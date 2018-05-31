var fs = require("fs");
var _ = require("lodash");
var rawBase = fs.readFileSync("./backups/20180107.json");
var rawTwo = fs.readFileSync("./backups/20180107-a.json");
var base = JSON.parse(rawBase);
var two = JSON.parse(rawBase);

console.log(Object.keys(base.reviews).length);
console.log(Object.keys(two.reviews).length);