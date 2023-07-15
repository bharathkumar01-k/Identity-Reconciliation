const express = require("express");

const app = express();
let db;

require("./services/load.database");
require("./app")(app);

module.exports = app;
