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

const insertZone = (user_key, is_outdoor, sun_level, zone_name) => {
  return db
    .query(
      `INSERT INTO zones (user_key,is_outdoor,sun_level,zone_name) VALUES ($1,$2,$3,$4 )RETURNING *`,
      [user_key, is_outdoor, sun_level, zone_name]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchZonesByUserID, insertZone };
