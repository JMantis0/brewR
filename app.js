require("dotenv").config;
const BreweryDb = require("brewerydb-node");
const brewdb = new BreweryDb(process.env.APIKEY);
