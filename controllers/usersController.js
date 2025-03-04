const {fetchUserById} = require("../models/usersModel")

const getUserByID = (req, res, next) => {
    const {user_id} = req.params

    fetchUserById(user_id)
    .then((user) => {
        res.status(200).send({user})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getUserByID}