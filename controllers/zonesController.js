const { fetchZonesByUserID, insertZone } = require("../models/zonesModel");

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

const postZone = (req, res, next) => {
  const { user_key, is_outdoor, sun_level, zone_name } = req.body;

  if (!zone_name) return res.status(400).json({ msg: "Zone name is required" });
  if (!user_key) return res.status(400).json({ msg: "User id is required" });

  insertZone(user_key, is_outdoor, sun_level, zone_name)
    .then((zone) => {
      res.status(201).send({ zone });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getZonesByUserId, postZone };
