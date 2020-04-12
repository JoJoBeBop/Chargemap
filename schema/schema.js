const {GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType}
  = require('graphql');

const connectionModel = require("../models/connection");
const stationModel = require("../models/station");
const currentTypeModel = require("../models/currenttypes");
const levelModel = require("../models/levels");
const connectionTypeModel = require("../models/connectiontypes");


/* --- */
const currenttypeType = new GraphQLObjectType({
  name: "current",
  description: "Current type for charger",
  fields: () => ({
    _id: { type: GraphQLString },
    Description: { type: GraphQLString },
    Title: { type: GraphQLString }
  })
})


const levelType = new GraphQLObjectType({
  name: "level",
  description: "Levels of charger",
  fields: () => ({
    _id: {type: GraphQLID},
    Comments: {type: GraphQLString},
    IsFastChargeCapable: {type: GraphQLBoolean},
    Title: {type: GraphQLString},

  })
});

const connectiontypeType = new GraphQLObjectType({
  name: "connectionType",
  description: "Connection type for charger",
  fields: () => ({
    id: {type: GraphQLID},
    FormalName: {type: GraphQLString},
    Title: {type: GraphQLString},
  })
});

const locationType = new GraphQLObjectType({
  name: "location",
  description: "Locations type",
  fields: () => ({
    type: { type: GraphQLString },
    coordinates: { type: new GraphQLList(GraphQLFloat) }
  })
});

const connectionType = new GraphQLObjectType({
  name: "connection",
  description: "connections",
  fields: () => ({
    _id: {type: GraphQLString},
    ConnectionType: {
      type: connectiontypeType,
      resolve: async (parent, args) => {
        try {
          return await connectionTypeModel.findById(parent.ConnectionTypeID)
        }
        catch (error) {
          return new Error(error.message);
        }
      }
    },
    CurrentType: {
      type: currenttypeType,
      resolve: async (parent, args) => {
        try {
          return await currentTypeModel.findById(parent.CurrentTypeID)
        }
        catch (error) {
          return new Error(error.message);
        }
      }
    },
    LevelType: {
      type: levelType,
      resolve: async (parent, args) => {
        try {
          return await levelModel.findById(parent.LevelID)
        }
        catch (error) {
          return new Error(error.message);
        }
      }
    },
    Quantity: {type: GraphQLInt}
  })
});

const stationType = new GraphQLObjectType({
  name: "station",
  description: "Stations for chargers",
  fields: () => ({
    _id: { type: GraphQLString },
    Location: { type: locationType },
    Connections: {
      type: new GraphQLList(connectionType),
      resolve: async (parent, args) => {
        try {
          return await connectionModel.find({_id: parent.Connections})
        }
        catch (error) {
          console.log("stationType", error);
          return new Error(error.message);
        }
      }
    },
    Title: {type: GraphQLString},
    AddressLine1: {type: GraphQLString},
    Town: {type: GraphQLString},
    StateOrProvince: {type: GraphQLString},
    Postcode: {type: GraphQLString},
  })
});

const locationInputType = new GraphQLInputObjectType({
  name: "locationInput",
  description: "Location of input",
  fields: () => ({
    type: { type: GraphQLString },
    coordinates: { type: new GraphQLList(GraphQLFloat) }
  })
});

const connectionInputType = new GraphQLInputObjectType({
  name: "connectionInputType",
  description: "Type of connection Input",
  fields: () => ({
    ConnectionTypeID: { type: GraphQLString },
    LevelID: { type: GraphQLString },
    CurrentTypeID: { type: GraphQLString },
    Quantity: { type: GraphQLInt }
  })
});

const LatLng = new GraphQLInputObjectType({
  name: "LatLng",
  description: "LatLng",
  fields: () => ({
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  })
});


const Bounds = new GraphQLInputObjectType({
  name: "Bounds",
  description: "opposite corners of recatngular are on map",
  fields: () => ({
    _southWest: {type: LatLng},
    _southEast: {type: LatLng},
  })
});



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Main query",
  fields: {
    stations: {
      type: new GraphQLNonNull(GraphQLList(stationType)),
      description: "Get all stations",
      args: {
        bounds: {type: Bounds},
        limit: {type: GraphQLInt, defaultValue: 10},
        start: {type: GraphQLInt}
      },
      resolve: async (parent, args) => {
        try {
          return await stationModel.find();
        }
        catch (error) {
          return new Error(error.message);
        }
      },
    },

    station: {
      type: new GraphQLList(stationType),
      description: "Get one station using id",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: async (parent, args) => {
        try {
          console.log(args);
          return await stationModel.findById(args.id)
        }
        catch (error) {
          console.log(error);
          return new Error(error.message)
        }
      }
    },

    connectionTypes: {
      type: new GraphQLList(connectiontypeType),
      description: "Get all connection types",
      resolve: async (parent, args) => {
        try {
          return await connectionTypeModel.find()
        }
        catch (error) {
          return new Error(error.message)
        }
      }
    },

    currentTypes: {
      type: new GraphQLList(currenttypeType),
      description: "Get all current types",
      resolve: async (parent, args) => {
        try {
          return await currentTypeModel.find();
        }
        catch (error) {
          return new Error(error.message);
        }
      },
    },

    levelTypes: {
      type: new GraphQLList(levelType),
      description: "Get all level types",
      resolve: async (parent, args) => {
        try {
          return await levelModel.find();
        }
        catch (error) {
          return new Error(error.message);
        }
      },
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutations y'all",
  fields: {
    addStation: {
      type: stationType,
      description: "Add a station",
      args: {
        Location: {type: new GraphQLList(locationInputType)},
        Connections: {type: new GraphQLNonNull(new GraphQLList(connectionInputType))},
        Title: {type: new GraphQLNonNull(GraphQLString)},
        AddressLine1: {type: new GraphQLNonNull(GraphQLString)},
        Town: {type: new GraphQLNonNull(GraphQLString)},
        StateOrProvince: {type: new GraphQLNonNull(GraphQLString)},
        Postcode: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => {
        try {
          const addNewStation = new stationModel(args);
          return await addNewStation.save();
        }
        catch (error) {
          return new Error(error.message);
        }
      },
    },

    deleteStation: {
      type: stationType,
      description: "Delete a station",
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: async (parent, args) => {
        try {
          return await stationModel.findByIdAndDelete(args.id);
        }
        catch (error) {
          return new Error(error.message);
        }
      },
    },

    modifyStation: {
      type: stationType,
      description: "Modify a station",
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        Location: {type: new GraphQLList(locationInputType)},
        Connections: {type: new GraphQLList(connectionInputType)},
        Title: {type: new GraphQLNonNull(GraphQLString)},
        AddressLine1: {type: new GraphQLNonNull(GraphQLString)},
        Town: {type: new GraphQLNonNull(GraphQLString)},
        StateOrProvince: {type: new GraphQLNonNull(GraphQLString)},
        Postcode: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => {
        try {
          return await stationModel.findByIdAndUpdate(args.id, args, {
            new: true,
          });
        }
        catch (error) {
          return new Error(error.message);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
