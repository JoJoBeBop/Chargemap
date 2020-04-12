'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');
const stationRoute = require('./routes/stationRoute');
const https = require('https');
const http = require('http');
const fs = require('fs');

const httpport = 3000;
const httpsport = 8000;

const helmet = require("helmet")
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')
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

const options = {
  key: sslkey,
  cert: sslcert
};


app.use(helmet());
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

  if (process.env.NODE_ENV === 'development') {

    console.log("dev running");
    https.createServer(options, app).listen(8000);
    http.createServer((req, res) => {
      res.writeHead(301, { 'Location': `https://localhost:${httpsport}${req.url}` });
      res.end();
    }).listen(httpport);

  } else {
    app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });
    app.listen(httpport);
  }
});
