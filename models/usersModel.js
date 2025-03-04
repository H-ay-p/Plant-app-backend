const db = require("../db/connection")

const fetchUserById = (user_id) => {
    return db
    .query(
        `SELECT * FROM users WHERE user_id = $1;`, [user_id]
    )
    .then(({rows})=> {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "No user associated with this id number",
            });
        }
        return rows[0]
    });
    }

module.exports = {fetchUserById}