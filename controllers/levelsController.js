'use strict';
const levelsModel = require('../models/levels');

const levels_list_get = async (req, res) => {
  try {
    const levels = await levelsModel.find();
    console.log(levelsModel);
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
    console.log(levels);
    res.json(levels);
  }
  catch (error) {
    console.error("levels_get ", error);
    res.status(500).json({message: error.message});
  }
};

const levels_post = async (req, res) => { // TODO: authentication
  try {
    const response = await levelModel.create(req.params);
    res.send(response);
  }
  catch (error) {
    console.error("levels_post", error);
    res.status(500).json({ message: error.message });
  }
};

const levels_put = async (req, res) => { // TODO: authentication
  try {
    const response = await levelModel.findByIdAndUpdate(req.params.id, req.params);
    res.send(response);
  }
  catch (error) {
    console.error("levels_put", error);
    res.status(500).json({ message: error.message });
  }
};

const levels_delete = async (req, res) => { // TODO: authentication
  try {
    const response = await levelModel.findByIdAndDelete(req.params.id);
    res.send(response);
  }
  catch (error) {
    console.error("levels_delete", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  levels_list_get,
  levels_get,
  levels_post,
  levels_put,
  levels_delete

};
