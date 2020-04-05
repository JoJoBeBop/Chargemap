'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');
const stationRoute = require('./routes/stationRoute');

const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("./utils/pass");
const connectionsRoute = require("./routes/connectionsRoute");
const currenttypesRoute = require("./routes/currenttypesRoute");
const connectiontypesRoute = require("./routes/connectiontypesRoute");
const levelsRoute = require("./routes/levelsRoute");
const authRoute = require("./routes/authRoute");

const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoute);
app.use('/connections',connectionsRoute);
app.use('/stations',stationRoute);
app.use('/routes',connectiontypesRoute);
app.use('/levels', levelsRoute);

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })(req, res);
});

db.on('connected', () => {
  app.listen(3000);
});
