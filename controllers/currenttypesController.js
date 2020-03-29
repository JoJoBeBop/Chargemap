'use strict';
const currenttypeModel = require('../models/currenttypes');

const currentType_list_get = async (req, res) => {
  try {
    const currentTypes = await currenttypeModel.find();
    res.json(currentTypes);
  }
  catch (error) {
    console.error(error, "currentType_list_get");
    res.status(500).json({message: error.message});
  }
};

const currentType_get = async (req, res) => {
  try {
    const currentType = await currenttypeModel.findById(req.params.id);
    res.json(currentType);
  }
  catch (error) {
    console.error(error, "currentType_get");
    res.status(500).json({message: error.message});
  }
};

const currentType_post = (req, res) => {
  res.send("add currentTypes");
};

module.exports = {
  currentType_list_get,
  currentType_get,
  currentType_post,
};
