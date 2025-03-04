const db = require("../db/connection")

const fetchPlantById = (plant_id) => {
    console.log("in the model")
    const id = Number(plant_id)
    console.log(typeof id)
    return db
    .query(
        `SELECT * FROM plants WHERE id = $1;`, [plant_id]
    )
    .then(({ rows }) => {
        console.log(rows)
        return rows
    });
}


module.exports = {fetchPlantById}