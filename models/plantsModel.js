const db = require("../db/connection")

const fetchPlantById = (plant_id) => {
    return db
    .query(
        `SELECT * FROM plants WHERE plant_id = $1;`, [plant_id]
    )
    .then(({ rows }) => {
        return rows[0]
    });
}


module.exports = {fetchPlantById}