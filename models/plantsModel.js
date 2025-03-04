const db = require("../db/connection")

const fetchPlantById = (plant_id) => {
    return db
    .query(
        `SELECT * FROM plants WHERE plant_id = $1;`, [plant_id]
    )
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "No plant associated with this id number",
            });
        }
        return rows[0]
    });
}


module.exports = {fetchPlantById}