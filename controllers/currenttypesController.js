'use strict';
const currenttypeModel = require('../models/currenttypes');

const currentType_list_get = async (req, res) => {
  try {
    const currentTypes = await currenttypeModel.find();
    console.log("kakak");
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
    console.log(currentType);
    res.json(currentType);
  }
  catch (error) {
    console.error(error, "currentType_get");
    res.status(500).json({message: error.message});
  }
};

const currentType_post = async (req, res) => {
  try {
    const response = await currenttypeModel.create(req.params);
    res.send(response);
  }
  catch (error) {
    console.error("currentType_post", error);
    res.status(500).json({ message: error.message });
  }
};

const currentType_put = async (req, res) => {
  try {
    const response = await currenttypeModel.findByIdAndUpdate(req.params.id, req.params);
    res.send(response);
  }
  catch (error) {
    console.error("currentType_put", error);
    res.status(500).json({ message: error.message });
  }
};

const currentType_delete = async (req, res) => {
  try {
    const response = await currenttypeModel.findByIdAndDelete(req.params.id);
    res.send(response);
  }
  catch (error) {
    console.error("currentType_delete", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  currentType_list_get,
  currentType_get,
  currentType_post,
  currentType_put,
  currentType_delete

};
