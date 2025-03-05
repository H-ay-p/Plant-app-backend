const express = require("express");
const app = express();

const endpoints = require("./endpoints.json");
const {
  getPlantByID,
  getFavePlants,
  postFavePlants,
  getOwnedPlants,
} = require("./controllers/plantsController");
const { getUserByID, postNewUser } = require("./controllers/usersController");
const { getZonesByUserId, postZone } = require("./controllers/zonesController");

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

app.post("/api/users/:user_id/fave_plants", postFavePlants);

app.get("/api/users/:user_id/owned_plants", getOwnedPlants);

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
