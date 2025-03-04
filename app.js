
const express = require("express");
const app = express();
const endpoints = require("./endpoints.json")
const {getPlantByID} = require("./controllers/plantsController")


app.use(express.json());


app.get("/api", (req, res) => {
    res.status(200).send({ endpoints})
});

app.get("/api/plants/:plant_id", getPlantByID)

app.all("*", (req, res) => {
    res.status(404).send({error: "Endpoint not found"})
})

module.exports = app

