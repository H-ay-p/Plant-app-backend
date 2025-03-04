const {fetchUserById, addUser} = require("../models/usersModel")

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

const postNewUser = (req,res,next) => {
    const {username, email, geolocation} = req.body

    if (!username) return res.status(400).json({ msg: "Username is required" });
    if (!email) return res.status(400).json({ msg: "Email is required" });

    addUser(username, email, geolocation)
    .then((user) => {
        console.log(user)
        res.status(201).send({user})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getUserByID, postNewUser}