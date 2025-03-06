const {fetchPlantById, fetchFavePlants, addFavePlant, fetchPlants} = require("../models/plantsModel")


const getPlantByID = (req, res, next) => {
    const {plant_id} = req.params

    fetchPlantById(plant_id)
    .then((plant) => {
        res.status(200).send({plant})
    })
    .catch((err) => {
        next(err)
    })
}

const getFavePlants = (req, res, next) => {
    const {user_id} = req.params

    fetchFavePlants(user_id)
    .then((plants) => {
        res.status(200).send({plants})
    })
    .catch((err) => {
        next(err)
    })
}

const postFavePlants  = (req,res,next) => {
    const {user, plant} = req.body

    addFavePlant(user, plant)
    .then((favePlant) => {
        res.status(201).send({favePlant})
    })
    .catch((err) => {
        next(err)
    })
}

const getPlants = (req, res, next) => {

    const {common_name, tropical, sunlight, maintenance, poisonous_to_humans, poisonous_to_pets, edible_fruit, edible_leaf, flowers} = req.query

    const query = req.query
    fetchPlants(query)

    .then((plants) => {
        res.status(200).send({plants})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getPlantByID, getFavePlants, postFavePlants, getPlants}