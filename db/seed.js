const db = require("./connection.js");

// NOTES - should cuisine be in there? check foreign and primary keys setup

function seed() {
  return db
    .query("DROP TABLE IF EXISTS zones;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS favourited_plants;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS owned_plants;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS plants;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return createPlants();
    })
    .then(() => {
      return createOwnedPlants();
    })
    .then(() => {
      return createFavouritedPlants();
    })
    .then(() => {
      return createZones();
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
    `
    CREATE TABLE plants(
    plant_id INT PRIMARY KEY,
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

function createOwnedPlants() {
  return db.query(`
    CREATE TABLE owned_plants(
    owned_plant_key SERIAL PRIMARY KEY,
    user_key INT REFERENCES users(user_id),
    plant_key INT REFERENCES plants(plant_id))
`);
}

function createFavouritedPlants() {
  return db.query(`
      CREATE TABLE favourited_plants(
      favourite_plant_key SERIAL PRIMARY KEY,
      user_key INT REFERENCES users(user_id),
      plant_key INT REFERENCES plants(plant_id))
  `);
}

function createZones() {
  return db.query(`
        CREATE TABLE zones(
        zone_key SERIAL PRIMARY KEY,
        user_key INT REFERENCES users(user_id),
        owned_plant_key INT REFERENCES owned_plants(owned_plant_key),
        is_outdoor BOOLEAN,
        sun_level VARCHAR (20),
        zone_name VARCHAR)`);
}

module.exports = seed;
