const seed = require("./seed");
const db = require("./connection");
const users = require("./data/testUsers.json");
const plants = require("./data/plantsTestTEMP.json");

seed(users, plants).then(() => {
  return db.end();
});
