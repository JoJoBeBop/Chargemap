// https://docs.mongodb.com/manual/core/2dsphere/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  ConnectionTypeID: {type: Schema.Types.ObjectId, ref: "ConnectionTypes"},
  LevelID: {type: Schema.Types.ObjectId, ref: "Levels"},
  CurrentTypeID: {type: Schema.Types.ObjectId, ref: "Levels"},
  Quantity: Number,
});


module.exports = mongoose.model("Connection", connectionSchema);
