const seed = require("./seed");
const db = require("./connection");
const users = require("./data/testUsers.json");
const plants = require("./data/plantsTestTEMP.json");
const zones = require("./data/zones.json");

seed(users, plants, zones).then(() => {
  return db.end();
});
