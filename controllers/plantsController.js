const {fetchPlantById} = require("../models/plantsModel")


const getPlantByID = (req, res, next) => {
    const {plant_id} = req.params
    console.log(typeof plant_id)

    fetchPlantById(plant_id)
    .then((plant) => {
        res.status(200).send({plant})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getPlantByID}