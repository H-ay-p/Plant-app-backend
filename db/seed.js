const db = require("./connection.js");

// NOTE - should cuisine be in there?

function seed() {
  return db
    .query("DROP TABLE IF EXISTS users;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS plants;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS plants_owned;");
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return createPlants();
    });
}

function createUsers() {
  return db.query(`
      CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR (30) NOT NULL,
        email VARCHAR NOT NULL,
        geolocation VARCHAR
    )`);
}

function createPlants() {
  return db.query(
    `CREATE TABLE plants(
    id INT NOT NULL,
    common_name VARCHAR (40) NOT NULL,
    sci_name VARCHAR (40),
    type VARCHAR (20),
    cycle VARCHAR (20),
    attracts VARCHAR,
    watering VARCHAR (20),
    maintainance VARCHAR (20),
    growth_rate VARCHAR (20),
    drought_tolerant BOOLEAN,
    thorny BOOLEAN,
    invasive BOOLEAN,
    tropical BOOLEAN,
    care_level VARCHAR (20),
    pest_resistant BOOLEAN,
    flowers BOOLEAN,
    flowering_season VARCHAR,
    edible_fruit BOOLEAN,
    harvest_season VARCHAR,
    edible_leaf BOOLEAN,
    cuisine BOOLEAN,
    poisonous_to_humans BOOLEAN,
    poisonous_to_pets BOOLEAN,
    description VARCHAR,
    default_image VARCHAR
    )`
  );
}

module.exports = seed;
