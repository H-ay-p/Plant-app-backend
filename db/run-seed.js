const seed = require("./seed");
const db = require("./connection");
const users = require("./data/users");

seed(users).then(() => {
  return db.end();
});
