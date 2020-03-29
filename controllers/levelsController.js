'use strict';
const levelsModel = require('../models/levels');

const levels_list_get = async (req, res) => {
  try {
    const levels = await levelsModel.find();
    res.json(levels);
  }
  catch (error) {
    console.error(error, "levels_list_get");
    res.status(500).json({message: error.message});
  }
};

const levels_get = async (req, res) => {
  try {
    const levels = await levelsModel.findById(req.params.id);
    res.json(levels);
  }
  catch (error) {
    console.error("levels_get ", error);
    res.status(500).json({message: error.message});
  }
};

const levels_post = (req, res) => {
  res.send("add levels");
};

module.exports = {
  levels_list_get,
  levels_get,
  levels_post,
};
