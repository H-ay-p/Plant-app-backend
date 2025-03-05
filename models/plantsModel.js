const db = require("../db/connection");

const fetchPlantById = (plant_id) => {
  return db
    .query(`SELECT * FROM plants WHERE plant_id = $1;`, [plant_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No plant associated with this id number",
        });
      }
      return rows[0];
    });
};

const fetchFavePlants = (user_id) => {
  return db
    .query(
      `SELECT plants.* 
        FROM favourited_plants
        JOIN plants ON favourited_plants.plant_key = plants.plant_id
        WHERE favourited_plants.user_key = $1;`,
      [user_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No plants favourited",
        });
      }
      return rows;
    });
};

const addFavePlant = (user, plant) => {
  return db
    .query(
      `INSERT INTO favourited_plants (user_key, plant_key) VALUES ($1, $2) RETURNING *`,
      [user, plant]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
const fetchOwnedPlants = (user_id) => {
  return db
    .query(
      `SELECT plants.* , owned_plants.zone_key, zones.zone_name
        FROM owned_plants
        JOIN plants ON owned_plants.plant_key = plants.plant_id
        JOIN zones ON owned_plants.zone_key = zones.zone_id
        WHERE owned_plants.user_key = $1;`,
      [user_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No plants owned",
        });
      }
      return rows;
    });
};

module.exports = {
  fetchPlantById,
  fetchFavePlants,
  addFavePlant,
  fetchOwnedPlants,
};
