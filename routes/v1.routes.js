const express = require("express");
const V1Routes = express.Router();
const AuthRoute = require("./auth.routes.js");

V1Routes.use("/auth", AuthRoute.route);

module.exports = { V1Routes };
