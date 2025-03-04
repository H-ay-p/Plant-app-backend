const {fetchPlantById} = require("../models/plantsModel")


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

module.exports = {getPlantByID}