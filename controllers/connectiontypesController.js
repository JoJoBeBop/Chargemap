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

const connectionTypes_post = async (req, res) => {
  /*Week4 check auth*/
  try {
    const response = await connectiontypeModel.create(req.params);
    res.send(response);
  }
  catch (error) {
    console.error("connectionTypes_post", error);
    res.status(500).json({ message: error.message });
  }
};

const connectionTypes_put = async (req, res) => {
  /*Week4 check auth*/
  try {
    const response = await connectiontypeModel.findByIdAndUpdate(req.params.id, req.params);
    res.send(response);
  }
  catch (error) {
    console.error("connectionTypes_put", error);
    res.status(500).json({ message: error.message });
  }
};

const connectionTypes_delete = async (req, res) => {
  /*Week4 check auth*/
  try {
    const response = await connectiontypesModel.findByIdAndDelete(req.params.id);
    res.send(response);
  }
  catch (error) {
    console.error("connectionTypes_delete", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  connectionTypes_list_get,
  connectionTypes_get,
  connectionTypes_post,
  connectionTypes_put,
  connectionTypes_delete
};
