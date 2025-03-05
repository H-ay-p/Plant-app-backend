const { fetchZonesByUserID } = require("../models/zonesModel");

const getZonesByUserId = (req, res, next) => {
  const { user_id } = req.params;
  fetchZonesByUserID(user_id)
    .then((zones) => {
      res.status(200).send({ zones: zones });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getZonesByUserId };
