const cors = require("cors");
const express = require("express");
const app = express();

const endpoints = require("./endpoints.json");
const {
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
} = require("./controllers/plantsController");
const { getUserByID, postNewUser } = require("./controllers/usersController");
const {
  getZonesByUserId,
  postZone,
  deleteZone,
} = require("./controllers/zonesController");

app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.get("/api/plants/:plant_id", getPlantByID);

app.get("/api/users/:user_id", getUserByID);

app.post("/api/users", postNewUser);

app.get("/api/zones/:user_id", getZonesByUserId);

app.post("/api/zones", postZone);

app.get("/api/users/:user_id/fave_plants", getFavePlants);

app.get("/api/plants", getPlants);

app.patch("/api/users/:user_id/water", patchWaterDate);

app.post("/api/users/:user_id/fave_plants", postFavePlants);

app.get("/api/users/:user_id/owned_plants", getOwnedPlants);
app.post("/api/users/:user_id/owned_plants", postOwnedPlant);
app.delete("/api/users/owned_plants/:owned_plant_id", deleteOwnedPlant);
app.delete("/api/users/fave_plants/:favourite_plant_id", deleteFavePlant);
app.delete("/api/zones/:zone_id", deleteZone);
app.patch("/api/plants/price/:plant_id", patchPlantPrice);

app.all("*", (req, res) => {
  res.status(404).send({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ error: "Bad Request" });
  } else if (err.code === "23503") {
    res.status(404).send({ error: "Not Found" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ error: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err, "<<< you havent handled this error yet");
  res.status(500).send({ error: "Internal Server Error" });
});

module.exports = app;
