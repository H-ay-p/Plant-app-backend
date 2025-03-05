const db = require("../db/connection");

const fetchZonesByUserID = (user_id) => {
  return db
    .query(`SELECT * FROM zones WHERE user_key = $1`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No zones available for that user",
        });
      }
      return rows;
    });
};

module.exports = { fetchZonesByUserID };
