const db = require("../db/connection");

const fetchUserById = (user_id) => {
  return db
    .query(`SELECT * FROM users WHERE user_id = $1;`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No user associated with this id number",
        });
      }
      return rows[0];
    });
};

const addUser = (username, email, geolocation) => {
  return db
    .query(
      `INSERT INTO users (username, email, geolocation) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, geolocation]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

const fetchUserByEmailId = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchUserById, addUser, fetchUsers, fetchUserByEmailId };
