const seed = require("./seed");
const db = require("./connection");
const users = require("./data/testUsers.json");
const plants = require("./data/plants.json");
const zones = require("./data/zones.json");
const ownedPlants = require("./data/ownedPlants.json");
const favePlants = require("./data/favePlants.json");

seed(users, plants, zones, ownedPlants, favePlants).then(() => {
  return db.end();
});
