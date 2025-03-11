const {
  fetchUserById,
  addUser,
  fetchUsers,
  fetchUserByEmailId,
} = require("../models/usersModel");

const getUserByID = (req, res, next) => {
  const { user_id } = req.params;

  fetchUserById(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

const postNewUser = (req, res, next) => {
  const { username, email, geolocation } = req.body;

  if (!username) return res.status(400).json({ msg: "Username is required" });
  if (!email) return res.status(400).json({ msg: "Email is required" });

  addUser(username, email, geolocation)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

const getAllUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserByEmail = (req, res, next) => {
  const { email } = req.params;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return res.status(400).json({ error: "Bad Request" });
  }

  fetchUserByEmailId(email)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "No user associated with this email" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getUserByID, postNewUser, getAllUsers, getUserByEmail };
