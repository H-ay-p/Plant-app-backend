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
      `SELECT plants.* , favourited_plants.favourite_plant_key
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
      `SELECT plants.* , owned_plants.zone_key, zones.zone_name, owned_plants.owned_plant_key
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

const fetchPlants = (query) => {
  let queryString = `SELECT * FROM plants`;
  const addQuery = [];
  if (query) {
    let dollar_counter = 0;

    if (query.common_name) {
      addQuery.push(query.common_name);
      queryString += " WHERE common_name = $1";
      dollar_counter++;
    }

    if (query.tropical) {
      addQuery.push(query.tropical);
      if (dollar_counter === 0) {
        queryString += " WHERE tropical = $1";
      } else {
        queryString += ` AND tropical = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }

    if (query.sunlight) {
      addQuery.push(query.sunlight);
      if (dollar_counter === 0) {
        queryString += " WHERE sunlight = $1";
      } else {
        queryString += ` AND sunlight = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }

    if (query.maintenance) {
      addQuery.push(query.maintenance);
      if (dollar_counter === 0) {
        queryString += " WHERE maintenance = $1";
      } else {
        queryString += ` AND maintenance = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }

    if (query.poisonous_to_humans) {
      addQuery.push(query.poisonous_to_humans);
      if (dollar_counter === 0) {
        queryString += " WHERE poisonous_to_humans = $1";
      } else {
        queryString += ` AND poisonous_to_humans = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }

    if (query.poisonous_to_pets) {
      addQuery.push(query.poisonous_to_pets);
      if (dollar_counter === 0) {
        queryString += " WHERE poisonous_to_pets = $1";
      } else {
        queryString += ` AND poisonous_to_pets = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }

    if (query.edible_fruit) {
      addQuery.push(query.edible_fruit);
      if (dollar_counter === 0) {
        queryString += " WHERE edible_fruit = $1";
      } else {
        queryString += ` AND edible_fruit = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }

    if (query.edible_leaf) {
      addQuery.push(query.edible_leaf);
      if (dollar_counter === 0) {
        queryString += " WHERE edible_leaf = $1";
      } else {
        queryString += ` AND edible_leaf = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }
    if (query.edible) {
      addQuery.push(query.edible);
      if (dollar_counter === 0) {
        queryString += " WHERE edible = $1";
      } else {
        queryString += ` AND edible = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }

    if (query.flowers) {
      addQuery.push(query.flowers);
      if (dollar_counter === 0) {
        queryString += " WHERE flowers = $1";
      } else {
        queryString += ` AND flowers = $${dollar_counter + 1}`;
      }
      dollar_counter++;
    }
  }
  return db.query(queryString, addQuery).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No plants found matching the given criteria",
      });
    }
    return rows;
  });
};

const addOwnedPlant = (user, plant, zone) => {
  return db
    .query(
      `INSERT INTO owned_plants (user_key, plant_key, zone_key, last_watered) VALUES ($1, $2,$3,$4) RETURNING *`,
      [user, plant, zone, "2024-03-06"]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const updateWaterDate = (plant_id, date, user_id) => {
  return db
    .query(
      "UPDATE owned_plants SET last_watered = $1 WHERE plant_key = $2 AND user_key = $3 RETURNING *",
      [date, plant_id, user_id]
    )
    .then((plant) => {
      console.log(plant.rows);
      return plant.rows;
    });
};

const removeOwnedPlant = (id) => {
  return db.query("DELETE FROM owned_plants WHERE owned_plant_key = $1", [id]);
};

const removeFavePlant = (id) => {
  return db.query(
    "DELETE FROM favourited_plants WHERE favourite_plant_key = $1",
    [id]
  );
};

const updatePlantPrice = (plant_id, price) => {
  return db
    .query("UPDATE plants SET price = $1 WHERE plant_id = $2 RETURNING *", [
      price,
      plant_id,
    ])
    .then((plant) => {
      return plant.rows;
    });
};

module.exports = {
  fetchPlantById,
  fetchFavePlants,
  addFavePlant,
  fetchOwnedPlants,
  addOwnedPlant,
  fetchPlants,
  updateWaterDate,
  removeOwnedPlant,
  updatePlantPrice,
  removeFavePlant,
};
