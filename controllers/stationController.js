'use strict';
const stationModel = require('../models/station');

//res.send('With this endpoint you can get stations');
const station_list_get = async (req, res) => {

  try {
    let stations = await stationModel.find( null, null, {limit: 10}).populate({
      path: "Connections",
      populate: [
        {path: "ConnectionTypeID"},
        {path: "LevelID"},
        {path: "CurrentTypeID"}
      ]
    });
    if (req.query.limit != null) {stations = await stationModel
        .find(null, null, {
          limit: parseInt(req.query.limit)
        }).populate({
          path: "Connections",
          populate: [
            {path: "ConnectionTypeID"},
            {path: "LevelID"},
            {path: "CurrentTypeID"}
          ]
        });
    }
    else if (req.query.topRight != null && req.query.bottomLeft != null) {
      const stationsArea = {
        type: "Polygon",
        coordinates: [
          [
            [JSON.parse(req.query.topRight).lng, JSON.parse(req.query.topRight).lat],
            [JSON.parse(req.query.bottomLeft).lng, JSON.parse(req.query.topRight).lat],
            [JSON.parse(req.query.bottomLeft).lng, JSON.parse(req.query.bottomLeft).lat],
            [JSON.parse(req.query.topRight).lng, JSON.parse(req.query.bottomLeft).lat],
            [JSON.parse(req.query.topRight).lng, JSON.parse(req.query.topRight).lat]
          ]
        ]
      };
      stations = await stationModel
        .find(null, null, {limit: 10})
        .populate({
          path: "Connections",
          populate: [
            {path: "ConnectionTypeID"},
            {path: "LevelID"},
            {path: "CurrentTypeID"}
          ]
        })
        .where("Location")
        .within(stationsArea);
    }
    res.json(stations);
  }
  catch (error) {
    console.error("station_list_get", error);
    res.status(500).json({message: error.message});
  }
};


//res.send('With this endpoint you can get one station');
const station_get = async (req, res) => {
  try {
    const oneStation = await stationModel.findById(req.params.id).populate({
      path: "Connections",
      populate: [
        {path: "ConnectionTypeID"},
        {path: "LevelID"},
        {path: "CurrentTypeID"}
      ]
    });
    console.log(oneStation);
    res.json(oneStation);
  }
  catch (error) {
    console.error("station_get", error);
    res.status(500).json({message: error.message});
  }
};


const station_post = async (req, res) => {
  try {
    const response = await stationModel.create(req.params);
    res.send(response);
  }
  catch (error) {
    console.error("station_post", error);
    res.status(500).json({message: error.message});
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
    res.status(500).json({message: error.message});
  }
};

const station_delete = async (req, res) => {
  try {
    const response = await stationModel.findByIdAndDelete(req.params.id);
    res.send(response);
  }

  catch (error) {
    console.error("station_delete", error);
    res.status(500).json({message: error.message});
  }
};


module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_put,
  station_delete
};
