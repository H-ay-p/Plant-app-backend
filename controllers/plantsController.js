const {
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
} = require("../models/plantsModel");

const getPlantByID = (req, res, next) => {
  const { plant_id } = req.params;

  fetchPlantById(plant_id)
    .then((plant) => {
      res.status(200).send({ plant });
    })
    .catch((err) => {
      next(err);
    });
};

const getFavePlants = (req, res, next) => {
  const { user_id } = req.params;

  fetchFavePlants(user_id)
    .then((plants) => {
      res.status(200).send({ plants });
    })
    .catch((err) => {
      next(err);
    });
};

const postFavePlants = (req, res, next) => {
  const { user, plant } = req.body;

  addFavePlant(user, plant)
    .then((favePlant) => {
      res.status(201).send({ favePlant });
    })
    .catch((err) => {
      next(err);
    });
};

const getOwnedPlants = (req, res, next) => {
  const { user_id } = req.params;

  fetchOwnedPlants(user_id)
    .then((plants) => {
      res.status(200).send({ plants });
    })
    .catch((err) => {
      next(err);
    });
};

const postOwnedPlant = (req, res, next) => {
  const { user, plant, zone } = req.body;

  addOwnedPlant(user, plant, zone)
    .then((newPlant) => {
      res.status(201).send({ newPlant });
    })
    .catch((err) => {
      next(err);
    });
};

const getPlants = (req, res, next) => {
  const {
    common_name,
    tropical,
    sunlight,
    maintenance,
    poisonous_to_humans,
    poisonous_to_pets,
    edible_fruit,
    edible_leaf,
    flowers,
  } = req.query;

  const query = req.query;
  fetchPlants(query)
    .then((plants) => {
      res.status(200).send({ plants });
    })
    .catch((err) => {
      next(err);
    });
};

const patchWaterDate = (req, res, next) => {
  const { plant_id, date } = req.body;
  const { user_id } = req.params;
  updateWaterDate(plant_id, date, user_id)
    .then((plant) => {
      res.status(200).send(plant);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteOwnedPlant = (req, res, next) => {
  const { owned_plant_id } = req.params;
  return removeOwnedPlant(owned_plant_id)
    .then(() => {
      res.status(204).sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteFavePlant = (req, res, next) => {
  const { favourite_plant_id } = req.params;
  return removeFavePlant(favourite_plant_id)
    .then(() => {
      res.status(204).sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

const patchPlantPrice = (req, res, next) => {
  const { price } = req.body;
  const plant_id = req.params.plant_id;
  updatePlantPrice(plant_id, price)
    .then((plant) => {
      res.status(200).send(plant);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getPlantByID,
  getFavePlants,
  postFavePlants,
  getOwnedPlants,
  postOwnedPlant,
  getPlants,
  patchWaterDate,
  deleteOwnedPlant,
  patchPlantPrice,
  deleteFavePlant,
};
