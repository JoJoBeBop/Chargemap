'use strict';
const connectiontypesModel = require('../models/connectiontypes');

const connectionTypes_list_get = async (req, res) => {
  try {
    const connectionTypes = await connectiontypesModel.find().populate('ConnectionTypes');
    res.json(connectionTypes);
  }
  catch (error) {
    console.error(error, "connectionTypes_list_get");
    res.status(500).json({message: error.message});
  }
};

const connectionTypes_get = async (req, res) => {
  try {
    const connectionTypes = await connectiontypesModel.findById(req.params.id);
    res.json(connectionTypes);
  }
  catch (error) {
    console.error(error, "connectionTypes_get");
    res.status(500).json({message: error.message});
  }
};

const connectionTypes_post = (req, res) => {
  res.send("add connectionTypes");
};

module.exports = {
  connectionTypes_list_get,
  connectionTypes_get,
  connectionTypes_post,
};
