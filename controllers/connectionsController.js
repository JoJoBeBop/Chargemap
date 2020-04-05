'use strict';
const connectionsModel = require('../models/connection');

const connections_list_get = async (req, res) => {
  try {
    const connections = await connectionsModel.find().populate();
    res.json(connections);
  } catch (error) {
    console.error(error, "Get all connections");
    res.status(500).json({message: error.message});
  }
};

const connections_get = async (req, res) => {
  try {
    const connections = await connectionsModel.findById(req.params.id);
    res.json(connections);
  } catch (error) {
    console.error("connections_get ", error);
    res.status(500).json({message: error.message});
  }
};

const connections_post = async (req, res) => {
  /*Week4 check auth*/
  try {
    const response = await connectionsModel.create(req.params);
    res.send(response);
  } catch (error) {
    console.error("connection_put", error);
    res.status(500).json({message: error.message});
  }
};

const connections_put = async (req, res) => {
  /*Week4 check auth*/
  try {
    const response = await connectionsModel.findByIdAndUpdate(
      req.params.id,
      req.params
    );
    res.send(response);
  } catch (error) {
    console.error("connection_put", error);
    res.status(500).json({message: error.message});
  }
};

const connections_delete = async (req, res) => {
  /*Week4 check auth*/
  try {
    const response = await connectionsModel.findByIdAndDelete(req.params.id);
    res.send(response);
  } catch (error) {
    console.error("connection_delete", error);
    res.status(500).json({message: error.message});
  }
};


module.exports = {
  connections_list_get,
  connections_get,
  connections_post,
  connections_put,
  connections_delete

};
