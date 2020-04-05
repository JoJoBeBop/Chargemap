'use strict';
const stationModel = require('../models/station');

//res.send('With this endpoint you can get stations');
const station_list_get = async (req, res) => {
  try {
    const station = await stationModel.find().populate('Connection');
    res.json(station);
  }
  catch (error) {
    console.error(error, "Get all stations");
    res.status(500).json({message: error.message});
  }
};

//res.send('With this endpoint you can get one station');
const station_get = async (req, res) => {
  try {
    const station = await stationModel.findById(req.params.id)
    res.json(station);
  }
  catch (error) {
    console.error("Station get one ", error);
    res.status(500).json({message: error.message});
  }
};


const station_post = async (req, res) => {
  try {
    const response = await stationModel.create(req.params);
    res.send(response);
  }
  catch (error) {
    console.error("station_put", error);
    res.status(500).json({ message: error.message });
  }
};

const station_put = async (req, res) => {
  try {
    const response = await stationModel.findByIdAndUpdate(
      req.params.id,
      req.params
    );
    res.send(response);
  }
  catch (error) {
    console.error("station_put", error);
    res.status(500).json({ message: error.message });
  }
};

const station_delete = async (req, res) => {
  try {
    const response = await stationModel.findByIdAndDelete(req.params.id);
    res.send(response);
  }
  catch (error) {
    console.error("station_delete", error);
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_put,
  station_delete,

};
