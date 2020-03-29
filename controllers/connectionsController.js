'use strict';
const connectionsModel = require('../models/connections');

const connections_list_get = async (req, res) => {
  try {
    const connections = await connectionsModel.find().populate();
    res.json(connections);
  }
  catch (error) {
    console.error(error, "Get all connections");
    res.status(500).json({message: error.message});
  }
};

const connections_get = async (req, res) => {
  try {
    const connections = await connectionsModel.findById(req.params.id);
    res.json(connections);
  }
  catch (error) {
    console.error("connections_get ", error);
    res.status(500).json({message: error.message});
  }
};

const connections_post = (req, res) => {
  res.send("add connections");
};

module.exports = {
  connections_list_get,
  connections_get,
  connections_post,
};
